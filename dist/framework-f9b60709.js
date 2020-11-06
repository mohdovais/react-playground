import { R as React, r as react } from './vendor-dc64c37e.js';

const memo = react.memo;
const useCallback = react.useCallback;
const useState = react.useState;
const useRef = react.useRef;
const useReducer = react.useReducer;
const useEffect = react.useEffect;
const useMemo = react.useMemo;
const useContext = react.useContext;
const Children = react.Children;
const isValidElement = react.isValidElement;
const createContext = react.createContext;

const win = window;
const addEventListener = win.addEventListener;
const removeEventListener = win.removeEventListener;

const EVENT_RESIZE = "resize";
const EVENT_SCROLL = "scroll";

const none = {display: "none"};
function getPosition(el, pre = none) {
  if (el == null) {
    return pre;
  }
  const viewportHeight = win.innerHeight;
  const viewportWidth = win.innerWidth;
  const {top, left, bottom, height, width} = el.getBoundingClientRect();
  if (top < 0 || top > viewportHeight || left < 0 || left > viewportWidth) {
    return pre;
  }
  const bottomSpace = viewportHeight - bottom;
  const rightSpace = viewportWidth - left;
  let style = {
    position: "absolute",
    width: "max-content",
    minWidth: width
  };
  if (top < bottomSpace) {
    style.top = height;
    style.maxHeight = Math.floor(viewportHeight - bottom - 5);
  } else {
    style.bottom = height;
    style.maxHeight = top - 5;
  }
  if (left < rightSpace) {
    style.left = 0;
    style.maxWidth = Math.floor(viewportWidth - left - 5);
  } else {
    style.right = 0;
    style.maxWidth = left - 5;
  }
  return style;
}
function usePickerPosition(ref, calculate = true) {
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
    addEventListener(EVENT_RESIZE, doCalculate);
    addEventListener(EVENT_SCROLL, doCalculate);
    if (calculate) {
      doCalculate();
    } else {
      setPosition(none);
    }
    return () => {
      removeEventListener(EVENT_RESIZE, doCalculate);
      removeEventListener(EVENT_SCROLL, doCalculate);
    };
  }, [calculate, current]);
  return postion;
}

const {round, random} = Math;
function randomId(prefix = "") {
  return prefix + round(random() + random() * 1e17).toString(32);
}

function useRandomId(prefix) {
  const id = useState(() => randomId(prefix));
  return id[0];
}

const context = {
  keyDown: null,
  onChange: (value) => {
  }
};
var $PickerContext = createContext(context);

const O = Object;
const assign = O.assign;
function extend(a, b) {
  return assign({}, a, b);
}

const ACTION_SET_VALUE = 0;
const ACTION_SET_EXPANDED = 1;
const ACTION_SET_KEY = 2;
const KEYS_TO_BE_PROPAGATED = [
  "ArrowDown",
  "ArrowUp",
  "ArrowRight",
  "ArrowLeft",
  " ",
  "Enter",
  "Escape"
];
function pickerReducer(state, action) {
  switch (action.type) {
    case ACTION_SET_VALUE:
      return extend(state, {
        value: action.value,
        expanded: action.collapse ? false : state.expanded
      });
    case ACTION_SET_EXPANDED:
      return extend(state, {
        expanded: action.expand
      });
    case ACTION_SET_KEY:
      return extend(state, {
        keyDown: action.key,
        expanded: action.expand || state.expanded
      });
  }
  return state;
}
function usePickerState({multiple}) {
  const [state, disptach] = useReducer(pickerReducer, {
    expanded: false,
    keyDown: null,
    value: "",
    activeDescendant: ""
  });
  const {expanded, value, keyDown, activeDescendant} = state;
  const expand = useCallback((expand2 = true) => {
    disptach({type: ACTION_SET_EXPANDED, expand: expand2});
  }, [disptach]);
  const onChange = useCallback((value2) => {
    disptach({
      type: ACTION_SET_VALUE,
      value: value2,
      collapse: !multiple
    });
  }, [disptach]);
  const context2 = useMemo(() => ({onChange, keyDown}), [keyDown]);
  const handleKeyDown = useCallback(function(event) {
    const {key, ctrlKey, metaKey, shiftKey} = event;
    if (key === "Escape") {
      return disptach({type: ACTION_SET_EXPANDED, expand: false});
    }
    if (KEYS_TO_BE_PROPAGATED.indexOf(key) > -1) {
      return disptach({
        type: ACTION_SET_KEY,
        key: {
          key,
          shiftKey,
          ctrlKey: ctrlKey || metaKey
        },
        expand: key === "ArrowDown" || key === "ArrowUp"
      });
    }
  }, []);
  return {expanded, value, activeDescendant, context: context2, expand, handleKeyDown};
}

var reaper = "picker-module__reaper___K_a6D";
var input = "picker-module__input___2L5kX";
var picker_container = "picker-module__picker_container___3269_";
var picker = "picker-module__picker___hX2De";
var trigger = "picker-module__trigger___3TcTa";

