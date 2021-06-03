class Cocktail {
  constructor(cocktailJSON) {
    this.name = cocktailJSON.name;
    this.image = cocktailJSON.image;
    this.glassware = cocktailJSON.glassware;
    this.ice = cocktailJSON.ice;
    this.origin = cocktailJSON.origin;
    this.prep = cocktailJSON.preparation;
  }

  buildCard(cocktail) {
    const cocktailDiv = document.createElement("div");

    const image = document.createElement("img");
    image.src = cocktail.image;
    image.className = "cocktail_img";
    cocktailDiv.appendChild(image);

    const name = document.createElement("h3");
    name.innerHTML = `<strong>${cocktail.name}</strong>`;
    cocktailDiv.appendChild(name);

    const glassware = document.createElement("p");
    glassware.innerHTML = `Glassware: ${cocktail.glassware}`;
    cocktailDiv.appendChild(glassware);

    const ice = document.createElement("p");
    ice.innerHTML = `Ice: ${cocktail.ice}`;
    cocktailDiv.appendChild(ice);

    const origin = document.createElement("p");
    origin.innerHTML = `Origin: ${cocktail.origin}`;
    cocktailDiv.appendChild(origin);

    const prep = document.createElement("p");
    prep.innerHTML = `Preparation: ${cocktail.preparation}`;
    cocktailDiv.appendChild(prep);

    this.cocktailsNode.appendChild(cocktailDiv);
  }
}
