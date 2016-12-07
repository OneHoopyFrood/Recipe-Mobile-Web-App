// Thank you to http://jsforallof.us/2014/12/01/the-anatomy-of-a-simple-templating-engine/
var Template = function (html) {
  this.textContent = html
}
Template.prototype.getHtml = function (viewdata) {
  var returnHtml = this.textContent
  for(var x in viewdata){
    var re = re = "{{\\s?" + x + "\\s?}}"
      returnHtml = returnHtml.replace(new RegExp(re, "ig"), viewdata[x])
    }
    return returnHtml
}
Template.prototype.getNode = function (viewdata) {
  var div = document.createElement("div")
  div.innerHTML = this.getHtml(viewdata)
  return div.firstChild
}
