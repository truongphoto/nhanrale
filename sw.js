const CACHE='nhan-ra-le-v2.3.1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-32.png','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const req=event.request;if(req.mode==='navigate'){event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return res}).catch(()=>caches.match('./index.html')));return}event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(new URL(req.url).origin===location.origin){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return res})))});
