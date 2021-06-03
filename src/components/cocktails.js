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
    this.createButton.addEventListener("click", this.handleAddCocktail());
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

  handleAddCocktail() {}
}
