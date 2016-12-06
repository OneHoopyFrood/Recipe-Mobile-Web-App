var routes = {
  recpieList: {
    templateURL: "/"
  }
}
var templates = {
  recipeCard: "/recipeList/recipeCard.html",
  recipeDetail: "/partials/recipeDetail.html"
}
var data = {
  recipes : "/data/recipes.json"
}

window.onload = function () {
  // Get recipeCard template
  var recipeCardTemplateStr = ""
  var recipeTemplatePromise = $.get(templates.recipeCard).then(function (res) {
    recipeCardTemplateStr = res.data
  }).catch(function (err) {
    console.log("Unable to load recipe card template")
  })

  // Get the recipe data (someday from database)
  var recipeData;
  var recipeDataPromise = $.get(data.recipes).then(function(res){
    recipeData = res.data.sort(function(a,b) {
      return a.rating < b.rating
    });
  })

  Promise.all([recipeTemplatePromise, recipeDataPromise]).then(function(){
      var viewContainer = document.getElementById("view")
      var recipeTemplate = new Template(recipeCardTemplateStr)
      recipeData.forEach(function(recipe){
        recipe.ratingIcon = ratingToIcon(recipe.rating)
        viewContainer.appendChild(recipeTemplate.getNode(recipe))
      })

      $(".recipe").forEach(function (node) {
        node.addEventListener("touchstart", function (e) {
          $(".recipe").forEach(function (oNode) {
            oNode.classList.remove("focus")
          })
          node.classList.add("focus")
        })
      })
  })
  function ratingToIcon(num) {
    switch (num){
      case 1:
        return "fa-thumbs-down text-dark-green"
        break
      case 2:
        return "fa-thumbs-up text-blue"
        break
      case 3:
        return "fa-heart text-red"
        break
    }
  }

}
