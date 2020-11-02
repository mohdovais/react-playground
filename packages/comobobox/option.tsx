import React, { useRef, useContext, memo } from '../utils/react';
import { OptGroupContext } from './context';
import { option as $option } from './style.module.css';

export interface OptionProps {
    disabled?: boolean;
    selected?: boolean;
    value?: any;
    children: React.ReactElement | string | number;
}

function Option(props: OptionProps) {
    const ref = useRef<HTMLLIElement>(null);
    const { disabled: disabledGroup } = useContext(OptGroupContext);
    const { value, children, disabled = false, selected = false } = props;
    const isDisabled = disabledGroup || disabled;
    const clickHandler = () => {
        const current = ref.current;
        const _value =
            value === undefined ? current && current.innerText : value;
        console.log(_value);
    };

    return (
        <li
            className={$option}
            ref={ref}
            onClick={isDisabled ? undefined : clickHandler}>
            {children}
        </li>
    );
}

export default memo(Option);
