class Cocktails {
  constructor() {
    this.cocktails = [];
    this.initBindingsAndEventListeners();
    this.adapter = new CocktailsAdapter();
    this.fetchAndLoadCocktails();
  }

  initBindingsAndEventListeners() {
    this.createButton = document.getElementById("create-cocktail-button");
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
        this.cocktails.forEach(cocktail => cocktail.buildCard());
      });
  }

  showHideForm() {
    if (this.cocktailsForm.style.display === "none") {
      this.cocktailsForm.style.display = "block";
      this.createButton.innerHTML = "Close";
    } else {
      this.cocktailsForm.style.display = "none";
      this.createButton.innerHTML = "Add New Cocktail";
    }
  }

  handleAddCocktail(event) {
    event.preventDefault();
    const formInputs = document.getElementsByClassName("new-cocktail-input");
    const [name, image, ice, origin, glassware, preparation] = formInputs;
    // const name = document.getElementById("cocktail-name");
    // const image = document.getElementById("cocktail-image");
    // const ice = document.getElementById("cocktail-ice");
    // const origin = document.getElementById("cocktail-origin");
    // const glassware = document.getElementById("cocktail-glassware");
    // const preparation = document.getElementById("cocktail-preparation");
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
        cocktailName.value = "";
        cocktailImage.value = "";
        cocktailIce.value = "";
        cocktailOrigin.value = "";
        cocktailGlassware.value = "";
        cocktailPreparation.value = "";
      });
  }
}
