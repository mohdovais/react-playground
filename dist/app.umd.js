(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react-dom'), require('react')) :
  typeof define === 'function' && define.amd ? define(['react-dom', 'react'], factory) :
  (global = global || self, global.app = factory(global.ReactDOM, global.React));
}(this, (function (ReactDOM, React) { 'use strict';

  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;
  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var labelable = "Labelable-module_labelable__1AXtv";

  const regex_aria_prop = /^aria-/;
  const ariaProps = props => Object.keys(props).reduce((accum, propName) => {
    if (regex_aria_prop.test(propName)) {
      accum[propName] = props[propName];
    }

    return accum;
  }, {});

  function Labelable(props) {
    var {
      label,
      inputId,
      className,
      children,
      role
    } = props;
    className = className === undefined ? '' : ' ' + className;
    return /*#__PURE__*/React.createElement("div", _extends({
      className: labelable + className,
      role: role
    }, ariaProps(props)), /*#__PURE__*/React.createElement("label", {
      htmlFor: inputId
    }, label), children);
  }

  function ListBox(props) {
    return /*#__PURE__*/React.createElement("ul", {
      role: "listbox",
      className: "listbox hidden",
      "aria-labelledby": "ex3-label"
    });
  }

  var combobox_wrapper = "Combobox-module_combobox_wrapper__1weuj";
  var combobox = "Combobox-module_combobox__3xJ_Z";

  function Combobox(props) {
    const {
      label,
      value,
      data,
      displayField = 'text',
      valueField = 'value',
      queryMode = 'local',
      displayRenderer = false,
      itemRenderer = false
    } = props;
    return /*#__PURE__*/React.createElement(Labelable, {
      label: label,
      inputId: "ggg",
      className: "comobox",
      role: "combobox",
      "aria-expanded": "false",
      "aria-owns": "ex3-listbox",
      "aria-haspopup": "listbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: combobox_wrapper
    }, /*#__PURE__*/React.createElement("div", {
      className: combobox
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      "aria-autocomplete": "both",
      "aria-controls": "ex3-listbox",
      "aria-labelledby": "ex3-label",
      id: "ggg",
      "aria-activedescendant": ""
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "combobox-dropdown",
      tabIndex: "-1",
      "aria-label": "Show vegetable options"
    }, "\u25BC")), /*#__PURE__*/React.createElement(ListBox, {
      data: data,
      displayField: displayField,
      valueField: valueField,
      itemRenderer: itemRenderer
    })));
  }

  const veggies = [{
    text: 'Apple',
    value: 'apple'
  }, {
    text: 'Orange',
    value: 'orange'
  }, {
    text: 'Banana',
    value: 'banana'
  }];
  function Application() {
    return /*#__PURE__*/React.createElement(Combobox, {
      label: "Fruit or Vegtable",
      value: "123",
      data: veggies
    });
  }

  /**
   *
   * @param {Element} container
   */

  function render(container) {
    ReactDOM.render( /*#__PURE__*/React.createElement(Application, null), container);
  }
  /**
   *
   * @param {Element} container
   */


  function unmount(container) {
    ReactDOM.unmountComponentAtNode(container);
  }

  var main = {
    render,
    unmount
  };

  return main;

})));
