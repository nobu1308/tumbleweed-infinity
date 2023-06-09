!function(){"use strict";class t{constructor(t,e,n){if(0!==Math.round(t+e+n))throw new Error("q + r + s must be 0");this.q=t,this.r=e,this.s=n}get id(){return`hex_${this.q}_${this.r}_${this.s}`}}function e(e,n){return new t(e.q+n.q,e.r+n.r,e.s+n.s)}const n=[new t(1,0,-1),new t(1,-1,0),new t(0,-1,1),new t(-1,0,1),new t(-1,1,0),new t(0,1,-1)];function r(t){return n[t]}function s(t,n){return e(t,r(n))}function o(n,o){const i=[];let a=e(n,(c=r(4),u=o,new t(c.q*u,c.r*u,c.s*u)));var c,u;for(let t=0;t<6;t+=1)for(let e=0;e<o;e+=1)i.push(a),a=s(a,t);return i}class i{constructor(t,e,n,r){this.hex=t,this.playerId=e,this.stack=n,this.isLastMove=r}}class a{constructor(){this.state=new Map}set(t,e,n,r){return this.state.set(t.id,new i(t,e,n,r)),this}get(t){return this.state.get(t.id)}isOnBoard(t){return this.state.has(t.id)}values(){return Array.from(this.state.values())}}class c{constructor(t,e){this.x=t,this.y=e}}function u(t,e){const n=(t.orientation.f0*e.q+t.orientation.f1*e.r)*t.radius,r=(t.orientation.f2*e.q+t.orientation.f3*e.r)*t.radius;return new c(n+t.origin.x,r+t.origin.y)}function h(t,e,n){const r=[];for(let s=0;s<2*Math.PI;s+=Math.PI/3){const o=t+n*Math.sin(s),i=e+n*Math.cos(s);r.push(`${o},${i}`)}return r.join(" ")}function l(t,e,n,r){const s=document.createElementNS("http://www.w3.org/2000/svg","polygon");return s.style.fill=e,s.style.stroke=n,s.style.strokeWidth=r,s.setAttribute("points",t),s}function d(t,e,n,r){n.values().forEach((n=>{if("EMPTY"!==n.playerId){const s=u(e,n.hex);t.appendChild(l(h(s.x,s.y,r),function(t){switch(t){case"PLAYER1":return"#C91C24";case"PLAYER2":return"#F9F9F3";case"NEUTRAL":return"#009173";default:throw new Error}}(n.playerId),n.isLastMove?"#666666":"#451110",n.isLastMove?"1.5px":"0.5px")),t.appendChild(function(t,e,n,r,s){const o=document.createElementNS("http://www.w3.org/2000/svg","text");return o.setAttribute("x",String(t)),o.setAttribute("y",String(e+(s>12?2:1))),o.setAttribute("class",r),o.appendChild(document.createTextNode(n)),o}(s.x,s.y,String(n.stack),n.playerId.toLowerCase(),r))}}))}function f(t,e,n){(function(t,e){let n=[t];for(let r=1;r<=e;r+=1)n=n.concat(o(t,r));return n})(e,n).forEach((e=>{t.isOnBoard(e)||t.set(e,"EMPTY",0,!1)}))}function w(t,e,n,r){t.set(e,r,n,!1),f(t,e,n)}function p(e,r,s){let o=0;for(const i of n){let n=r;for(;n=new t(n.q+i.q,n.r+i.r,n.s+i.s),e.isOnBoard(n);){const t=e.get(n);if("EMPTY"!=t.playerId){t.playerId==s&&(o+=1);break}}}return o}function g(e,n){var r;const s=Number(null!==(r=e.dataset.boardRadius)&&void 0!==r?r:0);if(!s)throw new Error("data-board-radius must be greater than zero");const o=e.getBoundingClientRect(),f=function(t,e,n){return{orientation:{f0:Math.sqrt(3),f1:Math.sqrt(3)/2,f2:0,f3:1.5,b0:Math.sqrt(3)/3,b1:-1/3,b2:0,b3:2/3,startAngle:.5},radius:t,origin:new c(e/2,n/2)}}(+s,o.width,o.height),g=new a;w(g,new t(0,0,0),2,"NEUTRAL");const E=()=>{const t=g.values().filter((t=>"EMPTY"===t.playerId)).map((t=>t.hex));return t[Math.floor(Math.random()*t.length)]};w(g,E(),1,"PLAYER1"),w(g,E(),1,"PLAYER2");let M="PLAYER1";const m=()=>{e.replaceChildren();const t=document.createElementNS("http://www.w3.org/2000/svg","g");e.appendChild(t),function(t,e,n,r){n.values().forEach((n=>{const s=u(e,n.hex);t.appendChild(l(h(s.x,s.y,r),"#FBE1AD","#000000","0.1px"))}))}(t,f,g,s),d(t,f,g,s)};m(),setInterval((()=>{const t=function(t,e){const n=[];for(const r of t.values()){const s=p(t,r.hex,e);s>r.stack&&n.push(new i(r.hex,e,s,!1))}return n}(g,M),e=t[Math.floor(Math.random()*t.length)];w(g,e.hex,e.stack,M),M="PLAYER1"===M?"PLAYER2":"PLAYER1",m()}),n)}document.querySelectorAll("svg.game").forEach((t=>{g(t,document.location.hash?Number(document.location.hash.substring(1)):2)}))}();
