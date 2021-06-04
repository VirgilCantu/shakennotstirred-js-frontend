class Cocktail {
  constructor(cocktailJSON) {
    this.name = cocktailJSON.name;
    this.image = cocktailJSON.image;
    this.glassware = cocktailJSON.glassware;
    this.ice = cocktailJSON.ice;
    this.origin = cocktailJSON.origin;
    this.preparation = cocktailJSON.preparation;
    this.cocktailsContainer = document.getElementById("current-cocktails");
  }

  buildCard() {
    const cocktailDiv = document.createElement("div");
    cocktailDiv.className = "card";

    const image = document.createElement("img");
    image.src = this.image;
    image.className = "cocktail_img";
    cocktailDiv.appendChild(image);

    const name = document.createElement("h2");
    name.innerHTML = `<em><strong>${this.name}</strong></em>`;
    cocktailDiv.appendChild(name);

    const glassware = document.createElement("p");
    glassware.innerHTML = `Glassware: ${this.glassware}`;
    cocktailDiv.appendChild(glassware);

    const ice = document.createElement("p");
    ice.innerHTML = `Ice: ${this.ice}`;
    cocktailDiv.appendChild(ice);

    const origin = document.createElement("p");
    origin.innerHTML = `Origin: ${this.origin}`;
    cocktailDiv.appendChild(origin);

    const preparation = document.createElement("p");
    preparation.innerHTML = `Preparation: ${this.preparation}`;
    cocktailDiv.appendChild(preparation);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.className = "";
    cocktailDiv.appendChild(deleteButton);

    this.cocktailsContainer.appendChild(cocktailDiv);
  }
}
