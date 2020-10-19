import React, { memo } from '../utils/react';
import { ensureArray } from '../utils/array';
import { hasOwnProperty } from '../utils/object';
import { Json } from './combobox.store';
import {
    listbox as $listbox,
    option as $option,
    focus as $focus,
    selected as $selected,
} from './listbox.module.css';

export interface ListBoxProps<T> {
    className?: string;
    id: string;
    data?: T[];
    displayField: string;
    selected?: T;
    onSelect: (selection: T) => void;
    focusIndex: number;
    expanded: boolean;
    optionRenderer?: (record: T) => JSX.Element | string;
}

function ListBox(
    props: ListBoxProps<Json>,
    ref:
        | React.MutableRefObject<HTMLUListElement | null>
        | ((instance: HTMLUListElement | null) => void)
        | null
) {
    const {
        id,
        className = '',
        data,
        displayField,
        selected,
        focusIndex,
        expanded,
        onSelect,
        optionRenderer,
    } = props;

    return (
        <ul
            id={id}
            role="listbox"
            className={$listbox + ' ' + className}
            ref={ref}>
            {expanded
                ? ensureArray<Json>(data).map((item, index) => (
                      <li
                          key={id + '-option-' + index}
                          role="option"
                          id={id + '-option-' + index}
                          className={
                              $option +
                              (focusIndex === index ? ' ' + $focus : '') +
                              (selected === item ? ' ' + $selected : '')
                          }
                          onClick={() => onSelect(item)}>
                          {typeof optionRenderer === 'function'
                              ? optionRenderer(item)
                              : hasOwnProperty(item, displayField)
                              ? String(item[displayField])
                              : null}
                      </li>
                  ))
                : null}
        </ul>
    );
}

const ListBoxWithForwardRef = React.forwardRef(ListBox);
export default memo(ListBoxWithForwardRef);
