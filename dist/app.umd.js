(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react-dom'), require('react')) :
    typeof define === 'function' && define.amd ? define(['react-dom', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.app = factory(global.ReactDOM, global.React));
}(this, (function (ReactDOM, React) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var React__namespace = /*#__PURE__*/_interopNamespace(React);
    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    const memo = React.memo;
    const useCallback = React.useCallback;
    const useState = React.useState;
    const useRef = React.useRef;
    const useReducer = React.useReducer;
    const useEffect = React.useEffect;

    function ensureArray(subject) {
      if (subject == null)
        return [];
      if (Array.isArray(subject))
        return subject;
      return [subject];
    }

    const O = Object;
    const assign = O.assign;
    function extend(a, b) {
      return assign({}, a, b);
    }
    function hasOwnProperty(object, property) {
      return O.prototype.hasOwnProperty.call(object, property);
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
        focusIndex,
        expanded,
        style,
        onSelect,
        optionRenderer
      } = props;
      const idPrefx = id + "-option-";
      useEffect(() => {
        if (focusIndex > -1) {
          const li = document.getElementById(idPrefx + focusIndex);
          if (li) {
            li.scrollIntoView({behavior: "smooth", block: "nearest"});
          }
        }
      }, [focusIndex]);
      return /* @__PURE__ */ React__namespace.createElement("ul", {
        id,
        role: "listbox",
        className: listbox + " " + className,
        style,
        tabIndex: -1
      }, expanded ? ensureArray(data).map((item, index) => /* @__PURE__ */ React__namespace.createElement("li", {
        key: idPrefx + index,
        role: "option",
        id: idPrefx + index,
        className: option + (focusIndex === index ? " " + focus : "") + (selected$1 === item ? " " + selected : ""),
        onClick: () => onSelect(item)
      }, typeof optionRenderer === "function" ? optionRenderer(item) : hasOwnProperty(item, displayField) ? String(item[displayField]) : null)) : null);
    }
    var ListBox$1 = memo(ListBox);

    const win = window;
    const addEventListener = win.addEventListener;
    const removeEventListener = win.removeEventListener;

    const displayNone = {
      display: "none"
    };
    function getPosition(el) {
      if (el == null) {
        return displayNone;
      }
      const viewportHeight = win.innerHeight;
      const {top, bottom, height} = el.getBoundingClientRect();
      if (top < 0 || top > viewportHeight) {
        return displayNone;
      }
      const bottomSpace = viewportHeight - bottom;
      if (top < bottomSpace) {
        return {
          top: height,
          maxHeight: viewportHeight - bottom - 5
        };
      }
      return {
        bottom: height,
        maxHeight: top - 5
      };
    }
    function usePickerPosition(ref, calculate) {
      const current = ref.current;
      const [postion, setPosition] = useState(() => getPosition(current));
      useEffect(() => {
        let busy = false;
        function doCalculate() {
          if (calculate && !busy) {
            busy = true;
            win.requestAnimationFrame(() => {
              setPosition(getPosition(current));
              busy = false;
            });
          }
        }
        addEventListener("resize", doCalculate);
        addEventListener("scroll", doCalculate);
        if (calculate) {
          doCalculate();
        } else {
          setPosition(displayNone);
        }
        return () => {
          removeEventListener("resize", doCalculate);
          removeEventListener("scroll", doCalculate);
        };
      }, [calculate, current]);
      return postion;
    }

    const ACTION_TYPE_COLLAPSE = 0;
    const ACTION_TYPE_EXPAND = 1;
    const ACTION_TYPE_TOGGLE = 2;
    const ACTION_TYPE_KEY_ARROW_DOWN = 3;
    const ACTION_TYPE_KEY_ARROW_UP = 4;
    const ACTION_TYPE_KEY_ENTER = 5;
    const ACTION_TYPE_SELECT = 6;
    const ACTION_TYPE_SET_DATA = 7;
    const ACTION_TYPE_LOCAL_SEARCH = 8;
    const ACTION_TYPE_SET_DATA_AND_EXPAND = 9;
    const ACTION_TYPE_SET_WAITING = 10;
    const initialState = {
      id: "",
      displayField: "",
      expanded: false,
      waiting: false,
      focusIndex: -1,
      selection: void 0,
      data: [],
      range: []
    };
    function comboboxReducer(state, action) {
      switch (action.type) {
        case ACTION_TYPE_COLLAPSE:
          return extend(state, {
            expanded: false,
            focusIndex: -1
          });
        case ACTION_TYPE_EXPAND:
          return extend(state, {
            expanded: true
          });
        case ACTION_TYPE_TOGGLE:
          return comboboxReducer(state, {
            type: state.expanded ? ACTION_TYPE_COLLAPSE : ACTION_TYPE_EXPAND
          });
        case ACTION_TYPE_KEY_ARROW_DOWN: {
          let count = state.range.length;
          return extend(state, {
            expanded: true,
            focusIndex: count === 0 ? -1 : (state.focusIndex + 1) % count
          });
        }
        case ACTION_TYPE_KEY_ARROW_UP: {
          let count = state.range.length;
          let index = state.focusIndex === -1 ? count : state.focusIndex;
          return extend(state, {
            expanded: true,
            focusIndex: count === 0 ? -1 : (count + index - 1) % count
          });
        }
        case ACTION_TYPE_KEY_ENTER:
          if (state.focusIndex !== -1) {
            return extend(state, {
              expanded: false,
              focusIndex: -1,
              range: state.data,
              selection: state.range[state.focusIndex]
            });
          }
          break;
        case ACTION_TYPE_SELECT:
          return extend(state, {
            expanded: false,
            focusIndex: -1,
            range: state.data,
            selection: action.selection
          });
        case ACTION_TYPE_SET_DATA: {
          let data = action.data;
          return extend(state, {
            data,
            range: data
          });
        }
        case ACTION_TYPE_LOCAL_SEARCH: {
          const search = new RegExp(action.query, "i");
          return extend(state, {
            expanded: true,
            range: state.data.filter((record) => search.test(record[state.displayField].toString()))
          });
        }
        case ACTION_TYPE_SET_DATA_AND_EXPAND:
          return extend(state, {
            expanded: true,
            focusIndex: -1,
            waiting: false,
            data: action.data,
            range: action.data
          });
        case ACTION_TYPE_SET_WAITING:
          return extend(state, {
            waiting: action.waiting
          });
      }
      return state;
    }

    function useComboboxActions(dispatch) {
      const expand = useCallback(function() {
        dispatch({type: ACTION_TYPE_EXPAND});
      }, [dispatch]);
      const collapse = useCallback(function() {
        dispatch({type: ACTION_TYPE_COLLAPSE});
      }, [dispatch]);
      const toggle = useCallback(function() {
        dispatch({type: ACTION_TYPE_TOGGLE});
      }, [dispatch]);
      const select = useCallback(function(selection) {
        dispatch({
          type: ACTION_TYPE_SELECT,
          selection
        });
      }, [dispatch]);
      const handleKeys = useCallback(function(event) {
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
      const handleLocalSearch = useCallback(function(query) {
        dispatch({
          type: ACTION_TYPE_LOCAL_SEARCH,
          query
        });
      }, [dispatch]);
      const setData = useCallback(function(data) {
        dispatch({type: ACTION_TYPE_SET_DATA, data});
      }, [dispatch]);
      const handleRemoteSearch = useCallback(function(data) {
        dispatch({type: ACTION_TYPE_SET_DATA_AND_EXPAND, data});
      }, [dispatch]);
      const setWaiting = useCallback(function(waiting) {
        dispatch({type: ACTION_TYPE_SET_WAITING, waiting});
      }, [dispatch]);
      return {
        expand,
        collapse,
        toggle,
        select,
        handleKeys,
        handleLocalSearch,
        setData,
        handleRemoteSearch,
        setWaiting
      };
    }

    const {round, random} = Math;
    function randomId(prefix = "") {
      return prefix + round(random() + random() * 1e17).toString(32);
    }

    var combobox = "combobox-module_combobox__2i64f";
    var input_wrapper = "combobox-module_input_wrapper__1Zu2R";
    var input = "combobox-module_input__2AUD3";
    var trigger = "combobox-module_trigger__29Deo";
    var picker = "combobox-module_picker__1MrXx";

    function Combobox(props) {
      const {
        queryMode = "local",
        onRemoteQuery,
        data,
        displayField = "text",
        className = "",
        onChange,
        optionRenderer,
        displayRenderer,
        hideTrigger,
        disabled,
        readOnly
      } = props;
      const comboboxRef = useRef(null);
      const inputRef = useRef(null);
      const [state, dispatch] = useReducer(comboboxReducer, initialState, (state2) => extend(state2, {id: randomId("combobox-"), displayField}));
      const {
        toggle,
        select,
        handleKeys,
        handleRemoteSearch,
        handleLocalSearch,
        setData,
        setWaiting
      } = useComboboxActions(dispatch);
      const {id, expanded, selection, range, focusIndex, waiting} = state;
      const pickerStyle = usePickerPosition(comboboxRef, expanded);
      const pickerId = id + "-picker";
      const activeDescendantId = expanded && focusIndex === -1 ? "" : pickerId + "-option-" + focusIndex;
      const handleTriggerClick = useCallback(function() {
        let el = inputRef.current;
        if (el) {
          el.focus();
        }
        toggle();
      }, [inputRef]);
      const handleInput = useCallback((event) => {
        const input = event.target;
        const text = input.value;
        if (queryMode === "local") {
          handleLocalSearch(text);
        } else {
          setWaiting(true);
          Promise.resolve(typeof onRemoteQuery === "function" && onRemoteQuery(text)).then((data2) => {
            data2 !== false && handleRemoteSearch(data2);
          });
        }
      }, [handleRemoteSearch, onRemoteQuery]);
      useEffect(() => {
        if (data !== void 0) {
          setData(data);
        }
      }, [data]);
      useEffect(() => {
        const input = inputRef.current;
        if (input) {
          input.value = selection ? typeof displayRenderer === "function" ? displayRenderer(selection).toString() : selection[displayField].toString() : "";
        }
      }, [selection, displayField, inputRef, displayRenderer]);
      useEffect(() => {
        if (typeof onChange === "function") {
          onChange(selection);
        }
      }, [selection, onChange]);
      return /* @__PURE__ */ React__namespace.createElement("div", {
        className: combobox + " " + className + (waiting ? " wating" : ""),
        ref: comboboxRef
      }, /* @__PURE__ */ React__namespace.createElement("div", {
        className: input_wrapper,
        role: "combobox",
        "aria-expanded": expanded ? "true" : "false",
        "aria-owns": pickerId,
        "aria-haspopup": "listbox"
      }, /* @__PURE__ */ React__namespace.createElement("input", {
        type: "text",
        "aria-autocomplete": "both",
        "aria-controls": pickerId,
        "aria-activedescendant": activeDescendantId,
        onKeyDown: handleKeys,
        onInput: handleInput,
        className: input,
        ref: inputRef,
        disabled,
        readOnly
      }), hideTrigger ? null : /* @__PURE__ */ React__namespace.createElement("div", {
        className: trigger,
        tabIndex: -1,
        role: "button",
        "aria-label": "Show options",
        onClick: disabled ? void 0 : handleTriggerClick
      }, "▼")), /* @__PURE__ */ React__namespace.createElement(ListBox$1, {
        id: pickerId,
        data: range,
        displayField,
        focusIndex,
        expanded,
        onSelect: select,
        selected: selection,
        optionRenderer,
        className: picker,
        style: pickerStyle
      }));
    }
    var Combobox$1 = memo(Combobox);

    function Application() {
      const [countries, setCountries] = useState([]);
      const [remoteData, setRemoteData] = useState([]);
      useEffect(() => {
        fetch("/data/countries.json").then((response) => response.json()).then(setCountries);
      }, []);
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h5", null, "Normal"), /* @__PURE__ */ React.createElement(Combobox$1, {
        data: countries,
        displayField: "name"
      }), /* @__PURE__ */ React.createElement("h5", null, "Read Only"), /* @__PURE__ */ React.createElement(Combobox$1, {
        readOnly: true,
        data: countries,
        displayField: "name"
      }), /* @__PURE__ */ React.createElement("h5", null, "Disabled"), /* @__PURE__ */ React.createElement(Combobox$1, {
        disabled: true,
        data: countries,
        displayField: "name"
      }), /* @__PURE__ */ React.createElement("h5", null, "Search"), /* @__PURE__ */ React.createElement(Combobox$1, {
        displayField: "name",
        queryMode: "remote",
        onRemoteQuery: function(query) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              resolve(Array.from(query).map((name, index) => ({
                name,
                index
              })));
            }, 5e3);
          });
        },
        hideTrigger: true
      }));
    }

    function render(container) {
      ReactDOM.render(/* @__PURE__ */ React__default['default'].createElement(Application, null), container);
    }
    function unmount(container) {
      ReactDOM.unmountComponentAtNode(container);
    }
    var main = {
      render,
      unmount
    };

    return main;

})));
//# sourceMappingURL=app.umd.js.map
