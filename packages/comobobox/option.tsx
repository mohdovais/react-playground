import React, { useRef, useContext, memo } from '../utils/react';
import { DropdownContext, OptGroupContext } from './context';
import { option as $option } from './style.module.css';

export interface OptionProps {
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    selected?: boolean;
    value: any;
    children: React.ReactChild | React.ReactChild[];
}

function Option(props: OptionProps) {
    const {
        value,
        children,
        disabled = false,
        selected = false,
        className = '',
        style,
    } = props;
    const ref = useRef<HTMLLIElement>(null);
    const { onClick } = useContext(DropdownContext);
    const isDisabled = useContext(OptGroupContext).disabled || disabled;

    return (
        <li
            className={
                $option +
                ' ' +
                className +
                (isDisabled ? ' disabled' : '') +
                (selected ? ' selected' : '')
            }
            style={style}
            ref={ref}
            onClick={isDisabled ? undefined : () => onClick(value)}>
            {children}
        </li>
    );
}

export default memo(Option);
