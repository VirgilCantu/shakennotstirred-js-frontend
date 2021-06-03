class Cocktail {
  constructor(cocktailJSON) {
    this.name = cocktailJSON.name;
    this.image = cocktailJSON.image;
    this.glassware = cocktailJSON.glassware;
    this.ice = cocktailJSON.ice;
    this.origin = cocktailJSON.origin;
    this.prep = cocktailJSON.preparation;
  }
}

//   createCocktailIndex() {
//     const div = document.createElement("div");
//     div.id = `cocktail-${cocktail.id}`;
//     cocktails.appendChild(div);

//     const image = document.createElement("img");
//     image.src = cocktail.image;
//     image.className = "cocktail_img";
//     div.appendChild(image);

//     const name = document.createElement("h3");
//     name.innerHTML = `<strong>${cocktail.name}</strong>`;
//     div.appendChild(name);

//     const glassware = document.createElement("p");
//     glassware.innerHTML = `Glassware: ${cocktail.glassware}`;
//     div.appendChild(glassware);

//     const ice = document.createElement("p");
//     ice.innerHTML = `Ice: ${cocktail.ice}`;
//     div.appendChild(ice);

//     const origin = document.createElement("p");
//     origin.innerHTML = `Origin: ${cocktail.origin}`;
//     div.appendChild(origin);

//     const prep = document.createElement("p");
//     prep.innerHTML = `Preparation: ${cocktail.preparation}`;
//     div.appendChild(prep);
//   }
