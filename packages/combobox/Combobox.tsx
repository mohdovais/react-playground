import React, { useCallback, useState, useRef } from 'react';
import ListBox from '../listbox';
import { useRandomId } from '../hook/use-random-id';
import {
    combobox as $combobox,
    input_wrapper as $input_wrapper,
    input as $input,
    trigger as $trigger,
} from './Combobox.module.scss';

export interface ComboboxProps<T> {
    displayField: 'text';
    valueField: 'text';
    queryMode: 'local';
    data: T[];
    onChange?: (selection: T) => void;
}

export function Combobox<T = undefined>(props: ComboboxProps<T>) {
    const { data, displayField = 'text', onChange } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useRandomId('combobox-');
    const listboxId = id + '-listbox';
    const [expanded, setExpanded] = useState<boolean>(false);
    const [focusIndex, setFocusIndex] = useState<number>(-1);
    const [selection, setSelection] = useState<T>();
    const collapse = useCallback(() => {
        setExpanded(false);
        setFocusIndex(-1);
    }, []);
    const handleKeyDown = useCallback(
        function (event: React.KeyboardEvent<HTMLInputElement>) {
            const count = data.length;
            switch (event.key) {
                case 'ArrowDown': {
                    setExpanded(true);
                    setFocusIndex((focusIndex + 1) % count);
                    break;
                }
                case 'ArrowUp': {
                    setExpanded(true);
                    let index = focusIndex === -1 ? count : focusIndex;
                    setFocusIndex((count + index - 1) % count);
                    break;
                }
                case 'Escape':
                    collapse();
                    break;
                case 'Enter':
                    if (focusIndex !== -1) {
                        handleSelect(data[focusIndex]);
                    }
            }
        },
        [data, focusIndex]
    );

    const handleTriggerClick = useCallback(
        function () {
            setExpanded(!expanded);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        },
        [expanded, inputRef]
    );

    const handleSelect = useCallback(function (selection: T) {
        setExpanded(false);
        setSelection(selection);
        typeof onChange === 'function' && onChange(selection);
    }, []);

    return (
        <div className={$combobox}>
            <div
                className={$input_wrapper}
                role="combobox"
                aria-expanded="false"
                aria-owns={listboxId}
                aria-haspopup="listbox">
                <input
                    type="text"
                    aria-autocomplete="both"
                    aria-controls={listboxId}
                    aria-activedescendant={
                        focusIndex === -1 ? '' : id + '-option-' + focusIndex
                    }
                    onKeyDown={handleKeyDown}
                    onBlur={() => collapse()}
                    className={$input}
                    ref={inputRef}
                />
                <div
                    className={$trigger}
                    tabIndex={-1}
                    role="button"
                    aria-label="Show options"
                    onClick={handleTriggerClick}>
                    ▼
                </div>
            </div>
            <ListBox
                id={listboxId}
                data={data}
                displayField={displayField}
                focusIndex={focusIndex}
                expanded={expanded}
                onSelect={handleSelect}
                selected={selection}
            />
        </div>
    );
}
