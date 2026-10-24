/* MaqamAI service worker: uygulamayı cihaza kaydeder (internetsiz açılış), yazı tiplerini
   önbelleğe alır ve Android'deki "Paylaş → MaqamAI" ile gelen dosya ve bağlantıları karşılar.
   Bağlantıdan indirilen ses dosyalarına dokunmaz; onlar doğrudan ağdan gelir. */
const VERSION = '386a6d44fd8a';
const APP = `mq-app-${VERSION}`;
const RUNTIME = 'mq-runtime';
const SHARE = 'mq-share';
const SHELL = ["./","./index.html","./manifest.webmanifest","./gizlilik.html","./icons/apple-touch-icon.png","./icons/favicon-32.png","./icons/favicon.svg","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./fonts/amiri-quran.woff","./fonts/amiri.woff","./fonts/manrope.woff","./fonts/marcellus.woff"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(APP).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('mq-app-') && k !== APP).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function handleShare(request) {
  try {
    const form = await request.formData();
    const file = form.get('media');
    const text = String(form.get('text') || '');
    const link = String(form.get('url') || '');
    const title = String(form.get('title') || '');
    const params = new URLSearchParams();
    if (file && typeof file === 'object' && file.size) {
      const cache = await caches.open(SHARE);
      await cache.put('shared-media', new Response(file, { headers: { 'content-type': file.type || 'application/octet-stream', 'x-name': encodeURIComponent(file.name || 'paylasilan-kayit') } }));
      params.set('shared', '1');
    }
    const found = link || (text.match(/https?:\/\/\S+/) || [])[0] || (title.match(/https?:\/\/\S+/) || [])[0];
    if (found) params.set('link', found);
    const q = params.toString();
    return Response.redirect(new URL(q ? `./?${q}` : './', self.registration.scope).href, 303);
  } catch (e) {
    return Response.redirect(self.registration.scope, 303);
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method === 'POST' && url.origin === self.location.origin && url.pathname.endsWith('/share-target')) {
    event.respondWith(handleShare(req));
    return;
  }
  if (req.method !== 'GET') return;

  // Sayfa açılışları: önce ağ (yeni sürüm gelsin), internet yoksa cihazdaki kopya.
  // Uygulama kopyası yalnız uygulamanın kendi adresinden güncellenir; gizlilik sayfası gibi
  // diğer sayfalar kendi adlarıyla saklanır, uygulamanın yerine geçmez.
  if (req.mode === 'navigate') {
    const scope = new URL(self.registration.scope);
    const isApp = url.origin === scope.origin && (url.pathname === scope.pathname || url.pathname === `${scope.pathname}index.html`);
    event.respondWith((async () => {
      const cache = await caches.open(APP);
      try {
        const res = await fetch(req);
        if (res && res.ok && res.type === 'basic') cache.put(isApp ? './index.html' : url.origin + url.pathname, res.clone()).catch(() => {});
        return res;
      } catch (e) {
        const own = isApp ? null : await cache.match(url.origin + url.pathname);
        return own || (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Uygulama dosyaları (simgeler, manifest): önce cihaz
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
    return;
  }

  // Yazı tipleri: cihazdaki kopya hemen, arkada yenilenir
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME);
      const hit = await cache.match(req);
      const net = fetch(req).then((res) => {
        if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
        return res;
      }).catch(() => hit);
      return hit || net;
    })());
  }
  // Diğer istekler (bağlantıdan ses indirme vb.) olduğu gibi ağa gider
});
