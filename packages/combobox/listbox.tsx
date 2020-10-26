import React, { memo, useEffect } from '../utils/react';
import { ensureArray } from '../utils/array';
import { Json } from './combobox.store';
import {
    listbox as $listbox,
    option as $option,
    focus as $focus,
    selected as $selected,
    _default as $default,
} from './listbox.module.css';

export type OptionRenderer<T> = React.Component<ListBoxItemContentProps<T>>;

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
    optionRenderer?: OptionRenderer<T>;
}

export interface ListBoxItemProps {
    id: string;
    className: string;
    children: any;
    onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export interface ListBoxItemContentProps<T> {
    record: T;
    selected: boolean;
    displayField: string;
}

function ListBoxItem(props: ListBoxItemProps) {
    const { id, onClick, className, children } = props;
    return (
        <li
            role="option"
            id={id}
            className={$option + ' ' + className}
            onClick={onClick}>
            {children}
        </li>
    );
}

function ListBoxItemContent<T extends Json>({
    record,
    displayField,
}: ListBoxItemContentProps<T>) {
    return <div className={$default}>{record[displayField]}</div>;
}

const ListBoxItemMemo = memo(ListBoxItem);
const ListBoxItemContentMemo = memo(ListBoxItemContent);

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
    const OptionRenderer =
        typeof optionRenderer === 'function'
            ? optionRenderer
            : ListBoxItemContentMemo;

    useEffect(() => {
        if (focusIndex > -1) {
            const li = document.getElementById(idPrefx + focusIndex);
            if (li) {
                li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }, [focusIndex]);

    const items = ensureArray<Json>(data);

    return (
        <ul
            id={id}
            role="listbox"
            className={$listbox + ' ' + className}
            style={style}
            tabIndex={-1}>
            {expanded
                ? items.map((item, index) => {
                      const liId = idPrefx + index;
                      const isSelected = selected === item;
                      const liClassName = [
                          focusIndex === index ? 'focus ' + $focus : '',
                          isSelected ? 'selected ' + $selected : '',
                      ]
                          .filter(Boolean)
                          .join(' ');
                      return (
                          <ListBoxItemMemo
                              key={liId}
                              id={liId}
                              className={liClassName}
                              onClick={() => onSelect(item)}>
                              <OptionRenderer
                                  record={item}
                                  selected={isSelected}
                                  displayField={displayField}
                              />
                          </ListBoxItemMemo>
                      );
                  })
                : null}
        </ul>
    );
}

export default memo(ListBox);
