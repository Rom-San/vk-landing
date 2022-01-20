export default function (id) {
  if (!id) return
  var t = document.createElement("script");
  t.type = "text/javascript",
    t.async = !0,
    t.src = "https://vk.com/js/api/openapi.js?169",
    t.onload = function () {
      VK.init({ apiId: 7831726 }),
        VK.Retargeting.Init(id),
        VK.Retargeting.Hit()
      return VK.api
    },
    document.head.appendChild(t)
}