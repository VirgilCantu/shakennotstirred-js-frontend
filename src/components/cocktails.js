class Cocktails {
  constructor() {
    this.cocktails = [];
    this.initNodes();
    this.initEventListeners();
    this.adapter = new CocktailsAdapter();
    this.fetchAndLoadCocktails();
  }
  initNodes() {
    this.cocktailsContainer = document.getElementById("current-cocktails");
    this.cocktailsForm = document.getElementById("new-cocktail-form");
    this.cocktailCreateButton = document.getElementById("create-cocktail-button");
    this.ingredientCreateButton = document.getElementById("create-ingredient-button");
    this.ingredientDeleteButton = document.getElementById("delete-ingredient-button");
    this.cocktailsForm.style.display = "none";
    this.ingredientCreateButton.style.display = "none";
    this.ingredientDeleteButton.style.display = "none";
  }

  initEventListeners() {
    this.cocktailCreateButton.addEventListener("click", this.showHideCocktailForm);
    this.cocktailsForm.addEventListener("submit", this.handleAddCocktail);
    this.cocktailsContainer.addEventListener("click", this.handleDeleteCocktail);
    this.ingredientDeleteButton.addEventListener("click", this.removeIngredientField);
  }

  fetchAndLoadCocktails() {
    this.adapter
      .getCocktails()
      .then(cocktailsJSON => {
        cocktailsJSON.forEach(cocktail => {
          this.cocktails.push(new Cocktail(cocktail));
        });
      })
      .then(() => {
        this.cocktails.forEach(cocktail => cocktail.buildCard());
      });
  }

  showHideCocktailForm = () => {
    if (this.cocktailsForm.style.display === "none") {
      this.cocktailsForm.style.display = "block";
      this.cocktailCreateButton.innerHTML = "Close";
      this.ingredientCreateButton.style.display = "";
      this.ingredientCreateButton.addEventListener("click", this.addIngredientField);
    } else {
      this.cocktailsForm.style.display = "none";
      this.cocktailCreateButton.innerHTML = "Add New Cocktail";
      this.ingredientCreateButton.style.display = "none";
      this.ingredientDeleteButton.style.display = "none";
      this.ingredientCreateButton.removeEventListener("click", this.addIngredientField);
    }
  };

  addIngredientField = () => {
    const fieldDiv = document.createElement("div");
    fieldDiv.className = "ingredient-div";

    const ingHeading = document.createElement("h2");
    ingHeading.innerHTML = "New Ingredient for this Cocktail";
    fieldDiv.appendChild(ingHeading);

    for (let i = 0; i < 3; i++) {
      const ingLabel = document.createElement("label");
      const ingInput = document.createElement("input");

      ingInput.type = "text";
      ingInput.className = "new-ingredient-input";

      switch (i) {
        case 0:
          ingLabel.for = "ingredient_name";
          ingLabel.innerHTML = "Name: ";
          ingInput.name = "ingredient_name";
          ingInput.id = "ingredient_name";
          break;
        case 1:
          ingLabel.for = "ingredient_category";
          ingLabel.innerHTML = "Category: ";
          ingInput.name = "ingredient_category";
          ingInput.id = "ingredient_category";
          break;
        case 2:
          ingLabel.for = "ingredient_quantity";
          ingLabel.innerHTML = "Quantity: ";
          ingInput.name = "ingredient_quantity";
          ingInput.id = "ingredient_quantity";
          break;
      }

      fieldDiv.appendChild(ingLabel);
      fieldDiv.appendChild(ingInput);

      this.cocktailsForm.appendChild(fieldDiv);
    }

    if ((this.ingredientDeleteButton.style.display = "none")) {
      this.ingredientDeleteButton.style.display = "";
    }
  };

  removeIngredientField = () => {
    const ingredientInputs = document.getElementsByClassName("ingredient-div");
    if (!!ingredientInputs.length) {
      ingredientInputs[ingredientInputs.length - 1].remove();
    }
  };

  sortIngredientInputs = inputs => {
    const ingredientObjects = [];
    const numOfObjs = inputs.length / 3;
    for (let i = 0; i < numOfObjs * 3; i += 3) {
      const newObj = {
        name: inputs[i].value,
        category: inputs[i + 1].value,
        quantity: inputs[i + 2].value
      };
      ingredientObjects.push(newObj);
    }
    return ingredientObjects;
  };

  handleAddCocktail = event => {
    event.preventDefault();
    const cocktailInputs = document.querySelectorAll(".new-cocktail-input");
    const ingredientInputs = document.querySelectorAll(".new-ingredient-input");

    const [name, image, ice, origin, glassware, preparation] = cocktailInputs;

    let ingObjs = this.sortIngredientInputs(ingredientInputs);

    const bodyObj = {
      name: name.value,
      image: image.value,
      ice: ice.value,
      origin: origin.value,
      glassware: glassware.value,
      preparation: preparation.value,
      ingredients_attributes: ingObjs
    };

    this.adapter
      .createCocktail(bodyObj)
      .then(cocktailJSON => {
        const cocktailInstance = new Cocktail(cocktailJSON);
        this.cocktails.push(cocktailInstance);
        cocktailInstance.buildCard();
      })
      .then(() => {
        name.value = "";
        image.value = "";
        ice.value = "";
        origin.value = "";
        glassware.value = "";
        preparation.value = "";
      });
  };

  handleDeleteCocktail = event => {
    if (event.target.dataset.action === "delete-cocktail") {
      const cocktailId = event.target.dataset.id;
      this.adapter.deleteCocktail(cocktailId);
      event.target.parentElement.remove();
    }
  };
}
