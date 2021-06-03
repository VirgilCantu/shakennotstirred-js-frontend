class CocktailsAdapter {
  constructor() {
    this.cocktailUrl = "http://localhost:3000/cocktails";
  }

  getCocktails() {
    return fetch(this.cocktailUrl).then(res => res.json());
  }

  createCocktail(body) {
    const cocktailCreateParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    };
    return fetch(this.cocktailUrl, cocktailCreateParams).then(res => res.json());
  }

  editCocktail(body, cocktailId) {
    const cocktailEditParams = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    };
    return fetch(`${this.cocktailUrl}/${cocktailId}`, cocktailEditParams).then(res => res.json());
  }

  deleteCocktail(cocktailId) {
    const cocktailDeleteParams = {
      method: "DELETE"
    };
    return fetch(`${this.cocktailUrl}/${cocktailId}`, cocktailDeleteParams);
  }
}

class Cocktails {
  constructor() {
    this.cocktailList = [];
    this.initBindingsAndEventListeners();
    this.adapter = new CocktailsAdapter();
    this.fetchAndLoadCocktails();
  }

  initBindingsAndEventListeners() {
    this.cocktailsNode = document.getElementById("current-cocktails");
  }

  fetchAndLoadCocktails() {
    this.adapter.getCocktails().then(cocktailsJSON => cocktailsJSON.forEach(cocktail => this.cocktailList.push(new Cocktail(cocktail))));
  }

  createCocktailIndex() {
    cocktails.className = "cocktail_div";
    this.cocktailList.forEach(cocktail => {
      const div = document.createElement("div");
      div.id = `cocktail-${cocktail.id}`;
      cocktails.appendChild(div);

      const image = document.createElement("img");
      image.src = cocktail.image;
      image.className = "cocktail_img";
      div.appendChild(image);

      const name = document.createElement("h3");
      name.innerHTML = `<strong>${cocktail.name}</strong>`;
      div.appendChild(name);

      const glassware = document.createElement("p");
      glassware.innerHTML = `Glassware: ${cocktail.glassware}`;
      div.appendChild(glassware);

      const ice = document.createElement("p");
      ice.innerHTML = `Ice: ${cocktail.ice}`;
      div.appendChild(ice);

      const origin = document.createElement("p");
      origin.innerHTML = `Origin: ${cocktail.origin}`;
      div.appendChild(origin);

      const prep = document.createElement("p");
      prep.innerHTML = `Preparation: ${cocktail.preparation}`;
      div.appendChild(prep);
    });
  }
}

class App {
  constructor() {
    this.cocktails = new Cocktails();
  }
}

const app = new App();
