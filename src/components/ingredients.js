class Ingredients {
  constructor() {
    this.importantNodes();
  }

  importantNodes() {
    this.ingredientsForm = document.getElementById("new-ingredient-form");
    this.cocktailsForm = document.getElementById("new-cocktail-form");
    this.createButton = document.getElementById("create-ingredient-button");
    this.ingredientsForm.style.display = "none";
    this.createButton.addEventListener("click", this.showHideForm);
  }

  showHideForm = () => {
    if (this.ingredientsForm.style.display === "none") {
      this.ingredientsForm.style.display = "block";
      this.createButton.innerHTML = "Close";
    } else {
      this.ingredientsForm.style.display = "none";
      this.createButton.innerHTML = "Add Ingredient";
    }
  };
}
