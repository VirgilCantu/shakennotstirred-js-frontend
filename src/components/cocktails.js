class Cocktails {
  constructor() {
    this.cocktails = [];
    this.initBindingsAndEventListeners();
    this.adapter = new CocktailsAdapter();
    this.fetchAndLoadCocktails();
  }

  initBindingsAndEventListeners() {
    this.cocktailCreateButton = document.getElementById("create-cocktail-button");
    this.cocktailsForm = document.getElementById("new-cocktail-form");
    this.ingredientCreateButton = document.getElementById("create-ingredient-button");
    this.ingredientDeleteButton = document.getElementById("delete-ingredient-button");
    this.cocktailsContainer = document.getElementById("current-cocktails");
    this.cocktailsForm.style.display = "none";
    this.ingredientDeleteButton.style.display = "none";
    this.ingredientCreateButton.style.display = "none";
    this.formInputs = document.querySelectorAll(".new-cocktail-input");
    this.cocktailCreateButton.addEventListener("click", this.showHideCocktailForm);
    this.cocktailsForm.addEventListener("submit", this.handleAddCocktail.bind(this));
    this.cocktailsContainer.addEventListener("click", this.handleDeleteCocktail.bind(this));
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
    ingLabelName.for = "name";
    ingLabelName.innerHTML = "Name: ";
    ingInputName.type = "text";
    ingInputName.name = "name";
    ingInputName.id = "ingredient-name";
    ingInputName.className = "new-ingredient-input";

    const ingLabelCategory = document.createElement("label");
    const ingInputCategory = document.createElement("input");
    ingLabelCategory.for = "category";
    ingLabelCategory.innerHTML = "Category: ";
    ingInputCategory.type = "text";
    ingInputCategory.name = "category";
    ingInputCategory.id = "ingredient-category";
    ingInputCategory.className = "new-ingredient-input";

    const ingLabelSubcategory = document.createElement("label");
    const ingInputSubcategory = document.createElement("input");
    ingLabelSubcategory.for = "subcategory";
    ingLabelSubcategory.innerHTML = "Subcategory: ";
    ingInputSubcategory.type = "text";
    ingInputSubcategory.name = "subcategory";
    ingInputSubcategory.id = "ingredient-subcategory";
    ingInputSubcategory.className = "new-ingredient-input";

    const ingLabelQuantity = document.createElement("label");
    const ingInputQuantity = document.createElement("input");
    ingLabelQuantity.for = "quantity";
    ingLabelQuantity.innerHTML = "Quantity: ";
    ingInputQuantity.type = "text";
    ingInputQuantity.name = "quantity";
    ingInputQuantity.id = "ingredient-quantity";
    ingInputQuantity.className = "new-ingredient-input";

    this.cocktailsForm.append(ingHeading);

    this.cocktailsForm.append(ingLabelName);
    this.cocktailsForm.append(ingInputName);

    this.cocktailsForm.append(ingLabelCategory);
    this.cocktailsForm.append(ingInputCategory);

    this.cocktailsForm.append(ingLabelSubcategory);
    this.cocktailsForm.append(ingInputSubcategory);

    this.cocktailsForm.append(ingLabelQuantity);
    this.cocktailsForm.append(ingInputQuantity);

    if (this.ingredientDeleteButton.style.display === "none") {
      this.ingredientDeleteButton.style.display = "";
      this.ingredientDeleteButton.addEventListener("click", this.removeIngredientField());
    }
  };

  handleAddCocktail(event) {
    event.preventDefault();
    const [name, image, ice, origin, glassware, preparation] = this.formInputs;
    const bodyObj = {
      name: name.value,
      image: image.value,
      ice: ice.value,
      origin: origin.value,
      glassware: glassware.value,
      preparation: preparation.value
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
  }

  handleDeleteCocktail(event) {
    if (event.target.dataset.action === "delete-cocktail") {
      const cocktailId = event.target.dataset.id;
      this.adapter.deleteCocktail(cocktailId).then(response => this.removeDeletedCocktail(response));
    }
  }

  removeDeletedCocktail(deleteResponse) {
    this.cocktails = this.cocktails.filter(cocktail => cocktail.id !== deleteResponse.id);
    this.cocktailsContainer.lastElementChild.remove();
  }
}
