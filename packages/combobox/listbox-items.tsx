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
    KeyboardNavType,
} from 'Combobox';

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
    const { id, data, keyboard, itemRenderer, onSelect } = props;
    const selection = ensureArray(props.selection);

    const totalItems = data.length;
    const idPrefx = id + '-option-';
    const firstSelectedIndex = data.indexOf(selection[0]);
    const firstSelectedId =
        firstSelectedIndex === -1 ? '' : idPrefx + firstSelectedIndex;

    const OptionRenderer = itemRenderer;

    const [focusIndex, disptachKeyboard] = useReducer(function (
        index: number,
        action: KeyboardNavType
    ) {
        let _index = index;
        switch (action.key) {
            case 'ArrowUp':
                _index = index === -1 ? totalItems - 1 : index - 1;
                break;
            case 'ArrowDown':
                _index = index === -1 ? 0 : index + 1;
                break;
        }
        return _index === index
            ? index
            : totalItems === 0
            ? -1
            : (totalItems + _index) % totalItems;
    },
    firstSelectedIndex);

    useEffect(() => {
        if (keyboard && keyboard.key) disptachKeyboard(keyboard);
    }, [keyboard]);

    useEffect(() => {
        if (firstSelectedId !== '') {
            scrollIntoView(document.getElementById(firstSelectedId), false);
        }
    }, [firstSelectedIndex]);

    useEffect(() => {
        if (focusIndex !== -1) {
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
