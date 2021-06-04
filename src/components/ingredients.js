class Ingredients {
  constructor() {
    this.importantNodes();
  }

  importantNodes() {
    this.ingredientsForm = document.getElementById("new-ingredient-form");
    this.createButton = document.getElementById("create-ingredient-button");
    this.ingredientsForm.style.display = "none";
    this.createButton.addEventListener("click", this.showHideForm);
  }
}
