(function () {
  var id = 113501726;
  window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
  window.ym.l = Date.now();
  window.ym(id, 'init', { webvisor: true, clickmap: true, accurateTrackBounce: true, trackLinks: true });
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js?id=' + id;
  document.head.appendChild(script);
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    var goal = href.startsWith('tel:') ? 'click_phone' :
      /^https:\/\/max\.ru\//.test(href) ? 'click_max' :
      /^https:\/\/t\.me\//.test(href) ? 'click_telegram' :
      /^https:\/\/wa\.me\//.test(href) ? 'click_whatsapp' : null;
    if (goal) window.ym(id, 'reachGoal', goal);
  });
  document.addEventListener('change', function (event) {
    if (event.target.closest && event.target.closest('#calc')) window.ym(id, 'reachGoal', 'calc_interaction');
  });
})();
