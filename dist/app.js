import{r as e,a}from"./vendor-2388be36.js";import{m as t,u as n,a as r,b as l,C as m}from"./framework-b952df7c.js";var c=t((function({record:a,selected:t}){return e.createElement("div",{className:"x-a-a"},e.createElement("img",{src:a.flag,className:"x-a-bb"}),e.createElement("div",{className:"x-a-cc"},e.createElement("div",null,a.name),e.createElement("div",{className:"x-a-dd"},a.capital)))}));function d(){const[a,t]=n([]),[d,i]=n([]);r((()=>{fetch("data/countries.json").then((e=>e.json())).then(t)}),[]);const s=l((function(e){return""===(e=e.trim())?[]:new Promise((function(t,n){const r=new RegExp(e,"i");t(a.filter((e=>r.test(e.name)||r.test(e.capital))))}))}),[a]);return e.createElement("div",null,e.createElement("h5",null,"Normal"),e.createElement(m,{data:a,displayField:"name"}),e.createElement("h5",null,"Read Only"),e.createElement(m,{readOnly:!0,data:a,displayField:"name"}),e.createElement("h5",null,"Disabled"),e.createElement(m,{disabled:!0,data:a,displayField:"name"}),e.createElement("h5",null,"Search"),e.createElement(m,{displayField:"name",queryMode:"remote",onRemoteQuery:s,optionRenderer:c,hideTrigger:!0}))}var i={render:function(t){a.render(e.createElement(d,null),t)},unmount:function(e){a.unmountComponentAtNode(e)}};export default i;
//# sourceMappingURL=app.js.map
