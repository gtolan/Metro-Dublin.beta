!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){r(2),t.exports=r(1)},function(t,e,r){},function(t,e,r){"use strict";r.r(e);var n=function(){console.log("init sw"),"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js").then(function(t){console.log("ServiceWorker registration successful with scope: ",t.scope)},function(t){console.log("ServiceWorker registration failed: ",t)})},o=document.querySelectorAll(".tab"),i=(document.getElementById("ourWork"),document.querySelector("nav")),s=(document.getElementById("navWatch"),document.querySelectorAll(".bottom-border"),document.querySelectorAll("article .main"),{init:function(){s.createObserver()},createObserver:function(){var t={root:null,rootMargin:"0px",threshold:this.buildThresholdList()};new IntersectionObserver(s.handleIntersect,t)},buildThresholdList:function(){for(var t=[],e=1;e<=20;e++){var r=e/20;t.push(r)}return t.push(0),t},handleIntersect:function(t,e){t.forEach(function(t){if(t.intersectionRatio<.6&&t.target.classList.contains("main")?t.target.classList.add("init"):t.intersectionRatio>.6&&t.target.classList.contains("main")&&t.target.classList.remove("init"),t.intersectionRatio<.6&&"navWatch"==t.target.id?i.classList.add("fixed-nav"):t.intersectionRatio>.6&&"navWatch"==t.target.id&&i.classList.remove("fixed-nav"),t.intersectionRatio<.2&&t.target.classList.contains("bottom-border")?t.target.classList.remove("anim-border"):t.intersectionRatio>.9&&t.target.classList.contains("bottom-border")&&t.target.classList.add("anim-border"),t.intersectionRatio>.3&&"ourWork"==t.target.id){console.log(t.isIntersecting,"inter",t.target);for(var e=0;e<o.length;e++){o[e].classList.add("returnPos")}}else if(t.intersectionRatio<.3&&"ourWork"==t.target.id){console.log(t.isIntersecting,"inter",t.target);for(e=0;e<o.length;e++){o[e].classList.remove("returnPos")}}})}});n(),s.init()}]);