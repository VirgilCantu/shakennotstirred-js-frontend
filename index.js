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
    // this.cocktails = [];
    // this.eventListeners();
    this.adapter = new CocktailsAdapter();
    this.fetchAndLoadCocktails();
  }

  fetchAndLoadCocktails() {
    this.adapter.getCocktails().then(json => {
      const cocktails = document.getElementById("current-cocktails");
      json.forEach(obj => {
        const div = document.createElement("div");
        div.id = `cocktail-${obj.id}`;
        cocktails.appendChild(div);

        const name = document.createElement("h3");
        name.innerHTML = obj.name;
        div.appendChild(name);

        const glassware = document.createElement("p");
        glassware.innerHTML = `Glassware: ${obj.glassware}`;
        div.appendChild(glassware);

        const ice = document.createElement("p");
        ice.innerHTML = `Ice: ${obj.ice}`;
        div.appendChild(ice);

        const origin = document.createElement("p");
        origin.innerHTML = `Origin: ${obj.origin}`;
        div.appendChild(origin);

        const prep = document.createElement("p");
        prep.innerHTML = `Preparation: ${obj.preparation}`;
        div.appendChild(prep);
      });
    });
  }
}

class App {
  constructor() {
    this.notes = new Cocktails();
  }
}

const app = new App();
