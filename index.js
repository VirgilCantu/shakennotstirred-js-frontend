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
      method: "DELETE",
      body: null
    };
    return fetch(`${this.cocktailUrl}/${cocktailId}`, cocktailDeleteParams);
  }
}
