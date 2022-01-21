export default function (id) {
  if (!id) return
  var t = document.createElement("script");
  t.type = "text/javascript",
    t.async = !0,
    t.src = "https://vk.com/js/api/openapi.js?169",
    t.onload = function () {
      VK.Retargeting.Init(id),
        VK.Retargeting.Hit()
    },
    document.head.appendChild(t)
}