var recipeList = function(container) {
  // Get recipeCard template
  var recipeCardTemplateStr = ""
  var recipeTemplatePromise = $.get("/recipeList/recipeCard.html").then(function (res) {
    recipeCardTemplateStr = res.data
  }).catch(function (err) {
    console.log("Unable to load recipe card template")
  })

  // Get the recipe data (someday from database)
  var recipeData;
  var recipeDataPromise = $.get("/recipeList/recipes.json").then(function(res){
    recipeData = res.data.sort(function(a,b) {
      return a.rating < b.rating
    });
  })

  Promise.all([recipeTemplatePromise, recipeDataPromise]).then(function(){
      var recipeTemplate = new Template(recipeCardTemplateStr)
      recipeData.forEach(function(recipe){
        recipe.ratingIcon = ratingToIcon(recipe.rating)
        container.appendChild(recipeTemplate.getNode(recipe))
      })

      var allCards = $(".recipeCard")
      allCards.forEach(function (node) {
        node.addEventListener("touchstart", function (e) {
          allCards.forEach(function (oNode) {
            oNode.classList.remove("focus")
          })
          node.classList.add("focus")
        })
      })
      $(".recipeCard")[0].classList.add("focus")
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
