import * as ReactDOM from 'react-dom';
import React from 'react';
import { Application } from './Application';

function render(container: HTMLDivElement) {
    ReactDOM.render(<Application />, container);
}

function unmount(container: HTMLDivElement) {
    ReactDOM.unmountComponentAtNode(container);
}

export default {
    render,
    unmount,
};
