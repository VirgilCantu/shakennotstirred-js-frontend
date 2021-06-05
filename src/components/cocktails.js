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
      this.ingredientCreateButton.removeEventListener("click", this.addIngredientField);
    }
  };

  addIngredientField = () => {
    const ingHeading = document.createElement("h2");

    const ingLabelName = document.createElement("label");
    const ingInputName = document.createElement("input");
    ingHeading.innerHTML = "New Ingredient for this Cocktail";
    ingLabelName.for = "ingredient_name";
    ingLabelName.innerHTML = "Name: ";
    ingInputName.type = "text";
    ingInputName.name = "ingredient_name";
    ingInputName.id = "ingredient_name";
    ingInputName.className = "new-ingredient-input";

    const ingLabelCategory = document.createElement("label");
    const ingInputCategory = document.createElement("input");
    ingLabelCategory.for = "ingredient_category";
    ingLabelCategory.innerHTML = "Category: ";
    ingInputCategory.type = "text";
    ingInputCategory.name = "ingredient_category";
    ingInputCategory.id = "ingredient_category";
    ingInputCategory.className = "new-ingredient-input";

    const ingLabelQuantity = document.createElement("label");
    const ingInputQuantity = document.createElement("input");
    ingLabelQuantity.for = "ingredient_quantity";
    ingLabelQuantity.innerHTML = "Quantity: ";
    ingInputQuantity.type = "text";
    ingInputQuantity.name = "ingredient_quantity";
    ingInputQuantity.id = "ingredient_quantity";
    ingInputQuantity.className = "new-ingredient-input";

    this.cocktailsForm.appendChild(ingHeading);

    this.cocktailsForm.appendChild(ingLabelName);
    this.cocktailsForm.appendChild(ingInputName);

    this.cocktailsForm.appendChild(ingLabelCategory);
    this.cocktailsForm.appendChild(ingInputCategory);

    this.cocktailsForm.appendChild(ingLabelQuantity);
    this.cocktailsForm.appendChild(ingInputQuantity);

    if ((this.ingredientDeleteButton.style.display = "none")) {
      this.addDeleteIngredientButton();
    }
  };

  addDeleteIngredientButton() {
    this.ingredientDeleteButton.style.display = "";
  }

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
