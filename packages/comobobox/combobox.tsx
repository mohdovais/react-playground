import React, {
    memo,
    useContext,
    Children,
    isValidElement,
} from '../utils/react';
import Picker, { PickerContext, PickerProps } from '../picker';
import OptGroup from './optgroup';
import Option from './option';
import { listbox as $listbox } from './style.module.css';

type DropDownProps = {
    children: any;
};

export interface ComboboxProps extends PickerProps {}

const DropDown = memo(function DropDown(props: DropDownProps) {
    const { key } = useContext(PickerContext);
    console.log(key);

    const children = Children.toArray(props.children).filter(
        (child: React.ReactNode) =>
            isValidElement(child) &&
            (child.type === Option || child.type === OptGroup)
    );
    // const listeners = useMemo(() => ({ onClick }), [onClick]);
    return <ul className={$listbox}>{children}</ul>;
});

function Combobox(props: ComboboxProps) {
    const { className = '', children, ...restProps } = props;
    return (
        <Picker {...restProps} className={'combobox ' + className}>
            <DropDown>{children}</DropDown>
        </Picker>
    );
}

export default memo(Combobox);
