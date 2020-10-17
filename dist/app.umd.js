(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react-dom'), require('react')) :
    typeof define === 'function' && define.amd ? define(['react-dom', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.app = factory(global.ReactDOM, global.React));
}(this, (function (ReactDOM, React) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    function ensureArray(subject) {
      if (subject == null)
        return [];
      if (Array.isArray(subject))
        return subject;
      return [subject];
    }

    function hasOwnProperty(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    }

    var listbox = "listbox-module_listbox__1kBCU";
    var option = "listbox-module_option__3ponE";
    var focus = "listbox-module_focus__YG_HO";
    var selected = "listbox-module_selected__4zSUv";

    function ListBox(props) {
      const {
        id,
        className = "",
        data,
        displayField,
        selected: selected$1,
        onSelect,
        focusIndex,
        expanded
      } = props;
      return /* @__PURE__ */ React__default['default'].createElement("ul", {
        id,
        role: "listbox",
        className: listbox + " " + className
      }, expanded ? ensureArray(data).map((item, index) => /* @__PURE__ */ React__default['default'].createElement("li", {
        key: id + "-option-" + index,
        role: "option",
        id: id + "-option-" + index,
        className: option + (focusIndex === index ? " " + focus : "") + (selected$1 === item ? " " + selected : ""),
        onClick: () => onSelect(item)
      }, hasOwnProperty(item, displayField) ? item[displayField] : null)) : null);
    }

    function useRandomId(prefix = "") {
      const id = React.useState(() => prefix + Math.round(Math.random() + Math.random() * 1e17).toString(32));
      return id[0];
    }

    var combobox = "Combobox-module_combobox__3xJ_Z";
    var input_wrapper = "Combobox-module_input_wrapper__3QtGA";
    var input = "Combobox-module_input__2eqaC";
    var trigger = "Combobox-module_trigger__30ep3";

    function Combobox(props) {
      const {data, displayField = "text", onChange} = props;
      const inputRef = React.useRef(null);
      const id = useRandomId("combobox-");
      const listboxId = id + "-listbox";
      const [expanded, setExpanded] = React.useState(false);
      const [focusIndex, setFocusIndex] = React.useState(-1);
      const [selection, setSelection] = React.useState();
      const collapse = React.useCallback(() => {
        setExpanded(false);
        setFocusIndex(-1);
      }, []);
      const handleKeyDown = React.useCallback(function(event) {
        const count = data.length;
        switch (event.key) {
          case "ArrowDown": {
            setExpanded(true);
            setFocusIndex((focusIndex + 1) % count);
            break;
          }
          case "ArrowUp": {
            setExpanded(true);
            let index = focusIndex === -1 ? count : focusIndex;
            setFocusIndex((count + index - 1) % count);
            break;
          }
          case "Escape":
            collapse();
            break;
          case "Enter":
            if (focusIndex !== -1) {
              handleSelect(data[focusIndex]);
            }
        }
      }, [data, focusIndex]);
      const handleTriggerClick = React.useCallback(function() {
        setExpanded(!expanded);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, [expanded, inputRef]);
      const handleSelect = React.useCallback(function(selection2) {
        setExpanded(false);
        setSelection(selection2);
        typeof onChange === "function" && onChange(selection2);
      }, []);
      return /* @__PURE__ */ React__default['default'].createElement("div", {
        className: combobox
      }, /* @__PURE__ */ React__default['default'].createElement("div", {
        className: input_wrapper,
        role: "combobox",
        "aria-expanded": "false",
        "aria-owns": listboxId,
        "aria-haspopup": "listbox"
      }, /* @__PURE__ */ React__default['default'].createElement("input", {
        type: "text",
        "aria-autocomplete": "both",
        "aria-controls": listboxId,
        "aria-activedescendant": focusIndex === -1 ? "" : id + "-option-" + focusIndex,
        onKeyDown: handleKeyDown,
        onBlur: () => collapse(),
        className: input,
        ref: inputRef
      }), /* @__PURE__ */ React__default['default'].createElement("div", {
        className: trigger,
        tabIndex: -1,
        role: "button",
        "aria-label": "Show options",
        onClick: handleTriggerClick
      }, "▼")), /* @__PURE__ */ React__default['default'].createElement(ListBox, {
        id: listboxId,
        data,
        displayField,
        focusIndex,
        expanded,
        onSelect: handleSelect,
        selected: selection
      }));
    }

    const veggies = [
      {
        text: "Apple",
        value: "apple"
      },
      {
        text: "Orange",
        value: "orange"
      },
      {
        text: "Banana",
        value: "banana"
      }
    ];
    function Application() {
      return /* @__PURE__ */ React__default['default'].createElement(Combobox, {
        label: "Fruit or Vegtable",
        value: "123",
        data: veggies
      });
    }

    function render(container) {
      ReactDOM__default['default'].render(/* @__PURE__ */ React__default['default'].createElement(Application, null), container);
    }
    function unmount(container) {
      ReactDOM__default['default'].unmountComponentAtNode(container);
    }
    var main = {
      render,
      unmount
    };

    return main;

})));
//# sourceMappingURL=app.umd.js.map
