var router = function (routes) {
  var mainView = document.getElementById("mainview")
  var title = document.getElementById("header").querySelector("h1")

  function loadRoute(route) {
    $.get(route.config.templateURL).then(function (res) {
      title.innerText = route.config.title
      try {
        var viewLink = document.querySelector(`#footer a[href="#${route.url}"]`)
        if(viewLink) {
          document.querySelectorAll("#footer a").forEach(function(match){
            match.classList.remove("active")
          })
        }
        viewLink.classList.add("active")
      }
      catch (e) {
        console.error(e);
      }
      var template = new Template(res.data)
      mainView.innerHTML = template.getHtml()
      route.config.controller(mainView.querySelector(".view"))
    }).catch(function (error) {
      console.log(`Unable to load template for route: "${route.url}"`);
    })
  }

  window.addEventListener("hashchange", function () {
    var address = document.location.hash.replace("#", "")
    var currentRoute = _.find(routes, function (route) {
      return route.url === address
    })
    if (currentRoute) {
      loadRoute(currentRoute)
    } else {
      console.log("Unable to route");
    }
  });

  (function activate() {
    if (document.location.hash === "" || document.location.hash === "/") {
      document.location.hash = "/recipeList" // Default route
    } else {
      window.dispatchEvent(new Event('hashchange'))
    }
  })()
}
