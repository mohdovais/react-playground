import ReactDOM from 'react-dom';
import React from 'react';
import { Application } from './Application';

/**
 *
 * @param {Element} container
 */
function render(container) {
    ReactDOM.render(<Application />, container);
}

/**
 *
 * @param {Element} container
 */
function unmount(container) {
    ReactDOM.unmountComponentAtNode(container);
}

export default {
    render,
    unmount,
};
