import { r as react, a as reactDom } from './vendor-57b36b2c.js';
import { m as memo, u as useState, a as useEffect, b as useCallback, C as Combobox } from './framework-e0591300.js';

var wrapper = "option-country-module__wrapper___31TMw";
var flag = "option-country-module__flag___2cNdo";
var details = "option-country-module__details___dh_M_";
var capital = "option-country-module__capital___2axr3";

function CountryOption({country}) {
  return /* @__PURE__ */ react.createElement("div", {
    className: wrapper
  }, /* @__PURE__ */ react.createElement("img", {
    src: country.flag,
    className: flag
  }), /* @__PURE__ */ react.createElement("div", {
    className: details
  }, /* @__PURE__ */ react.createElement("div", null, country.name), /* @__PURE__ */ react.createElement("div", {
    className: capital
  }, country.capital)));
}
var OptionCountry = memo(CountryOption);

function Application() {
  const [countries, setCountries] = useState([]);
  const [remoteData, setRemoteData] = useState([]);
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
  const optionRenderer = useCallback(function(country) {
    return /* @__PURE__ */ react.createElement(OptionCountry, {
      country
    });
  }, []);
  return /* @__PURE__ */ react.createElement("div", null, /* @__PURE__ */ react.createElement("h5", null, "Normal"), /* @__PURE__ */ react.createElement(Combobox, {
    data: countries,
    displayField: "name"
  }), /* @__PURE__ */ react.createElement("h5", null, "Read Only"), /* @__PURE__ */ react.createElement(Combobox, {
    readOnly: true,
    data: countries,
    displayField: "name"
  }), /* @__PURE__ */ react.createElement("h5", null, "Disabled"), /* @__PURE__ */ react.createElement(Combobox, {
    disabled: true,
    data: countries,
    displayField: "name"
  }), /* @__PURE__ */ react.createElement("h5", null, "Search"), /* @__PURE__ */ react.createElement(Combobox, {
    displayField: "name",
    queryMode: "remote",
    onRemoteQuery: remoteQuery,
    optionRenderer,
    hideTrigger: true
  }));
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
