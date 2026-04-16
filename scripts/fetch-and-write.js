import fs from 'fs/promises';
import path from 'path';

const API_BASE = 'http://localhost:8000/api';
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
          console.warn(
            `  ⚠ Failed to fetch ${recipe.slug}: ${detailRes.status}`,
          );
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
    md += '<' + recipe.reference.trimEnd() + '>';
    if (!recipe.reference.endsWith('\n')) md += '\n';
  }
  if (recipe.intro || recipe.reference) md += '\n';

  // Steps (which contain ingredients grouped by step)
  if (recipe.steps && recipe.steps.length > 0) {
    // Collect all ingredient groups first
    const ingredientGroups = {};
    const instructionsByStep = {};

    recipe.steps.forEach((step) => {
      const stepNum =
        step.ingredients?.step || Object.keys(instructionsByStep).length + 1;

      // Group ingredients
      if (step.ingredients?.ingredients?.length > 0) {
        const groupName = step.ingredients.text || null;
        const key = groupName || `_ungrouped_${stepNum}`;
        ingredientGroups[key] = {
          ingredients: step.ingredients.ingredients,
          optional: step.ingredients.optional,
        };
      }

      // Collect instructions
      if (step.instructions?.instructions?.length > 0) {
        step.instructions.instructions.forEach((instr, idx) => {
          if (!instructionsByStep[stepNum]) {
            instructionsByStep[stepNum] = [];
          }
          instructionsByStep[stepNum].push({
            ...instr,
            title: step.instructions.title,
            optional: step.instructions.optional || instr.optional,
            background: step.instructions.background,
            order: idx,
          });
        });
      }
    });

    // Write Ingredients section
    if (Object.keys(ingredientGroups).length > 0) {
      md += '## Ingredients\n\n';
      for (const [groupName, groupData] of Object.entries(ingredientGroups)) {
        if (groupName !== null && !groupName.startsWith('_ungrouped_')) {
          md += `### For the ${groupName}\n\n`;
        }

        groupData.ingredients.forEach((ing) => {
          if (!ing.cooked) {
            let ingLine = '- ';

            // Add quantity and unit
            if (ing.quantity !== null && ing.quantity !== undefined) {
              ingLine += `**${ing.quantity}`;
              if (ing.unit) ingLine += `${ing.unit}`;
              ingLine += '** ';
            }

            // Add ingredient name
            ingLine += ing.name;

            // Add variable indicator
            if (ing.variable) {
              ingLine += ' *(to taste)*';
            }

            // Add context (recommendation, alert, explanation)
            if (ing.context && ing.context.length > 0) {
              const contextStr = ing.context
                .map((c) => `${capitalize(c.category)}: ${c.note}`)
                .join(' ');
              ingLine += ` (${contextStr})`;
            }

            md += ingLine + '\n';
          }
        });

        // Add optional indicator for ingredient group if applicable
        if (groupData.optional) {
          md += '<!--(optional group)-->\n';
        }

        md += '<!---->\n';
      }
    }

    // Write Instructions section

    md += '## Instructions\n\n';

    if (Object.keys(instructionsByStep).length > 0) {
      const sortedSteps = Object.keys(instructionsByStep)
        .map(Number)
        .sort((a, b) => a - b);

      sortedSteps.forEach((stepNum) => {
        const instructions = instructionsByStep[stepNum];
        let stepHeaderWritten = false;

        instructions.forEach((instr, idx) => {
          if (!stepHeaderWritten) {
            const titleStr = instr.title ? ` — ${instr.title}` : '';
            const optionalStr = instr.optional ? ' *(optional)*' : '';
            md += `## Step ${stepNum}${titleStr}${optionalStr}\n\n`;
            stepHeaderWritten = true;
          }

          if (instr.background) {
            md += `Background: *${instr.background}*\n\n`;
          }

          let contextStr = '';
          if (instr.context && instr.context.length > 0) {
            instr.context.forEach((ctx) => {
              contextStr += ` (${capitalize(ctx.category)}: ${ctx.note})`;
            });
          }

          md += `${instr.text}${contextStr}\n\n`;
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
