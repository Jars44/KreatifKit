import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
    <div class="flex space-x-8 mb-8">
      <a href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="h-24 p-6 transition-all duration-300 hover:drop-shadow-lg" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="${javascriptLogo}" class="h-24 p-6 transition-all duration-300 hover:drop-shadow-lg" alt="JavaScript logo" />
      </a>
    </div>
    <h1 class="text-4xl font-bold mb-8">Hello Vite!</h1>
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <button id="counter" type="button" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"></button>
    </div>
    <p class="text-gray-600 dark:text-gray-400 mt-8">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
