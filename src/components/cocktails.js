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
    if (this.cocktailsForm.style.display === "none") {
      this.cocktailsForm.style.display = "block";
    } else if (this.cocktailsForm.style.display === "block") {
      this.cocktailsForm.style.display = "none";
    }
  }
}
