const C="macl-v9",F=["./","index.html","manifest.json","logo.png","macl.png","icon-192.png","icon-512.png","apple-touch-icon.png","brands/kingtex.png","brands/yamato.png","brands/brother.png","brands/pegasus.png","brands/juki.png","brands/bruce.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  e.respondWith(fetch(r).then(res=>{
    if(res.ok||res.type==="opaque"){const c=res.clone();caches.open(C).then(ch=>ch.put(r,c))}
    return res;
  }).catch(()=>caches.match(r).then(x=>x||caches.match("./"))));
});
