import React, { useCallback, useRef, useReducer, useEffect } from 'react';
import ListBox from './listbox';
import { useRandomId } from '../hook/use-random-id';
import {
    comboboxReducer,
    initialState,
    useComboboxActions,
} from './combobox.store';
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

export function Combobox<T>(props: ComboboxProps<T>) {
    const { data, displayField = 'text', onChange } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useRandomId('combobox-');
    const listboxId = id + '-listbox';
    const [state, dispatch] = useReducer(comboboxReducer, initialState);
    const { expanded, selection, range, focusIndex } = state;
    const {
        expand,
        collapse,
        toggle,
        select,
        handleKeys,
        handleInput,
        setData,
    } = useComboboxActions(dispatch);

    const handleTriggerClick = useCallback(
        function () {
            let el = inputRef.current;
            if (el) {
                el.focus();
            }
            toggle();
        },
        [inputRef]
    );

    useEffect(() => {
        setData(data);
    }, [data]);

    useEffect(() => {
        if(selection && inputRef.current){
            inputRef.current.value = selection[displayField];
        }
    }, [selection, displayField, inputRef]);

    return (
        <div className={$combobox}>
            <div
                className={$input_wrapper}
                role="combobox"
                aria-expanded={expanded ? 'true' : 'false'}
                aria-owns={listboxId}
                aria-haspopup="listbox">
                <input
                    type="text"
                    aria-autocomplete="both"
                    aria-controls={listboxId}
                    aria-activedescendant={
                        focusIndex === -1 ? '' : id + '-option-' + focusIndex
                    }
                    onKeyDown={handleKeys}
                    onInput={handleInput}
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
                data={range}
                displayField={displayField}
                focusIndex={focusIndex}
                expanded={expanded}
                onSelect={select}
                selected={selection}
            />
        </div>
    );
}
