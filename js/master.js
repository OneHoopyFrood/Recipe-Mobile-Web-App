var $ = function(selector) {
  return document.querySelectorAll(selector)
}

window.onload = function() {
  $(".recipe").forEach(function(node){
    node.addEventListener("touchend", function(){
      $(".recipe").forEach(function(oNode){
        oNode.classList.remove("focus")
      })
      node.classList.add("focus")
    })
  })
}