const TriggerIcon = memo(function TriggerIcon2() {
  return /* @__PURE__ */ React.createElement("svg", {
    viewBox: "0 0 16 16"
  }, /* @__PURE__ */ React.createElement("path", {
    fill: "none",
    stroke: "#343a40",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M2 5l6 6 6-6"
  }));
});
function Picker(props) {
  const {
    autocomplete = "both",
    autofocus,
    children,
    className = "",
    disabled,
    id,
    multiple,
    name,
    onInput,
    placeholder,
    readOnly,
    required,
    role = "combobox",
    style,
    triggerIcon = /* @__PURE__ */ React.createElement(TriggerIcon, null),
    hideTrigger
  } = props;
  const ref = useRef(null);
  const inputRef = useRef(null);
  const {
    expanded,
    value,
    activeDescendant,
    context: context2,
    expand,
    handleKeyDown
  } = usePickerState({multiple});
  const randomId = useRandomId("picker-");
  const componentId = id === void 0 ? randomId : id;
  const pickerId = componentId + "-picker";
  const pickerStyle = usePickerPosition(ref, expanded);
  const triggerHandler = disabled || hideTrigger ? void 0 : () => {
    var _a;
    expand(!expanded);
    (_a = inputRef == null ? void 0 : inputRef.current) == null ? void 0 : _a.focus();
  };
  useEffect(() => {
    var _a;
    if (autofocus) {
      (_a = inputRef == null ? void 0 : inputRef.current) == null ? void 0 : _a.focus();
    }
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    id: componentId,
    className: reaper + " " + className,
    style,
    role,
    "aria-expanded": expanded ? "true" : "false",
    "aria-owns": pickerId,
    "aria-haspopup": "listbox",
    ref
  }, /* @__PURE__ */ React.createElement("div", {
    className: picker_container
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name,
    "aria-autocomplete": autocomplete,
    "aria-controls": pickerId,
    "aria-activedescendant": activeDescendant,
    onKeyDown: handleKeyDown,
    onInput,
    ref: inputRef,
    disabled,
    readOnly,
    placeholder,
    className: input,
    required,
    value
  }), hideTrigger ? null : /* @__PURE__ */ React.createElement("div", {
    tabIndex: -1,
    role: "button",
    "aria-label": "Show picker",
    className: trigger,
    onClick: triggerHandler
  }, triggerIcon)), /* @__PURE__ */ React.createElement("div", {
    id: pickerId,
    className: picker,
    style: pickerStyle
  }, expanded ? /* @__PURE__ */ React.createElement($PickerContext.Provider, {
    value: context2
  }, children) : null)));
}
var Picker$1 = memo(Picker);

const PickerContext = $PickerContext;

const DropdownContext = React.createContext({
  onClick: (value) => {
  }
});
const OptGroupContext = React.createContext({disabled: false});

var listbox = "style-module__listbox___5ef4R";
var option_group = "style-module__option_group___of5x0";
var option_group_label = "style-module__option_group_label___1R-IK";
var option = "style-module__option___1r74V";

function Option(props) {
  const {
    value,
    children,
    disabled = false,
    selected = false,
    className = "",
    style
  } = props;
  const ref = useRef(null);
  const {onClick} = useContext(DropdownContext);
  const isDisabled = useContext(OptGroupContext).disabled || disabled;
  return /* @__PURE__ */ React.createElement("li", {
    className: option + " " + className + (isDisabled ? " disabled" : "") + (selected ? " selected" : ""),
    style,
    ref,
    onClick: isDisabled ? void 0 : () => onClick(value)
  }, children);
}
var $Option = memo(Option);

function OptGroup(props) {
  const {className = "", style, label, disabled = false} = props;
  const children = useMemo(() => Children.toArray(props.children).filter((child) => isValidElement(child) && child.type === $Option), [props.children]);
  return /* @__PURE__ */ React.createElement("li", {
    className: option_group + " " + className,
    style
  }, /* @__PURE__ */ React.createElement("label", {
    className: option_group_label + (disabled ? " disabled" : "")
  }, label), children.length > 0 ? /* @__PURE__ */ React.createElement(OptGroupContext.Provider, {
    value: {disabled}
  }, /* @__PURE__ */ React.createElement("ul", null, children)) : null);
}
var $OptGroup = memo(OptGroup);

function validateChildren(children) {
  return Children.toArray(children).filter((child) => isValidElement(child) && (child.type === $Option || child.type === $OptGroup));
}
function doGetValue(children, values) {
  for (let i = 0, length = children.length; i < length; i++) {
    const child = children[i];
    if (child.type === $Option) {
      const props = child.props;
      if (props.selected) {
        values.push(props.value);
      }
    } else if (child.type === $OptGroup) {
      doGetValue(child.props.children, values);
    }
  }
  return values;
}
function getChildrenValue(children) {
  return doGetValue(children, []);
}

var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __assign = Object.assign;
var __rest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const DropDown = memo(function DropDown2(props) {
  const {keyDown, onChange} = useContext(PickerContext);
  const {children, multiple = false} = props;
  const context2 = useMemo(() => ({onClick: onChange}), [onChange]);
  return /* @__PURE__ */ React.createElement("ul", {
    className: listbox
  }, /* @__PURE__ */ React.createElement(DropdownContext.Provider, {
    value: context2
  }, children));
});
function Combobox(props) {
  const {className = "", children} = props, restProps = __rest(props, ["className", "children"]);
  const singleSelection = !props.multiple;
  const validChildren = useMemo(() => validateChildren(children), [children]);
  const values = useMemo(() => getChildrenValue(validChildren), [
    validChildren
  ]);
  const [value, setValue] = useState(props.value);
  if (singleSelection && values.length > 1) ;
  console.log(value);
  return /* @__PURE__ */ React.createElement(Picker$1, __assign(__assign({}, restProps), {
    className: "combobox " + className
  }), /* @__PURE__ */ React.createElement(DropDown, {
    multiple: props.multiple
  }, validChildren));
}
var Combobox$1 = memo(Combobox);

const OptGroup$1 = $OptGroup;
const Option$1 = $Option;

export { Combobox$1 as C, OptGroup$1 as O, useEffect as a, useCallback as b, Option$1 as c, useState as u };
//# sourceMappingURL=framework-f9b60709.js.map
