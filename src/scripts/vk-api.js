export default function (id) {
  window.vkAsyncInit = function () {
    VK.init({
      apiId: id
    });
  };

  setTimeout(function () {
    var el = document.createElement("script");
    el.type = "text/javascript";
    el.src = "https://vk.com/js/api/openapi.js?169";
    el.async = true;
    document.getElementById("vk_api_transport").appendChild(el);
  }, 0);
}