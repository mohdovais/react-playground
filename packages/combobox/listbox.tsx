import React, { memo } from '../utils/react'
import { ensureArray } from '../utils/array';
import { hasOwnProperty } from '../utils/object';
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
    selected: T;
    onSelect: (selection: T) => void;
    focusIndex: number;
    expanded: boolean;
}

function ListBox<T>(props: ListBoxProps<T>) {
    const {
        id,
        className = '',
        data,
        displayField,
        selected,
        onSelect,
        focusIndex,
        expanded,
    } = props;
    return (
        <ul id={id} role="listbox" className={$listbox + ' ' + className}>
            {expanded
                ? ensureArray<T>(data).map((item, index) => (
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
                          {hasOwnProperty(item, displayField)
                              ? item[displayField]
                              : null}
                      </li>
                  ))
                : null}
        </ul>
    );
}

export default memo(ListBox);
