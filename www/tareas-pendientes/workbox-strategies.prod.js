this.workbox=this.workbox||{},this.workbox.strategies=function(t,e,r,s,a,n,o,i,c){"use strict";function h(){return(h=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t}).apply(this,arguments)}try{self["workbox:strategies:6.0.2"]&&_()}catch(t){}function l(t){return"string"==typeof t?new Request(t):t}class u{constructor(t,e){this.vt={},Object.assign(this,e),this.event=e.event,this.ht=t,this.bt=new o.Deferred,this._t=[],this.kt=[...t.plugins],this.xt=new Map;for(const t of this.kt)this.xt.set(t,{});this.event.waitUntil(this.bt.promise)}fetch(t){return this.waitUntil((async()=>{const{event:e}=this;let s=l(t);if("navigate"===s.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const a=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))s=await t({request:s.clone(),event:e})}catch(t){throw new r.WorkboxError("plugin-error-request-will-fetch",{thrownError:t})}const n=s.clone();try{let t;t=await fetch(s,"navigate"===s.mode?void 0:this.ht.fetchOptions);for(const r of this.iterateCallbacks("fetchDidSucceed"))t=await r({event:e,request:n,response:t});return t}catch(t){throw a&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:a.clone(),request:n.clone()}),t}})())}async fetchAndCachePut(t){const e=await this.fetch(t),r=e.clone();return this.waitUntil(this.cachePut(t,r)),e}cacheMatch(t){return this.waitUntil((async()=>{const e=l(t);let r;const{cacheName:s,matchOptions:a}=this.ht,n=await this.getCacheKey(e,"read"),o=h({},a,{cacheName:s});r=await caches.match(n,o);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))r=await t({cacheName:s,matchOptions:a,cachedResponse:r,request:n,event:this.event})||void 0;return r})())}async cachePut(t,e){const s=l(t);await c.timeout(0);const o=await this.getCacheKey(s,"write");if(!e)throw new r.WorkboxError("cache-put-with-no-response",{url:a.getFriendlyURL(o.url)});const h=await this.Rt(e);if(!h)return;const{cacheName:u,matchOptions:w}=this.ht,p=await self.caches.open(u),f=this.hasCallback("cacheDidUpdate"),d=f?await n.cacheMatchIgnoreParams(p,o.clone(),["__WB_REVISION__"],w):null;try{await p.put(o,f?h.clone():h)}catch(t){throw"QuotaExceededError"===t.name&&await i.executeQuotaErrorCallbacks(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:u,oldResponse:d,newResponse:h.clone(),request:o,event:this.event})}async getCacheKey(t,e){if(!this.vt[e]){let r=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))r=l(await t({mode:e,request:r,event:this.event,params:this.params}));this.vt[e]=r}return this.vt[e]}hasCallback(t){for(const e of this.ht.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const r of this.iterateCallbacks(t))await r(e)}*iterateCallbacks(t){for(const e of this.ht.plugins)if("function"==typeof e[t]){const r=this.xt.get(e),s=s=>{const a=h({},s,{state:r});return e[t](a)};yield s}}waitUntil(t){return this._t.push(t),t}async doneWaiting(){let t;for(;t=this._t.shift();)await t}destroy(){this.bt.resolve()}async Rt(t){let e=t,r=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,r=!0,!e)break;return r||e&&200!==e.status&&(e=void 0),e}}class w{constructor(t={}){this.cacheName=s.cacheNames.getRuntimeName(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,r="string"==typeof t.request?new Request(t.request):t.request,s="params"in t?t.params:void 0,a=new u(this,{event:e,request:r,params:s}),n=this.Wt(a,r,e);return[n,this.Ut(n,a,r,e)]}async Wt(t,e,s){let a;await t.runCallbacks("handlerWillStart",{event:s,request:e});try{if(a=await this._handle(e,t),!a||"error"===a.type)throw new r.WorkboxError("no-response",{url:e.url})}catch(r){for(const n of t.iterateCallbacks("handlerDidError"))if(a=await n({error:r,event:s,request:e}),a)break;if(!a)throw r}for(const r of t.iterateCallbacks("handlerWillRespond"))a=await r({event:s,request:e,response:a});return a}async Ut(t,e,r,s){let a,n;try{a=await t}catch(n){}try{await e.runCallbacks("handlerDidRespond",{event:s,request:r,response:a}),await e.doneWaiting()}catch(t){n=t}if(await e.runCallbacks("handlerDidComplete",{event:s,request:r,response:a,error:n}),e.destroy(),n)throw n}}const p={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null};return t.CacheFirst=class extends w{async _handle(t,e){let s,a=await e.cacheMatch(t);if(!a)try{a=await e.fetchAndCachePut(t)}catch(t){s=t}if(!a)throw new r.WorkboxError("no-response",{url:t.url,error:s});return a}},t.CacheOnly=class extends w{async _handle(t,e){const s=await e.cacheMatch(t);if(!s)throw new r.WorkboxError("no-response",{url:t.url});return s}},t.NetworkFirst=class extends w{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(p),this.Ct=t.networkTimeoutSeconds||0}async _handle(t,e){const s=[],a=[];let n;if(this.Ct){const{id:r,promise:o}=this.Dt({request:t,logs:s,handler:e});n=r,a.push(o)}const o=this.Et({timeoutId:n,request:t,logs:s,handler:e});a.push(o);for(const t of a)e.waitUntil(t);let i=await Promise.race(a);if(i||(i=await o),!i)throw new r.WorkboxError("no-response",{url:t.url});return i}Dt({request:t,logs:e,handler:r}){let s;return{promise:new Promise((e=>{s=setTimeout((async()=>{e(await r.cacheMatch(t))}),1e3*this.Ct)})),id:s}}async Et({timeoutId:t,request:e,logs:r,handler:s}){let a,n;try{n=await s.fetchAndCachePut(e)}catch(t){a=t}return t&&clearTimeout(t),!a&&n||(n=await s.cacheMatch(e)),n}},t.NetworkOnly=class extends w{constructor(t={}){super(t),this.Ct=t.networkTimeoutSeconds||0}async _handle(t,e){let s,a;try{const r=[e.fetch(t)];if(this.Ct){const t=c.timeout(1e3*this.Ct);r.push(t)}if(s=await Promise.race(r),!s)throw new Error("Timed out the network response after "+this.Ct+" seconds.")}catch(t){a=t}if(!s)throw new r.WorkboxError("no-response",{url:t.url,error:a});return s}},t.StaleWhileRevalidate=class extends w{constructor(t){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(p)}async _handle(t,e){const s=e.fetchAndCachePut(t).catch((()=>{}));let a,n=await e.cacheMatch(t);if(n);else try{n=await s}catch(t){a=t}if(!n)throw new r.WorkboxError("no-response",{url:t.url,error:a});return n}},t.Strategy=w,t.StrategyHandler=u,t}({},workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private);