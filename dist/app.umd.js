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

    var listbox = "listbox-module_listbox__16qJO";
    var option = "listbox-module_option__3a9MH";
    var focus = "listbox-module_focus__m8cIN";
    var selected = "listbox-module_selected__2AANR";

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
    var ListBox$1 = React.memo(ListBox);

    function useRandomId(prefix = "") {
      const id = React.useState(() => prefix + Math.round(Math.random() + Math.random() * 1e17).toString(32));
      return id[0];
    }

    const assign = Object.assign;
    const ACTION_TYPE_COLLAPSE = 0;
    const ACTION_TYPE_EXPAND = 1;
    const ACTION_TYPE_TOGGLE = 2;
    const ACTION_TYPE_KEY_ARROW_DOWN = 3;
    const ACTION_TYPE_KEY_ARROW_UP = 4;
    const ACTION_TYPE_KEY_ENTER = 5;
    const ACTION_TYPE_SELECT = 6;
    const ACTION_TYPE_SET_DATA = 7;
    const initialState = {
      expanded: false,
      focusIndex: -1,
      selection: void 0,
      data: [],
      range: []
    };
    function comboboxReducer(state, action) {
      switch (action.type) {
        case ACTION_TYPE_COLLAPSE:
          return assign({}, state, {
            expanded: false,
            focusIndex: -1
          });
        case ACTION_TYPE_EXPAND:
          return assign({}, state, {
            expanded: true
          });
        case ACTION_TYPE_TOGGLE:
          return assign({}, state, {
            expanded: !state.expanded
          });
        case ACTION_TYPE_KEY_ARROW_DOWN: {
          let count = state.range.length;
          return assign({}, state, {
            expanded: true,
            focusIndex: count === 0 ? -1 : (state.focusIndex + 1) % count
          });
        }
        case ACTION_TYPE_KEY_ARROW_UP: {
          let count = state.range.length;
          let index = state.focusIndex === -1 ? count : state.focusIndex;
          return assign({}, state, {
            expanded: true,
            focusIndex: count === 0 ? -1 : (count + index - 1) % count
          });
        }
        case ACTION_TYPE_KEY_ENTER:
          if (state.focusIndex !== -1) {
            return assign({}, state, {
              expanded: false,
              selection: state.range[state.focusIndex]
            });
          }
          break;
        case ACTION_TYPE_SELECT:
          return assign({}, state, {
            expanded: false,
            selection: action.selection
          });
        case ACTION_TYPE_SET_DATA: {
          let data = action.data;
          return assign({}, state, {
            data,
            range: data
          });
        }
      }
      return state;
    }
    function useComboboxActions(dispatch) {
      const expand = React.useCallback(function() {
        dispatch({type: ACTION_TYPE_EXPAND});
      }, [dispatch]);
      const collapse = React.useCallback(function() {
        dispatch({type: ACTION_TYPE_COLLAPSE});
      }, [dispatch]);
      const toggle = React.useCallback(function() {
        dispatch({type: ACTION_TYPE_TOGGLE});
      }, [dispatch]);
      const select = React.useCallback(function(selection) {
        dispatch({
          type: ACTION_TYPE_SELECT,
          selection
        });
      }, [dispatch]);
      const handleKeys = React.useCallback(function(event) {
        switch (event.key) {
          case "ArrowDown": {
            dispatch({type: ACTION_TYPE_KEY_ARROW_DOWN});
            break;
          }
          case "ArrowUp": {
            dispatch({type: ACTION_TYPE_KEY_ARROW_UP});
            break;
          }
          case "Escape":
            collapse();
            break;
          case "Enter":
            dispatch({type: ACTION_TYPE_KEY_ENTER});
            break;
        }
      }, [dispatch]);
      const handleInput = React.useCallback(function(event) {
        const inputEl = event.target;
        const text = inputEl.value;
      }, [dispatch]);
      const setData = React.useCallback(function(data) {
        dispatch({type: ACTION_TYPE_SET_DATA, data});
      }, [dispatch]);
      return {expand, collapse, toggle, select, handleKeys, handleInput, setData};
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
      const [state, dispatch] = React.useReducer(comboboxReducer, initialState);
      const {expanded, selection, range, focusIndex} = state;
      const {
        expand,
        collapse,
        toggle,
        select,
        handleKeys,
        handleInput,
        setData
      } = useComboboxActions(dispatch);
      const handleTriggerClick = React.useCallback(function() {
        let el = inputRef.current;
        if (el) {
          el.focus();
        }
        toggle();
      }, [inputRef]);
      React.useEffect(() => {
        setData(data);
      }, [data]);
      React.useEffect(() => {
        if (selection && inputRef.current) {
          inputRef.current.value = selection[displayField];
        }
      }, [selection, displayField, inputRef]);
      return /* @__PURE__ */ React__default['default'].createElement("div", {
        className: combobox
      }, /* @__PURE__ */ React__default['default'].createElement("div", {
        className: input_wrapper,
        role: "combobox",
        "aria-expanded": expanded ? "true" : "false",
        "aria-owns": listboxId,
        "aria-haspopup": "listbox"
      }, /* @__PURE__ */ React__default['default'].createElement("input", {
        type: "text",
        "aria-autocomplete": "both",
        "aria-controls": listboxId,
        "aria-activedescendant": focusIndex === -1 ? "" : id + "-option-" + focusIndex,
        onKeyDown: handleKeys,
        onInput: handleInput,
        className: input,
        ref: inputRef
      }), /* @__PURE__ */ React__default['default'].createElement("div", {
        className: trigger,
        tabIndex: -1,
        role: "button",
        "aria-label": "Show options",
        onClick: handleTriggerClick
      }, "▼")), /* @__PURE__ */ React__default['default'].createElement(ListBox$1, {
        id: listboxId,
        data: range,
        displayField,
        focusIndex,
        expanded,
        onSelect: select,
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
