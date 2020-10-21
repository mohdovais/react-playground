import React, { memo, useEffect } from '../utils/react';
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
    style: React.CSSProperties;
    optionRenderer?: (record: T) => JSX.Element | string;
}

function ListBox(props: ListBoxProps<Json>) {
    const {
        id,
        className = '',
        data,
        displayField,
        selected,
        focusIndex,
        expanded,
        style,
        onSelect,
        optionRenderer,
    } = props;

    const idPrefx = id + '-option-';

    useEffect(() => {
        if (focusIndex > -1) {
            const li = document.getElementById(idPrefx + focusIndex);
            if (li) {
                li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }, [focusIndex]);

    return (
        <ul
            id={id}
            role="listbox"
            className={$listbox + ' ' + className}
            style={style}
            tabIndex={-1}>
            {expanded
                ? ensureArray<Json>(data).map((item, index) => (
                      <li
                          key={idPrefx + index}
                          role="option"
                          id={idPrefx + index}
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

export default memo(ListBox);
