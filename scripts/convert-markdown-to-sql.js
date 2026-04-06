import fs from 'fs/promises';
import path from 'path';

const RECIPES_DIR = path.join(process.cwd(), 'recipes');
const OUTPUT_DIR = path.join(process.cwd(), 'sql');

// Get command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node convert-markdown-to-sql.js <recipe-file.md>');
  console.error('Example: node convert-markdown-to-sql.js tuna-oyster-sauce-lettuce.md');
  process.exit(1);
}

const inputFile = args[0];
const inputPath = path.isAbsolute(inputFile) ? inputFile : path.join(RECIPES_DIR, inputFile);

// Read existing SQL to get next available IDs
async function getNextIds() {
  try {
    const sqlContent = await fs.readFile(path.join(process.cwd(), 'sql', 'async_cook.sql'), 'utf8');
    
    const extractIds = (table) => {
      const regex = new RegExp('INSERT INTO `' + table + '` \\(`id`,[^)]+\\)', 'gs');
      const matches = sqlContent.match(regex);
      const ids = [];
      if (matches) {
        matches.forEach(match => {
          const idMatch = match.match(/\(\s*(\d+),/);
          if (idMatch) ids.push(parseInt(idMatch[1]));
        });
      }
      return ids;
    };
    
    return {
      recipe: Math.max(0, ...extractIds('recipes')) + 1,
      ingredient: Math.max(0, ...extractIds('ingredients')) + 1,
      instruction: Math.max(0, ...extractIds('instructions')) + 1,
      context: Math.max(0, ...extractIds('context')) + 1,
      step: Math.max(0, ...extractIds('steps')) + 1,
      group: Math.max(0, ...extractIds('ingredient_groups')) + 1,
      calculator: Math.max(0, ...extractIds('calculator')) + 1,
      tag: Math.max(0, ...extractIds('tags')) + 1
    };
  } catch (error) {
    console.warn('Could not read existing SQL file, starting from ID 1');
    return {
      recipe: 1,
      ingredient: 1,
      instruction: 1,
      context: 1,
      step: 1,
      group: 1,
      calculator: 1,
      tag: 1
    };
  }
}

function parseMarkdownRecipe(content, filename) {
  const lines = content.split('\n');
  const recipe = {
    title: '',
    intro: '',
    reference: '',
    ingredients: [],
    instructions: []
  };
  
  let currentSection = '';
  let currentIngredientGroup = null;
  let currentStep = null;
  let introLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Parse title
    if (line.startsWith('# ')) {
      recipe.title = line.substring(2).trim();
      continue;
    }
    
    // Parse reference URL
    if (line.startsWith('<http') && line.endsWith('>')) {
      recipe.reference = line.substring(1, line.length - 1);
      continue;
    }
    
    // Parse instruction steps (check this before general ## parsing)
    const stepMatch = line.match(/## Step (\d+)(?: — (.*))?/);
    if (stepMatch) {
      currentSection = 'instructions';
      currentStep = {
        step: parseInt(stepMatch[1]),
        title: stepMatch[2] || '',
        text: '',
        background: '',
        optional: '',
        context: []
      };
      recipe.instructions.push(currentStep);
      continue;
    }
    
    // Parse section headers
    if (line.startsWith('## ')) {
      const sectionName = line.substring(3).toLowerCase();
      currentSection = sectionName;
      // Combine intro lines before sections
      if (currentSection && !recipe.intro) {
        recipe.intro = introLines.join(' ').trim();
      }
      continue;
    }
    
    // Parse ingredient subsections
    if (line.startsWith('### ')) {
      currentIngredientGroup = line.substring(4).replace('For the ', '').trim();
      continue;
    }
    
    // Parse ingredients
    if (currentSection === 'ingredients' && line.startsWith('- ')) {
      const ingredient = parseIngredientLine(line.substring(2), currentIngredientGroup);
      if (ingredient) {
        recipe.ingredients.push(ingredient);
      }
      continue;
    }
    
    // Parse instruction content
    if (currentSection === 'instructions' && currentStep) {
      if (line.startsWith('Background:')) {
        currentStep.background = line.replace('Background:', '').replace(/\*/g, '').trim();
      } else if (line && !line.startsWith('## Step')) {
        currentStep.text += line + ' ';
      }
      continue;
    }
    
    // Collect intro content (before sections)
    if (!currentSection && line && !line.startsWith('# ') && !line.startsWith('<http')) {
      introLines.push(line);
      continue;
    }
  }
  
  // Clean up intro if not set yet
  if (!recipe.intro && introLines.length > 0) {
    recipe.intro = introLines.join(' ').trim();
  }
  
  // Clean up instruction text
  recipe.instructions.forEach(instr => {
    instr.text = instr.text.trim();
  });
  
  return recipe.title ? recipe : null;
}

function parseIngredientLine(line, groupName) {
  // Parse quantity from bold formatting
  let quantity = null;
  let unit = '';
  let name = '';
  let optional = false;
  let context = [];
  
  // Extract bold quantity
  const quantityMatch = line.match(/\*\*(\d+(?:\.\d+)?)(.*?)\*\*(.+)/);
  if (quantityMatch) {
    quantity = parseFloat(quantityMatch[1]);
    unit = quantityMatch[2].trim();
    name = quantityMatch[3].trim();
  } else {
    name = line;
  }
  
  // Check for optional
  if (name.includes('*(optional)*')) {
    optional = true;
    name = name.replace(/\s*\*\(optional\)\*/g, '').trim();
  }
  
  // Extract context annotations
  const contextMatch = name.match(/(.+?)\s*\((.+?)\)/);
  if (contextMatch) {
    name = contextMatch[1].trim();
    const contextText = contextMatch[2];
    
    // Parse context category and note
    if (contextText.includes('Recommendation:')) {
      const note = contextText.replace(/Recommendation:\s*/, '').trim();
      context.push({ category: 'recommendation', note });
    } else if (contextText.includes('Alert:')) {
      const note = contextText.replace(/Alert:\s*/, '').trim();
      context.push({ category: 'alert', note });
    } else if (contextText.includes('Explanation:')) {
      const note = contextText.replace(/Explanation:\s*/, '').trim();
      context.push({ category: 'explanation', note });
    } else {
      context.push({ category: 'recommendation', note: contextText });
    }
  }
  
  return {
    quantity,
    unit: unit || null,
    name,
    optional,
    context,
    groupName,
    cooked: false,
    step: 1 // Default step, would need more sophisticated logic
  };
}

function generateRecipeSQL(recipe, recipeId) {
  const slug = recipe.title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
  
  const category = '';
  const published = 0;
  
  const escapedTitle = recipe.title.replace(/'/g, "\\'");
  const escapedIntro = recipe.intro.replace(/'/g, "\\'");
  
  return `INSERT INTO recipes (id, slug, category, title, intro, reference, published) VALUES (${recipeId}, '${slug}', '${category}', '${escapedTitle}', '${escapedIntro}', '${recipe.reference}', ${published});`;
}

function processIngredients(ingredients, recipeId, currentIds) {
  const sql = [];
  let nextIngredientId = currentIds.ingredient;
  let nextGroupId = currentIds.group;
  let nextContextId = currentIds.context;
  
  // Group ingredients by step and group
  const groups = {};
  ingredients.forEach((ing, idx) => {
    const key = `${ing.step}_${ing.groupName || 'default'}`;
    if (!groups[key]) {
      groups[key] = {
        step: ing.step,
        text: ing.groupName,
        optional: null,
        ingredients: []
      };
    }
    groups[key].ingredients.push({ ...ing, order: idx + 1 });
  });
  
  // Generate ingredient group records
  Object.values(groups).forEach(group => {
    const groupId = nextGroupId++;
    const groupText = group.text ? group.text.replace(/'/g, "\\'") : '';
    sql.push(`INSERT INTO ingredient_groups (id, recipe_id, step, text, optional) VALUES (${groupId}, ${recipeId}, ${group.step}, ${groupText ? `'${groupText}'` : 'NULL'}, ${group.optional ? `'${group.optional}'` : 'NULL'});`);
    
    // Generate ingredient records
    group.ingredients.forEach(ing => {
      const ingId = nextIngredientId++;
      const ingName = ing.name.replace(/'/g, "\\'");
      sql.push(`INSERT INTO ingredients (id, recipe_id, quantity, unit, variable, name, fdc_id, cooked, optional, step, ing_order) VALUES (${ingId}, ${recipeId}, ${ing.quantity || 'NULL'}, ${ing.unit ? `'${ing.unit}'` : 'NULL'}, NULL, '${ingName}', NULL, ${ing.cooked ? '1' : '0'}, ${ing.optional ? "'optional'" : 'NULL'}, ${ing.step}, ${ing.order});`);
      
      // Generate context records
      ing.context.forEach(ctx => {
        const ctxId = nextContextId++;
        const ctxNote = ctx.note.replace(/'/g, "\\'");
        sql.push(`INSERT INTO context (id, recipe_id, ingredient_id, instruction_id, category, note) VALUES (${ctxId}, ${recipeId}, ${ingId}, NULL, '${ctx.category}', '${ctxNote}');`);
      });
    });
  });
  
  return {
    sql,
    nextIngredientId,
    nextGroupId,
    nextContextId
  };
}

function processInstructions(instructions, recipeId, currentIds) {
  const sql = [];
  let nextInstructionId = currentIds.instruction;
  let nextStepId = currentIds.step;
  let nextContextId = currentIds.context;
  
  // Generate step records
  instructions.forEach(instr => {
    const stepId = nextStepId++;
    sql.push(`INSERT INTO steps (id, recipe_id, step) VALUES (${stepId}, ${recipeId}, ${instr.step});`);
  });
  
  // Generate instruction records
  instructions.forEach(instr => {
    const instrId = nextInstructionId++;
    const instrTitle = instr.title.replace(/'/g, "\\'");
    const instrText = instr.text.replace(/'/g, "\\'");
    const instrBackground = instr.background ? instr.background.replace(/'/g, "\\'") : '';
    sql.push(`INSERT INTO instructions (id, recipe_id, step, title, text, background, optional, int_order) VALUES (${instrId}, ${recipeId}, ${instr.step}, '${instrTitle}', '${instrText}', ${instrBackground ? `'${instrBackground}'` : 'NULL'}, ${instr.optional ? `'${instr.optional}'` : 'NULL'}, 1);`);
    
    // Generate context records for instructions
    instr.context.forEach(ctx => {
      const ctxId = nextContextId++;
      const ctxNote = ctx.note.replace(/'/g, "\\'");
      sql.push(`INSERT INTO context (id, recipe_id, ingredient_id, instruction_id, category, note) VALUES (${ctxId}, ${recipeId}, NULL, ${instrId}, '${ctx.category}', '${ctxNote}');`);
    });
  });
  
  return {
    sql,
    nextInstructionId,
    nextStepId,
    nextContextId
  };
}

async function convertMarkdownToSQL() {
  try {
    console.log(`Converting ${inputFile} to SQL...`);
    
    // Check if file exists
    try {
      await fs.access(inputPath);
    } catch (error) {
      console.error(`Error: File not found: ${inputPath}`);
      console.error(`Expected location: ${inputPath}`);
      process.exit(1);
    }
    
    // Get next available IDs
    const nextIds = await getNextIds();
    console.log('Starting IDs:', nextIds);
    
    // Read the markdown file
    const content = await fs.readFile(inputPath, 'utf8');
    
    const filename = path.basename(inputFile, '.md');
    const recipe = parseMarkdownRecipe(content, filename);
    if (!recipe) {
      console.error(`Error: Could not parse recipe from ${inputFile}`);
      process.exit(1);
    }
    
    const recipeId = nextIds.recipe;
    let currentIds = { ...nextIds };
    const sqlStatements = [];
    
    console.log(`Processing recipe: ${recipe.title}`);
    
    // Generate recipe SQL
    const recipeSQL = generateRecipeSQL(recipe, recipeId);
    sqlStatements.push(recipeSQL);
    
    // Process ingredients
    const ingredientResults = processIngredients(recipe.ingredients, recipeId, currentIds);
    sqlStatements.push(...ingredientResults.sql);
    currentIds.ingredient = ingredientResults.nextIngredientId;
    currentIds.group = ingredientResults.nextGroupId;
    currentIds.context = ingredientResults.nextContextId;
    
    // Process instructions
    const instructionResults = processInstructions(recipe.instructions, recipeId, currentIds);
    sqlStatements.push(...instructionResults.sql);
    currentIds.instruction = instructionResults.nextInstructionId;
    currentIds.context = instructionResults.nextContextId;
    currentIds.step = instructionResults.nextStepId;
    
    console.log(`✓ Generated SQL for recipe ID ${recipeId}`);
    
    // Create output filename
    const outputFile = path.join(OUTPUT_DIR, `${filename}.sql`);
    
    // Write output file
    const header = `-- Recipe conversion from ${inputFile}\n-- Generated on ${new Date().toISOString()}\n-- Recipe ID: ${recipeId}\n\n`;
    const finalSQL = header + sqlStatements.join('\n\n');
    
    await fs.writeFile(outputFile, finalSQL, 'utf8');
    console.log(`✓ SQL file written to ${outputFile}`);
    console.log(`Generated ${sqlStatements.length} SQL statements`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the conversion
convertMarkdownToSQL();