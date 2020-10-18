import * as React from 'react';
import { labelable } from './Labelable.module.scss';
import { ariaProps } from '../utils';

export function Labelable(props) {
    var { label, inputId, className, children, role } = props;
    className = className === undefined ? '' : ' ' + className;
    return (
        <div
            className={labelable + className}
            role={role}
            {...ariaProps(props)}>
            <label htmlFor={inputId}>{label}</label>
            {children}
        </div>
    );
}
