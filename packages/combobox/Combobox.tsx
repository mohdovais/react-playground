import React, {
    useCallback,
    useRef,
    useReducer,
    useEffect,
} from '../utils/react';
import ListBox from './listbox';
import { usePickerPosition } from './use-position';
import { comboboxReducer, initialState, Json } from './combobox.store';
import { useComboboxActions } from './use-actions';
import { randomId } from '../utils/common';
import {
    combobox as $combobox,
    input_wrapper as $input_wrapper,
    input as $input,
    trigger as $trigger,
    picker as $picker,
} from './combobox.module.scss';
import { extend } from '../utils/object';

export interface ComboboxProps<T> {
    displayField?: string;
    valueField?: string;
    queryMode?: 'remote' | 'local';
    data: T[];
    onChange?: (selection?: T) => void;
    optionRenderer?: (record: T) => JSX.Element | string;
    displayRenderer?: (record: T) => JSX.Element | string;
    query?: (search: string) => T[];
}

export function Combobox(props: ComboboxProps<Json>) {
    const {
        data,
        displayField = 'text',
        onChange,
        optionRenderer,
        displayRenderer,
    } = props;
    const comboboxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [state, dispatch] = useReducer(
        comboboxReducer,
        initialState,
        (state) => extend(state, { id: randomId('combobox'), displayField })
    );
    const {
        toggle,
        select,
        handleKeys,
        handleInput,
        setData,
    } = useComboboxActions(dispatch);
    const { id, expanded, selection, range, focusIndex } = state;
    const pickerStyle = usePickerPosition(comboboxRef, expanded);
    const pickerId = id + '-picker';
    const activeDescendantId =
        expanded && focusIndex === -1 ? '' : pickerId + '-option-' + focusIndex;

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
        const input = inputRef.current;
        if (input) {
            input.value = selection
                ? typeof displayRenderer === 'function'
                    ? displayRenderer(selection).toString()
                    : selection[displayField].toString()
                : '';
        }
    }, [selection, displayField, inputRef, displayRenderer]);

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(selection);
        }
    }, [selection, onChange]);

    return (
        <div className={$combobox} ref={comboboxRef}>
            <div
                className={$input_wrapper}
                role="combobox"
                aria-expanded={expanded ? 'true' : 'false'}
                aria-owns={pickerId}
                aria-haspopup="listbox">
                <input
                    type="text"
                    aria-autocomplete="both"
                    aria-controls={pickerId}
                    aria-activedescendant={activeDescendantId}
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
                id={pickerId}
                data={range}
                displayField={displayField}
                focusIndex={focusIndex}
                expanded={expanded}
                onSelect={select}
                selected={selection}
                optionRenderer={optionRenderer}
                className={$picker}
                style={pickerStyle}
            />
        </div>
    );
}
