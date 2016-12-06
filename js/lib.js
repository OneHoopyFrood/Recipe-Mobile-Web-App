var $ = function (selector) {
  return document.querySelectorAll(selector)
}
$.get = function (url) {
  return new Promise(function (success, error) {
    var req = new XMLHttpRequest()
    req.open("GET", url)
    req.addEventListener("load", listener)
    req.send()

    function listener(res) {
      if(this.response[0] == '[' || this.response[0] == '{') {
        this.responseJSON = JSON.parse(this.responseText)
      }
      if (this.status == 200) {
        success({
          status: this.status,
          data: this.responseJSON || this.response
        })
      } else {
        error({
          status: this.status,
          data: this.responseJSON || this.response
        })
      }
    }
  })
}
