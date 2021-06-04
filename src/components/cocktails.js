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
    this.ingredientsForm = document.getElementById("new-ingredient-form");
    this.cocktailsContainer = document.getElementById("current-cocktails");
    this.cocktailsForm.style.display = "none";
    this.ingredientsForm.style.display = "none";
    this.ingredientCreateButton.style.display = "none";
    this.formInputs = document.querySelectorAll(".new-cocktail-input");
    this.cocktailCreateButton.addEventListener("click", this.showHideForm);
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

  showHideForm = () => {
    if (this.cocktailsForm.style.display === "none") {
      this.cocktailsForm.style.display = "block";
      this.cocktailCreateButton.innerHTML = "Close";
      this.ingredientsForm.style.display = "block";
      this.ingredientCreateButton.style.display = "";
    } else {
      this.cocktailsForm.style.display = "none";
      this.cocktailCreateButton.innerHTML = "Add New Cocktail";
      this.ingredientsForm.style.display = "none";
      this.ingredientCreateButton.style.display = "none";
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
