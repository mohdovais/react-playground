import { r as react, R as React } from './vendor-1c5b2cc6.js';

const memo = react.memo;
const useCallback = react.useCallback;
const useState = react.useState;
const useRef = react.useRef;
const useReducer = react.useReducer;
const useEffect = react.useEffect;

function ensureArray(subject) {
  if (subject == null)
    return [];
  if (Array.isArray(subject))
    return subject;
  return [subject];
}

var listbox = "listbox-module__listbox___16qJO";
var option = "listbox-module__option___3a9MH";
var _default = "listbox-module___default___2aZFx";
var selected = "listbox-module__selected___2AANR";
var focus = "listbox-module__focus___m8cIN";

function ListBoxItem(props) {
  const {id, onClick, className, children} = props;
  return /* @__PURE__ */ React.createElement("li", {
    role: "option",
    id,
    className: option + " " + className,
    onClick
  }, children);
}
function ListBoxItemContent({
  record,
  displayField
}) {
  return /* @__PURE__ */ React.createElement("div", {
    className: _default
  }, record[displayField]);
}
const ListBoxItemMemo = memo(ListBoxItem);
const ListBoxItemContentMemo = memo(ListBoxItemContent);
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
  const OptionRenderer = typeof optionRenderer === "function" ? optionRenderer : ListBoxItemContentMemo;
  useEffect(() => {
    if (focusIndex > -1) {
      const li = document.getElementById(idPrefx + focusIndex);
      if (li) {
        li.scrollIntoView({behavior: "smooth", block: "nearest"});
      }
    }
  }, [focusIndex]);
  const items = ensureArray(data);
  return /* @__PURE__ */ React.createElement("ul", {
    id,
    role: "listbox",
    className: listbox + " " + className,
    style,
    tabIndex: -1
  }, expanded ? items.map((item, index) => {
    const liId = idPrefx + index;
    const isSelected = selected$1 === item;
    const liClassName = [
      focusIndex === index ? "focus " + focus : "",
      isSelected ? "selected " + selected : ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ React.createElement(ListBoxItemMemo, {
      key: liId,
      id: liId,
      className: liClassName,
      onClick: () => onSelect(item)
    }, /* @__PURE__ */ React.createElement(OptionRenderer, {
      record: item,
      selected: isSelected,
      displayField
    }));
  }) : null);
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

const O = Object;
const assign = O.assign;
function extend(a, b) {
  return assign({}, a, b);
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

function debounced(task, duration = 250, scope) {
  let timer;
  return function() {
    function later(arg) {
      clearTimeout(timer);
      task.apply(scope, arg);
    }
    clearTimeout(timer);
    timer = setTimeout(later, duration, Array.prototype.slice.call(arguments));
  };
}

var combobox = "combobox-module__combobox___2i64f";
var input_wrapper = "combobox-module__input_wrapper___1Zu2R";
var input = "combobox-module__input___2AUD3";
var trigger = "combobox-module__trigger___29Deo";
var picker = "combobox-module__picker___1MrXx";
var waiting = "combobox-module__waiting___12MZG";

function focus$1(ref) {
  let el = ref.current;
  if (el) {
    el.focus();
  }
}
function Combobox(props) {
  const comboboxRef = useRef(null);
  const inputRef = useRef(null);
  const {
    queryMode = "local",
    displayField = "text",
    className = "",
    forceSelection = true,
    data,
    hideTrigger,
    disabled,
    readOnly,
    onChange,
    onRemoteQuery,
    optionRenderer,
    displayRenderer
  } = props;
  const [state, dispatch] = useReducer(comboboxReducer, initialState, (state2) => extend(state2, {id: randomId("combobox-"), displayField}));
  const {
    toggle,
    select,
    collapse,
    handleKeys,
    handleRemoteSearch,
    handleLocalSearch,
    setData,
    setWaiting
  } = useComboboxActions(dispatch);
  const {id, expanded, selection, range, focusIndex, waiting: waiting$1} = state;
  const pickerStyle = usePickerPosition(comboboxRef, expanded);
  const pickerId = id + "-picker";
  const activeDescendantId = expanded && focusIndex === -1 ? "" : pickerId + "-option-" + focusIndex;
  const handleTriggerClick = useCallback(() => {
    focus$1(inputRef);
    toggle();
  }, [inputRef]);
  const handleInput = useCallback(debounced((event) => {
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
  }), [
    queryMode,
    onRemoteQuery,
    setWaiting,
    handleLocalSearch,
    handleRemoteSearch
  ]);
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
  return /* @__PURE__ */ React.createElement("div", {
    className: combobox + " " + className + (waiting$1 ? " wating " + waiting : ""),
    ref: comboboxRef
  }, /* @__PURE__ */ React.createElement("div", {
    className: input_wrapper,
    role: "combobox",
    "aria-expanded": expanded ? "true" : "false",
    "aria-owns": pickerId,
    "aria-haspopup": "listbox"
  }, /* @__PURE__ */ React.createElement("input", {
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
  }), hideTrigger ? null : /* @__PURE__ */ React.createElement("div", {
    className: trigger,
    tabIndex: -1,
    role: "button",
    "aria-label": "Show options",
    onClick: disabled ? void 0 : handleTriggerClick
  }, "▼")), /* @__PURE__ */ React.createElement(ListBox$1, {
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

export { Combobox$1 as C, useEffect as a, useCallback as b, memo as m, useState as u };
//# sourceMappingURL=framework-83fdb38f.js.map
