"use strict";(self.webpackChunksantichat=self.webpackChunksantichat||[]).push([[232],{232:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d});var n=r(294);function a(e){const{text:t,uid:r,photoURL:a,auth:u}=e.message,o=r===u.currentUser?.uid?"sent":"received";return n.createElement(n.Fragment,null,n.createElement("div",{className:`message ${o}`},n.createElement("img",{src:a||"https://api.adorable.io/avatars/23/abott@adorable.png"}),n.createElement("p",null,t)))}var u=r(923),o=r.n(u),i=function(){return i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},i.apply(this,arguments)},s=function(e){return{loading:null==e,value:e}},l=function(e,t){var r=!e&&!t,n=!!e&&!!t&&e.isEqual(t);return r||n},c=function(e,t){var r=t?t.idField:void 0,a=function(e,t){var r=function(e){var t=e?e():void 0,r=(0,n.useReducer)((function(e,t){switch(t.type){case"error":return i({},e,{error:t.error,loading:!1,value:void 0});case"reset":return s(t.defaultValue);case"value":return i({},e,{error:void 0,loading:!1,value:t.value});default:return e}}),s(t)),a=r[0],u=r[1];return{error:a.error,loading:a.loading,reset:function(){var t=e?e():void 0;u({type:"reset",defaultValue:t})},setError:function(e){u({type:"error",error:e})},setValue:function(e){u({type:"value",value:e})},value:a.value}}(),a=r.error,u=r.loading,o=r.reset,c=r.setError,d=r.setValue,f=r.value,v=function(e,t){return function(e,t,r){var a=(0,n.useRef)(e);return(0,n.useEffect)((function(){t(e,a.current)||(a.current=e,r&&r())})),a}(e,l,t)}(e,o);return(0,n.useEffect)((function(){if(v.current){var e=t&&t.snapshotListenOptions?v.current.onSnapshot(t.snapshotListenOptions,d,c):v.current.onSnapshot(d,c);return function(){e()}}d(void 0)}),[v.current]),[f,u,a]}(e,{snapshotListenOptions:t?t.snapshotListenOptions:void 0}),u=a[0],o=a[1],c=a[2];return[(0,n.useMemo)((function(){return u?u.docs.map((function(e){return function(e,t){var r;if(e.exists)return i({},e.data(),t?((r={})[t]=e.id,r):null)}(e,r)})):void 0}),[u,r]),o,c]};function d({firestore:e,auth:t}){const r=(0,n.useRef)(null),u=e.collection("messages"),i=u.orderBy("createdAt").limit(25),[s]=c(i,{idField:"id"}),[l,d]=(0,n.useState)("");return n.createElement(n.Fragment,null,n.createElement("main",null,s&&s.map((e=>n.createElement(a,{key:e.id,message:e,auth:t}))),n.createElement("span",{ref:r})),n.createElement("form",{onSubmit:async e=>{e.preventDefault();const{uid:n,photoURL:a}=t.currentUser;await u.add({text:l,createdAt:o().firestore.FieldValue.serverTimestamp(),uid:n,photoURL:a}),d(""),r.current.scrollIntoView({behavior:"smooth"})}},n.createElement("input",{value:l,onChange:e=>d(e.target.value),placeholder:"Di algo lindo..."}),n.createElement("button",{type:"submit",disabled:!l},"Enviar")))}}}]);