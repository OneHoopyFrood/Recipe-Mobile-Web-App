window.addEventListener("load", function(){
  var routes = [{
    url: "/recipeList",
    config: {
      title: "Recipes",
      templateURL: "/recipeList/index.html",
      controller: recipeList
    }
  }, {
    url: "/addRecipe",
    config: {
      title: "Add Recipe",
      templateURL: "/addEditRecipe/index.html",
      controller: addEditRecipe
    }
  }, {
    url: "/editRecipe",
    config: {
      title: "Edit Recipe",
      templateURL: "/addEditRecipe/index.html",
      controller: addEditRecipe
    }
  }]
  router(routes)
})
