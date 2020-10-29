/// <reference path="combobox.d.ts" />
import React, { memo, useEffect, useReducer } from '../utils/react';
import { ensureArray } from '../utils/array';
import {
    option as $option,
    focus as $focus,
    selected as $selected,
    _default as $default,
} from './listbox.module.css';
import {
    Json,
    ListBoxItemContentProps,
    ListBoxItemProps,
    ListBoxProps,
} from 'Combobox';
import { emptyFn } from '../utils/function';
import { KEY_ARROW_DOWN, KEY_ARROW_UP, KEY_ENTER } from './constant';

function scrollIntoView(el: HTMLElement | null, smooth = true) {
    if (el == null) return;
    setTimeout(
        () =>
            el.scrollIntoView({
                behavior: smooth ? 'smooth' : 'auto',
                block: 'nearest',
            }),
        100
    );
}

export const listBoxItemContentFactory = (displayField: string) =>
    memo(function ListBoxItem<T extends Json>(
        props: ListBoxItemContentProps<T>
    ) {
        return <div className={$default}>{props.record[displayField]}</div>;
    });

const ListBoxItem = memo(function ListBoxItem<T>(props: ListBoxItemProps<T>) {
    const { id, onClick, className, record, children } = props;
    return (
        <li
            role="option"
            id={id}
            className={$option + ' ' + className}
            onClick={() => onClick(record)}>
            {children}
        </li>
    );
});

export function ListBoxItems(props: ListBoxProps<Json>) {
    const {
        id,
        data,
        keyboard,
        itemRenderer,
        onSelect,
        onKeyFocus = emptyFn,
    } = props;
    const selection = ensureArray(props.selection);

    const totalItems = data.length;
    const idPrefx = id + '-option-';
    const firstSelectedIndex = data.indexOf(selection[0]);
    const firstSelectedId =
        firstSelectedIndex === -1 ? '' : idPrefx + firstSelectedIndex;
    const key = keyboard ? keyboard.key : '';

    const OptionRenderer = itemRenderer;

    const [focusIndex, disptachKeyboard] = useReducer(function (
        index: number,
        action: string
    ) {
        let _index = index;
        switch (action) {
            case KEY_ARROW_UP:
                _index = index === -1 ? totalItems - 1 : index - 1;
                break;
            case KEY_ARROW_DOWN:
                _index = index === -1 ? 0 : index + 1;
        }
        return _index === index
            ? index
            : totalItems === 0
            ? -1
            : (totalItems + _index) % totalItems;
    },
    firstSelectedIndex);

    if (key === KEY_ENTER && focusIndex !== -1) {
        onSelect(data[focusIndex]);
    }

    useEffect(() => {
        if (key && key !== KEY_ENTER) {
            disptachKeyboard(key);
        }
    }, [keyboard, key]);

    useEffect(() => {
        if (firstSelectedId !== '') {
            scrollIntoView(document.getElementById(firstSelectedId), false);
        }
    }, [firstSelectedIndex]);

    useEffect(() => {
        if (focusIndex !== -1) {
            onKeyFocus(idPrefx + focusIndex);
            scrollIntoView(
                document.getElementById(idPrefx + focusIndex),
                false
            );
        }
    }, [focusIndex]);

    return (
        <ul>
            {data.map((item, index) => {
                const liId = idPrefx + index;
                const isSelected = selection.indexOf(item) !== -1;
                const liClassName =
                    (focusIndex === index ? 'focus ' + $focus : '') +
                    (isSelected ? ' selected ' + $selected : '');

                return (
                    <ListBoxItem
                        key={liId}
                        id={liId}
                        className={liClassName}
                        record={item}
                        selected={isSelected}
                        onClick={onSelect}>
                        <OptionRenderer record={item} selected={isSelected} />
                    </ListBoxItem>
                );
            })}
        </ul>
    );
}
