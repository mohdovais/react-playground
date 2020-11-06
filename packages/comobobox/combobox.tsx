import React, { memo, useContext, useMemo, useState } from '../utils/react';
import Picker, { PickerContext, PickerProps } from '../picker';
import { DropdownContext } from './context';
import { getChildrenValue, validateChildren } from './helper';
import { listbox as $listbox } from './style.module.css';
import { useEffect } from 'react';

type DropDownProps = {
    children: any;
    multiple?: boolean;
};

export interface ComboboxProps extends PickerProps {
    children?: React.ReactElement | React.ReactElement[];
}

const DropDown = memo(function DropDown(props: DropDownProps) {
    const { keyDown, onChange } = useContext(PickerContext);
    const { children, multiple = false } = props;
    const single = !multiple;

    const context = useMemo(() => ({ onClick: onChange }), [onChange]);

    return (
        <ul className={$listbox}>
            <DropdownContext.Provider value={context}>
                {children}
            </DropdownContext.Provider>
        </ul>
    );
});

function Combobox(props: ComboboxProps) {
    const { className = '', children, ...restProps } = props;
    const singleSelection = !props.multiple;
    const validChildren = useMemo(() => validateChildren(children), [children]);
    const values = useMemo(() => getChildrenValue(validChildren), [
        validChildren,
    ]);
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        if (singleSelection) {
            setValue(values[0]);
            // modify tree
        }
    }, [singleSelection, values]);

    console.log(value);
    return (
        <Picker {...restProps} className={'combobox ' + className}>
            <DropDown multiple={props.multiple}>{validChildren}</DropDown>
        </Picker>
    );
}

export default memo(Combobox);
