  var routes = [{
    url: "/recipeList",
    config: {
      title: "Recipe List",
      templateURL: "/recipeList/index.html",
      controller: recipeList
    }
  }, {
    url: "/newRecipe",
    config: {
      title: "New Recipe",
      templateURL: "/newRecipe/index.html",
      controller: newRecipe
    }
  }]
  router(routes)
