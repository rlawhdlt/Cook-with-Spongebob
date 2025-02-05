document.getElementById('make-burger').addEventListener('click', () => {
    let selectedIngredients = {};
    let coreIngredients = ["bun", "patty", "cheese", "lettuce", "tomato", "onion", "chicken", "shrimp", "crab", "veggie", "pickle"];
    document.querySelectorAll('.ingredient:checked').forEach(item => {
        let value = item.value;
        selectedIngredients[value] = (selectedIngredients[value] || 0) + 1;
    });
    
    let resultText = '';
    let burgerDisplay = document.getElementById('burger-display');
    burgerDisplay.innerHTML = '';
    
    let burgerImage = document.createElement('img');
    burgerImage.style.width = '200px';
    
    if (!selectedIngredients.bun) {
        resultText = '⚠️ You have to choose a bun for a hamburger!';
        burgerImage.src = 'image/error-burger.png';
    } else if (Object.keys(selectedIngredients).length === 1 && selectedIngredients.bun) {
        resultText = '✨ Imaginary Burger is ready! (Only bun selected)';
        burgerImage.src = 'image/imaginary-burger.png';
    } else if (Object.keys(selectedIngredients).length >= coreIngredients.length - 2) {
        resultText = '👹 Burger Monster is created!!';
        burgerImage.src = 'image/monsterburger.png';
    } else if (
        selectedIngredients.bun &&
        (selectedIngredients.patty || selectedIngredients.chicken || selectedIngredients.shrimp || selectedIngredients.crab || selectedIngredients.veggie)
    ) {
        if (selectedIngredients.patty && selectedIngredients.patty >= 2 && selectedIngredients.cheese) {
            resultText = '🧀🍔 Double Cheeseburger is ready!';
            burgerImage.src = 'image/doublecheeseburger.png';
        } else if (selectedIngredients.patty && selectedIngredients.cheese) {
            resultText = '🧀 Cheeseburger is ready!';
            burgerImage.src = 'image/cheeseburger.png';
        } else if (selectedIngredients.patty && selectedIngredients.patty >= 2) {
            resultText = '🍔 Double Patty Burger is ready!';
            burgerImage.src = 'image/double-patty-burger.png';
        } else if (selectedIngredients.patty) {
            resultText = '🍔 Original Burger is ready!';
            burgerImage.src = 'image/hamburger.png';
        } else if (selectedIngredients.chicken) {
            resultText = '🍗 Chicken Burger is ready!';
            burgerImage.src = 'image/chicken-burger.png';
        } else if (selectedIngredients.shrimp) {
            resultText = '🦐 Shrimp Burger is ready!';
            burgerImage.src = 'image/shrimp-burger.png';
        } else if (selectedIngredients.crab) {
            resultText = '🦀 Krabby Patty is ready!';
            burgerImage.src = 'image/krabby-patty.png';
        } else if (selectedIngredients.veggie) {
            resultText = '🥗 Vegan Burger is ready!';
            burgerImage.src = 'image/vegan-burger.png';
        } else {
            resultText = '✨ Imaginary Burger is ready! (No matching recipe)';
            burgerImage.src = 'image/imaginary-burger.png';
        }
    } else {
        resultText = '✨ Imaginary Burger is ready! (No valid recipe)';
        burgerImage.src = 'image/imaginary-burger.png';
    }
    
    burgerDisplay.innerText = resultText;
    burgerDisplay.appendChild(burgerImage);
});

document.getElementById('reset-btn').addEventListener('click', () => {
    document.querySelectorAll('.ingredient').forEach(item => item.checked = false);
    let burgerDisplay = document.getElementById('burger-display');
    burgerDisplay.innerText = '';
    burgerDisplay.innerHTML = '';
    alert("Cleanup complete! Make a new burger.");
});
