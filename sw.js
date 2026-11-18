'use strict';
const CACHE='coine-grego-v1-1-20261118';
const ASSETS=['./','./index.html','./app.js','./lessons.js','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;event.respondWith((req.mode==='navigate'?fetch(req).then(response=>{const copy=response.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});return response}).catch(()=>caches.match(req).then(x=>x||caches.match('./index.html'))):caches.match(req).then(cached=>cached||fetch(req).then(response=>{if(response.ok&&new URL(req.url).origin===self.location.origin){const copy=response.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{})}return response}))));});
