import { r as react, a as reactDom } from './vendor-9c23ed1e.js';
import { u as useState, a as useEffect, b as useCallback, C as Combobox, O as OptGroup, c as Option } from './framework-46d4dcc2.js';

var combobox = "Application-module__combobox____lZNx";
var optgroup = "Application-module__optgroup___3MXeI";
var option = "Application-module__option___1wHdP";

function Application() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("data/countries.json").then((response) => response.json()).then(setCountries);
  }, []);
  const remoteQuery = useCallback(function(query) {
    query = query.trim();
    if (query === "")
      return [];
    return new Promise(function(resolve, reject) {
      const re = new RegExp(query, "i");
      const result = countries.filter((country) => {
        return re.test(country.name) || re.test(country.capital);
      });
      resolve(result);
    });
  }, [countries]);
  const regions = countries.reduce(function(accum, country) {
    const region = country.region;
    if (!accum[region]) {
      accum[region] = [];
    }
    accum[region].push(country);
    return accum;
  }, {});
  return /* @__PURE__ */ react.createElement("div", null, /* @__PURE__ */ react.createElement(Combobox, {
    onChange: console.log,
    className: combobox
  }, Object.keys(regions).map((region) => /* @__PURE__ */ react.createElement(OptGroup, {
    key: region,
    label: region,
    disabled: region === "EU",
    className: optgroup
  }, regions[region].map((country) => /* @__PURE__ */ react.createElement(Option, {
    key: country.code,
    value: country.code,
    selected: country.name === "India" || country.name === "Pakistan",
    className: option
  }, country.name))))), "-", /* @__PURE__ */ react.createElement(Combobox, {
    onChange: console.log,
    className: combobox
  }), "-", /* @__PURE__ */ react.createElement(Combobox, {
    onChange: console.log,
    className: combobox
  }, /* @__PURE__ */ react.createElement(Option, {
    value: "IN"
  }, "India")), "-", /* @__PURE__ */ react.createElement(Combobox, {
    onChange: console.log,
    className: combobox
  }, /* @__PURE__ */ react.createElement(Option, {
    value: "IN"
  }, "In", /* @__PURE__ */ react.createElement("span", null, "d"), "ia")));
}

function render(container) {
  reactDom.render(/* @__PURE__ */ react.createElement(Application, null), container);
}
function unmount(container) {
  reactDom.unmountComponentAtNode(container);
}
var app = {
  render,
  unmount
};

export default app;
//# sourceMappingURL=app.js.map
