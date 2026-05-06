// --- CONFIGURATION ---
// PASTE YOUR OPENAI API KEY HERE
// Get one at: https://platform.openai.com/api-keys
const OPENAI_API_KEY = 'OPENAI_API_KEY_HERE';
// ---------------------

// State
let ingredients = [];

// DOM Elements
const form = document.getElementById('ingredient-form');
const input = document.getElementById('ingredient-input');
const ingredientsList = document.getElementById('ingredients-list');
const emptyState = document.getElementById('empty-state');
const generateBtn = document.getElementById('generate-btn');
const loadingState = document.getElementById('loading-state');
const recipeOutput = document.getElementById('recipe-output');

// Render the tags to the UI
function renderIngredients() {
    ingredientsList.innerHTML = '';
    
    if (ingredients.length === 0) {
        emptyState.classList.remove('hidden');
        generateBtn.disabled = true;
    } else {
        emptyState.classList.add('hidden');
        generateBtn.disabled = false;
        
        ingredients.forEach((ing, index) => {
            const li = document.createElement('li');
            li.className = 'ingredient-tag';
            li.innerHTML = `
                ${ing}
                <button type="button" class="delete-btn" onclick="removeIngredient(${index})">&times;</button>
            `;
            ingredientsList.appendChild(li);
        });
    }
}

// Add Ingredient
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.trim();
    
    if (value && !ingredients.includes(value.toLowerCase())) {
        ingredients.push(value.toLowerCase());
        input.value = '';
        renderIngredients();
    }
});

// Remove Ingredient (Attached to window so inline onclick works)
window.removeIngredient = (index) => {
    ingredients.splice(index, 1);
    renderIngredients();
};

// Handle AI Generation
generateBtn.addEventListener('click', async () => {
    if (ingredients.length === 0) return;
    if (OPENAI_API_KEY === 'YOUR_OPENAI_API_KEY_HERE') {
        alert("Wait! You need to put your actual OpenAI API Key into the script.js file first.");
        return;
    }

    // Update UI for Loading
    generateBtn.disabled = true;
    generateBtn.classList.add('hidden');
    recipeOutput.classList.add('hidden');
    loadingState.classList.remove('hidden');

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Fast and cost-effective
                response_format: { type: "json_object" }, // Forces AI to return clean JSON
                messages: [
                    {
                        role: "system",
                        content: `You are an expert chef. The user will give you a list of ingredients. 
                        Create a delicious recipe using mostly these ingredients (you can assume they have basic pantry items like salt, pepper, oil, water, flour, etc.).
                        You MUST respond in pure JSON format with exactly this structure:
                        {
                            "title": "Name of the Recipe",
                            "totalTime": "e.g. 30 mins",
                            "ingredientsList": ["item 1", "item 2"],
                            "instructionsList": ["step 1", "step 2"]
                        }`
                    },
                    {
                        role: "user",
                        content: `My ingredients: ${ingredients.join(', ')}`
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        
        // Parse the JSON string the AI sent back
        const recipeData = JSON.parse(data.choices[0].message.content);

        // Populate the UI with real data
        document.getElementById('recipe-title').textContent = recipeData.title;
        document.getElementById('recipe-time').textContent = `⏱ Time: ${recipeData.totalTime}`;
        
        // Populate Ingredients needed
        const ingListUl = document.getElementById('recipe-ingredients-list');
        ingListUl.innerHTML = '';
        recipeData.ingredientsList.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ingListUl.appendChild(li);
        });

        // Populate Instructions
        const instListOl = document.getElementById('recipe-instructions-list');
        instListOl.innerHTML = '';
        recipeData.instructionsList.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            instListOl.appendChild(li);
        });

        // Show the result
        loadingState.classList.add('hidden');
        recipeOutput.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        alert("Something went wrong connecting to the AI. Check the console for details.");
        loadingState.classList.add('hidden');
    } finally {
        generateBtn.disabled = false;
        generateBtn.classList.remove('hidden');
    }
});
