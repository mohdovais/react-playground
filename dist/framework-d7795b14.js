import{r as e,R as t}from"./vendor-3e966d15.js";const n=e.memo,a=e.useCallback,o=e.useState,r=e.useRef,c=e.useReducer,i=e.useEffect;const s=Object,l=s.assign;function d(e,t){return l({},e,t)}var u=n((function(e){const{id:n,className:a="",data:o,displayField:r,selected:c,focusIndex:l,expanded:d,style:u,onSelect:p,optionRenderer:f}=e,x=n+"-option-";return i((()=>{if(l>-1){const e=document.getElementById(x+l);e&&e.scrollIntoView({behavior:"smooth",block:"nearest"})}}),[l]),t.createElement("ul",{id:n,role:"listbox",className:"x-cc-kk "+a,style:u,tabIndex:-1},d?(y=o,null==y?[]:Array.isArray(y)?y:[y]).map(((e,n)=>{return t.createElement("li",{key:x+n,role:"option",id:x+n,className:"x-cc-ll"+(l===n?" x-cc-mm":"")+(c===e?" x-cc-nn":""),onClick:()=>p(e)},"function"==typeof f?f(e):(a=e,o=r,s.prototype.hasOwnProperty.call(a,o)?String(e[r]):null));var a,o})):null);var y}));const p=window,f=p.addEventListener,x=p.removeEventListener,y={display:"none"};function g(e){if(null==e)return y;const t=p.innerHeight,{top:n,bottom:a,height:o}=e.getBoundingClientRect();if(n<0||n>t)return y;return n<t-a?{top:o,maxHeight:t-a-5}:{bottom:o,maxHeight:n-5}}const m={id:"",displayField:"",expanded:!1,waiting:!1,focusIndex:-1,selection:void 0,data:[],range:[]};function b(e,t){switch(t.type){case 0:return d(e,{expanded:!1,focusIndex:-1});case 1:return d(e,{expanded:!0});case 2:return b(e,{type:e.expanded?0:1});case 3:{let t=e.range.length;return d(e,{expanded:!0,focusIndex:0===t?-1:(e.focusIndex+1)%t})}case 4:{let t=e.range.length,n=-1===e.focusIndex?t:e.focusIndex;return d(e,{expanded:!0,focusIndex:0===t?-1:(t+n-1)%t})}case 5:if(-1!==e.focusIndex)return d(e,{expanded:!1,focusIndex:-1,range:e.data,selection:e.range[e.focusIndex]});break;case 6:return d(e,{expanded:!1,focusIndex:-1,range:e.data,selection:t.selection});case 7:{let n=t.data;return d(e,{data:n,range:n})}case 8:{const n=new RegExp(t.query,"i");return d(e,{expanded:!0,range:e.data.filter((t=>n.test(t[e.displayField].toString())))})}case 9:return d(e,{expanded:!0,focusIndex:-1,waiting:!1,data:t.data,range:t.data});case 10:return d(e,{waiting:t.waiting})}return e}const{round:h,random:w}=Math;function I(e=""){return e+h(w()+1e17*w()).toString(32)}var v=n((function(e){const n=r(null),s=r(null),{queryMode:l="local",displayField:h="text",className:w="",data:v,hideTrigger:E,disabled:k,readOnly:S,onChange:R,onRemoteQuery:N,optionRenderer:F,displayRenderer:A}=e,[C,j]=c(b,m,(e=>d(e,{id:I("combobox-"),displayField:h}))),{toggle:q,select:D,handleKeys:L,handleRemoteSearch:O,handleLocalSearch:T,setData:H,setWaiting:K}=function(e){const t=a((function(){e({type:1})}),[e]),n=a((function(){e({type:0})}),[e]),o=a((function(){e({type:2})}),[e]),r=a((function(t){e({type:6,selection:t})}),[e]),c=a((function(t){switch(t.key){case"ArrowDown":e({type:3});break;case"ArrowUp":e({type:4});break;case"Escape":n();break;case"Enter":e({type:5})}}),[e]),i=a((function(t){e({type:8,query:t})}),[e]),s=a((function(t){e({type:7,data:t})}),[e]),l=a((function(t){e({type:9,data:t})}),[e]),d=a((function(t){e({type:10,waiting:t})}),[e]);return{expand:t,collapse:n,toggle:o,select:r,handleKeys:c,handleLocalSearch:i,setData:s,handleRemoteSearch:l,setWaiting:d}}(j),{id:z,expanded:B,selection:M,range:P,focusIndex:W,waiting:Q}=C,U=function(e,t){const n=e.current,[a,r]=o((()=>g(n)));return i((()=>{let e=!1;function a(){t&&!e&&(e=!0,p.requestAnimationFrame((()=>{r(g(n)),e=!1})))}return f("resize",a),f("scroll",a),t?a():r(y),()=>{x("resize",a),x("scroll",a)}}),[t,n]),a}(n,B),V=z+"-picker",G=B&&-1===W?"":V+"-option-"+W,J=a((()=>{!function(e){let t=e.current;t&&t.focus()}(s),q()}),[s]),X=a(function(e,t=250,n){let a;return function(){function o(t){clearTimeout(a),e.apply(n,t)}clearTimeout(a),a=setTimeout(o,t,Array.prototype.slice.call(arguments))}}((e=>{const t=e.target.value;"local"===l?T(t):(K(!0),Promise.resolve("function"==typeof N&&N(t)).then((e=>{!1!==e&&O(e)})))})),[l,N,K,T,O]);return i((()=>{void 0!==v&&H(v)}),[v]),i((()=>{const e=s.current;e&&(e.value=M?"function"==typeof A?A(M).toString():M[h].toString():"")}),[M,h,s,A]),i((()=>{"function"==typeof R&&R(M)}),[M,R]),t.createElement("div",{className:"x-bb-ee "+w+(Q?" wating x-bb-jj":""),ref:n},t.createElement("div",{className:"x-bb-ff",role:"combobox","aria-expanded":B?"true":"false","aria-owns":V,"aria-haspopup":"listbox"},t.createElement("input",{type:"text","aria-autocomplete":"both","aria-controls":V,"aria-activedescendant":G,onKeyDown:L,onInput:X,className:"x-bb-gg",ref:s,disabled:k,readOnly:S}),E?null:t.createElement("div",{className:"x-bb-hh",tabIndex:-1,role:"button","aria-label":"Show options",onClick:k?void 0:J},"▼")),t.createElement(u,{id:V,data:P,displayField:h,focusIndex:W,expanded:B,onSelect:D,selected:M,optionRenderer:F,className:"x-bb-ii",style:U}))}));export{v as C,i as a,a as b,n as m,o as u};
//# sourceMappingURL=framework-d7795b14.js.map