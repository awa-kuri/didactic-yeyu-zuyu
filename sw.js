// 手湯：一度開けば、電波のない風呂場でも動くように手元に置いておく
var CACHE = "teyu-v4";
var FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "sounds/out.mp3", "sounds/back.mp3", "sounds/ready.mp3", "sounds/rest.mp3", "sounds/chime.mp3",
  "sounds/out.wav", "sounds/back.wav", "sounds/ready.wav", "sounds/rest.wav", "sounds/chime.wav",
  "voice/koede.mp3", "voice/nigiru.mp3", "voice/hiraku.mp3", "voice/mageru.mp3", "voice/modosu.mp3", "voice/sorasu.mp3",
  "voice/oyayubi.mp3", "voice/koyubi.mp3", "voice/ue.mp3", "voice/shita.mp3", "voice/mae.mp3", "voice/ushiro.mp3",
  "voice/osu.mp3", "voice/yurumeru.mp3", "voice/tojiru.mp3", "voice/ageru.mp3", "voice/orosu.mp3", "voice/item1.mp3",
  "voice/item2.mp3", "voice/item3.mp3", "voice/item4.mp3", "voice/item5.mp3", "voice/item6.mp3", "voice/item7.mp3",
  "voice/item8.mp3", "voice/item9.mp3", "voice/yasumu.mp3", "voice/sunda.mp3"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// 先に手元を見て、無ければ取りに行く
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      return hit || fetch(e.request);
    })
  );
});
