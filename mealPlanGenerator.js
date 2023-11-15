// mealPlanGenerator.js

function generateMealPlan() {
    // Get user inputs
    const numberOfMeals = document.getElementById('numberOfMeals').value;
    const dietPreference = document.getElementById('dietPreference').value;
    const healthSpecification = document.getElementById('healthSpecification').value;
    const calories = document.getElementById('calories').value;

    // Make API request to Edamam Nutrition's recipe search API
    const apiKey = '364552d7a24b6b8d6f64ab3726b615a2'; // Replace with your actual API key
    const apiUrl = `https://api.edamam.com/search?q=${dietPreference}&app_id=98d73146&app_key=${apiKey}&from=0&to=${numberOfMeals}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Process the API response and generate the meal plan
            const mealPlan = processApiResponse(data);

            // Display the meal plan on the page
            displayMealPlan(mealPlan);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function processApiResponse(apiResponse) {
    // Process the API response as needed
    // Extract relevant information such as recipe names, images, and ingredients
    // For simplicity, let's assume the API response structure is similar to:
    // apiResponse.hits[i].recipe.label, apiResponse.hits[i].recipe.image, apiResponse.hits[i].recipe.ingredientLines

    const mealPlan = [];

    for (let i = 0; i < apiResponse.hits.length; i++) {
        const recipe = apiResponse.hits[i].recipe;
        mealPlan.push({
            name: recipe.label,
            image: recipe.image,
            ingredients: recipe.ingredientLines,
        });
    }

    return mealPlan;
}

function displayMealPlan(mealPlan) {
    // Display the meal plan on the page in a tabular format
    const tableContainer = document.getElementById('mealPlanTable');
    tableContainer.innerHTML = ''; // Clear existing content

    // Create a table element
    const table = document.createElement('table');
    table.classList.add('meal-plan-table');

    // Create headers for name, image, and ingredients
    const headerRow = table.insertRow(0);
    const nameHeader = headerRow.insertCell(0);
    nameHeader.textContent = 'Meal Name';

    const imageHeader = headerRow.insertCell(1);
    imageHeader.textContent = 'Image';

    const ingredientsHeader = headerRow.insertCell(2);
    ingredientsHeader.textContent = 'Ingredients';

    // Create columns for each day
    for (let i = 0; i < mealPlan.length; i++) {
        // Insert meal information
        const row = table.insertRow(i + 1);

        // Insert meal name
        const nameCell = row.insertCell(0);
        nameCell.textContent = mealPlan[i].name;

        // Insert meal image
        const imageCell = row.insertCell(1);
        const image = document.createElement('img');
        image.src = mealPlan[i].image;
        image.alt = mealPlan[i].name;
        imageCell.appendChild(image);

        // Insert meal ingredients
        const ingredientsCell = row.insertCell(2);
        ingredientsCell.textContent = mealPlan[i].ingredients.join(', ');
    }

    // Append the table to the container
    tableContainer.appendChild(table);
}


