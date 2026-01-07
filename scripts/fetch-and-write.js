import fs from 'fs/promises';
import path from 'path';

const API_BASE = 'http://localhost/api';
const RECIPES_DIR = path.join(process.cwd(), 'recipes');

async function generateRecipeMarkdowns() {
  try {
    // 1. Fetch all recipes
    console.log('Fetching recipes list...');
    const recipesRes = await fetch(`${API_BASE}/recipes`);
    if (!recipesRes.ok) {
      throw new Error(`Failed to fetch recipes: ${recipesRes.status}`);
    }
    const recipesJson = await recipesRes.json();
    const recipes = recipesJson.data || recipesJson;
    console.log(`Found ${recipes.length} recipes`);

    // 2. For each recipe, fetch details and generate markdown
    for (const recipe of recipes) {
      try {
        console.log(`\nProcessing: ${recipe.slug}`);
        
        // Fetch detailed recipe data
        const detailRes = await fetch(`${API_BASE}/recipes/${recipe.slug}`);
        if (!detailRes.ok) {
          console.warn(`  ⚠ Failed to fetch ${recipe.slug}: ${detailRes.status}`);
          continue;
        }
        const detailJson = await detailRes.json();
        const recipeData = detailJson.data || detailJson;

        // Generate markdown
        const markdown = buildMarkdown(recipeData);

        // Write file
        const filename = `${recipe.slug}.md`;
        const filepath = path.join(RECIPES_DIR, filename);
        await fs.writeFile(filepath, markdown, 'utf8');
        console.log(`  ✓ Written to ${filename}`);
      } catch (error) {
        console.error(`  ✗ Error processing ${recipe.slug}:`, error.message);
      }
    }
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

function buildMarkdown(recipe) {
  let md = '';

  // Title
  md += `# ${recipe.title}\n\n`;

  // Intro + reference
  if (recipe.intro) {
    md += recipe.intro;
    if (!recipe.intro.endsWith('\n')) md += '\n';
  }
  if (recipe.reference) {
    md += '<' + recipe.reference.trimEnd() +'>';
    if (!recipe.reference.endsWith('\n')) md += '\n';
  }
  if (recipe.intro || recipe.reference) md += '\n';

  // Steps (which contain ingredients grouped by step)
  if (recipe.steps && recipe.steps.length > 0) {
    // Collect all ingredient groups first
    const ingredientGroups = {};
    const instructionsByStep = {};

    recipe.steps.forEach(step => {
      const stepNum = step.ingredients?.description?.[0]?.step || 
                     step.instructions?.[0]?.step || 
                     Object.keys(instructionsByStep).length + 1;

      // Group ingredients
      if (step.ingredients?.description?.length > 0) {
        const groupName = step.ingredients.text || null;
        const key = groupName || `_ungrouped_${stepNum}`;
        ingredientGroups[key] = step.ingredients.description;
      }

      // Collect instructions
      if (step.instructions?.length > 0) {
        step.instructions.forEach((instr, idx) => {
          const instrStepNum = instr.step || stepNum;
          if (!instructionsByStep[instrStepNum]) {
            instructionsByStep[instrStepNum] = [];
          }
          instructionsByStep[instrStepNum].push({
            ...instr,
            order: idx
          });
        });
      }
    });

    // Write Ingredients section
    if (Object.keys(ingredientGroups).length > 0) {
      md += '## Ingredients\n\n';
      for (const [groupName, ingredients] of Object.entries(ingredientGroups)) {
        if (groupName !== null && !groupName.startsWith('_ungrouped_')) {
          md += `### For the ${groupName}\n\n`;
        }

        ingredients.forEach(ing => {
          let ingLine = '- ';
          
          // Add quantity and unit
          if (ing.quantity !== null && ing.quantity !== undefined) {
            ingLine += `**${ing.quantity}`;
            if (ing.unit) ingLine += ing.unit;
            ingLine += '** ';
          }
          
          // Add ingredient name
          ingLine += ing.name;
          if(ing.optional) {
            ingLine += ' *(optional)*';
          }

          // Add context (recommendation, alert, explanation)
          if (ing.context && ing.context.length > 0) {
            const contextStr = ing.context
              .map(c => `${capitalize(c.category)}: ${c.note}`)
              .join(' ');
            ingLine += ` (${contextStr})`;
          }

          md += ingLine + '\n';
        });

        md += '<!---->\n';
      }
    }

    // Write Instructions section
    if (Object.keys(instructionsByStep).length > 0) {
      const sortedSteps = Object.keys(instructionsByStep)
        .map(Number)
        .sort((a, b) => a - b);

      sortedSteps.forEach(stepNum => {
        const instructions = instructionsByStep[stepNum];
        instructions.forEach((instr, idx) => {
          if(idx === 0)
            md += `## Step ${stepNum}${instr.title ? ` — ${instr.title}` : ''}${instr.optional ? ' *(optional)*' : ''}\n\n`;
          
          if (instr.background) {
            md += `Background: *${instr.background}*\n\n`;
          }
          
          md += instr.text + '\n\n';

          if (instr.context && instr.context.length > 0) {
            instr.context.forEach(ctx => {
              md += `${capitalize(ctx.category)}: *${ctx.note}*\n\n`;
            });
          }
        });
      });
    }
  }

  return md.trimEnd() + '\n';
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

generateRecipeMarkdowns();
