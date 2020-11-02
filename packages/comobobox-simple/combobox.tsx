import React, { memo, useContext, useRef, useMemo } from '../utils/react';
import {
    listbox as $listbox,
    option_group as $option_group,
    option_group_label as $option_group_label,
    option as $option,
} from './listbox.module.css';
import Picker, { PickerContext, PickerProps } from '../picker';
import { setConstantValue } from 'typescript';

export interface OptGroupProps {
    disabled?: boolean;
    label: string;
    children: any;
}

export interface OptionProps {
    disabled?: boolean;
    selected?: boolean;
    value?: any;
    children: React.ReactElement | string | number;
}

type DropDownProps = {
    children: any;
};

export interface ComboboxProps extends PickerProps {}

const ComboboxContext = React.createContext({ onClick: (value: any) => {} });
const OptGroupContext = React.createContext({ disabled: false });

export function OptGroup(props: OptGroupProps) {
    const { children, label, disabled = false } = props;
    return (
        <li className={$option_group}>
            <label className={$option_group_label}>{label}</label>
            <ul>
                <OptGroupContext.Provider value={{ disabled }}>
                    {children}
                </OptGroupContext.Provider>
            </ul>
        </li>
    );
}

export function Option(props: OptionProps) {
    const ref = useRef<HTMLLIElement>(null);
    const { onClick, setValue } = useContext(PickerContext);
    const { disabled: disabledGroup } = useContext(OptGroupContext);
    const { value, children, disabled = false, selected = false } = props;
    const isDisabled = disabledGroup || disabled;
    const clickHandler = () => {
        const current = ref.current;
        const _value =
            value === undefined ? current && current.innerText : value;
        setValue(_value);
        onClick(_value);
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

function DropDown(props: DropDownProps) {
    // const { onClick, setValue } = useContext(PickerContext);
    // const listeners = useMemo(() => ({ onClick }), [onClick]);
    return <ul className={$listbox}>{props.children}</ul>;
}

function Combobox(props: ComboboxProps) {
    const { children, ...restProps } = props;
    return (
        <Picker {...restProps}>
            <DropDown>{children}</DropDown>
        </Picker>
    );
}

export default memo(Combobox);
