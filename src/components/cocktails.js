class Cocktails {
  constructor() {
    this.cocktails = [];
    this.initBindingsAndEventListeners();
    this.adapter = new CocktailsAdapter();
    this.fetchAndLoadCocktails();
  }

  initBindingsAndEventListeners() {
    this.cocktailsNode = document.getElementById("current-cocktails");
    this.createButton = document.getElementById("create-cocktail");
    this.cocktailsForm = document.getElementById("new-cocktail-form");
    this.cocktailsForm.style.display = "none";
    this.createButton.addEventListener("click", this.showHideForm.bind(this));
    this.cocktailsForm.addEventListener("submit", this.handleAddCocktail.bind(this));
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
        this.cocktails.forEach(cocktail => cocktail.buildCard.call(this, cocktail));
      });
  }

  showHideForm() {
    this.cocktailsForm.style.display === "none" ? (this.cocktailsForm.style.display = "block") : (this.cocktailsForm.style.display = "none");
  }

  handleAddCocktail(event) {
    event.preventDefault();
    const cocktailName = document.getElementById("cocktail-name");
    const cocktailImage = document.getElementById("cocktail-image");
    const cocktailIce = document.getElementById("cocktail-ice");
    const cocktailOrigin = document.getElementById("cocktail-origin");
    const cocktailGlassware = document.getElementById("cocktail-glassware");
    const cocktailPreparation = document.getElementById("cocktail-preparation");
    const bodyObj = {
      name: cocktailName.value,
      image: cocktailImage.value,
      ice: cocktailIce.value,
      origin: cocktailOrigin.value,
      glassware: cocktailGlassware.value,
      preparation: cocktailPreparation.value
    };
    this.adapter
      .createCocktail(bodyObj)
      .then(cocktailJSON => this.cocktails.push(new Cocktail(cocktailJSON)))
      .then(cocktailInst => cockltailInst.buildCard(cocktailInst))
      .then(() => {
        cocktailName.value = "";
        cocktailImage.value = "";
        cocktailIce.value = "";
        cocktailOrigin.value = "";
        cocktailGlassware.value = "";
        cocktailPreparation.value = "";
      });
  }
}
