/// <reference path="combobox.d.ts" />
import React, { memo, useCallback } from '../utils/react';
import { ensureArray } from '../utils/array';
import {
    listbox as $listbox,
    _default as $default,
} from './listbox.module.css';
import { ListBoxItems } from './listbox-items';
import { ListBoxProps, ListBoxItemContentProps, Json } from 'Combobox';

function ListBox(props: ListBoxProps<Json>) {
    const {
        id,
        className = '',
        style,
        expanded,
        data,
        keyboard,
        itemRenderer,
        onSelect,
        selection,
        onKeyFocus,
    } = props;

    const handleSelect = useCallback((item) => onSelect(item), [onSelect]);

    return (
        <div
            id={id}
            role="listbox"
            className={$listbox + ' ' + className}
            style={style}
            tabIndex={-1}>
            {expanded === true ? (
                <ListBoxItems
                    id={id}
                    data={ensureArray(data)}
                    keyboard={keyboard}
                    itemRenderer={itemRenderer}
                    onSelect={handleSelect}
                    onKeyFocus={onKeyFocus}
                    selection={selection}
                />
            ) : null}
        </div>
    );
}

export const listBoxItemContentFactory = (displayField: string) =>
    memo(function ListBoxItem<T extends Json>(
        props: ListBoxItemContentProps<T>
    ) {
        return <div className={$default}>{props.record[displayField]}</div>;
    });

export default memo(ListBox);
