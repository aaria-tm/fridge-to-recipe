# fridge-to-recipe
A lightweight, front-end web application that uses Artificial Intelligence to generate custom recipes based on the ingredients you currently have in your kitchen. Built entirely with Vanilla HTML, CSS, and JavaScript.

# Features
* **AI-Powered Generation:** Connects directly to the OpenAI API (GPT-4o-mini) to create realistic, delicious recipes on the fly.
* **Dynamic Ingredient List:** Easily add and remove ingredients before asking the chef to cook.
* **Modern UI:** Clean, responsive design featuring Google Fonts (Inter) and CSS animations.
* **Zero Build Tools:** No Webpack, Vite, or npm required. Just open the HTML file in your browser and go.

## Tech Stack
* **HTML5** * **CSS3** (Custom variables, flexbox, CSS animations)
* **Vanilla JavaScript** (ES6+, async/await, Fetch API)
* **OpenAI API** (GPT-4o-mini model)

## Getting Started

### Prerequisites
To make this app work, you will need an active OpenAI API Key.
1. Go to [OpenAI's Developer Platform]
2. Create an account and add a few dollars to your billing balance.
3. Generate a new API Key.

### Installation & Setup
1. Clone this repository or download the three project files: `index.html`, `style.css`, and `script.js`.
2. Open `script.js` in your favorite text editor.
3. Locate line 5 and replace the placeholder text with your actual API key:
   ```javascript
   const OPENAI_API_KEY = 'sk-YOUR-ACTUAL-API-KEY-HERE';
