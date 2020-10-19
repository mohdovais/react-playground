import React, {
    useCallback,
    useRef,
    useReducer,
    useEffect,
} from '../utils/react';
import ListBox from './listbox';
import { useRandomId } from '../hook/use-random-id';
import {
    comboboxReducer,
    initialState,
    useComboboxActions,
    Json,
} from './combobox.store';
import {
    combobox as $combobox,
    input_wrapper as $input_wrapper,
    input as $input,
    trigger as $trigger,
    picker as $picker,
} from './combobox.module.scss';

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

function resizeOptions(ref: React.RefObject<HTMLUListElement>) {
    const el = ref.current;
    if (el) {
        const rect = el.getBoundingClientRect();
        el.style.maxHeight = window.innerHeight - rect.y - 10 + 'px';
    }
}

export function Combobox(props: ComboboxProps<Json>) {
    const {
        data,
        displayField = 'text',
        onChange,
        optionRenderer,
        displayRenderer,
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);

    const id = useRandomId('combobox-');
    const listboxId = id + '-listbox';
    const [state, dispatch] = useReducer(
        comboboxReducer,
        initialState,
        (state) => Object.assign({}, state, { displayField })
    );
    const { expanded, selection, range, focusIndex } = state;
    const activeDescendantId =
        expanded && focusIndex === -1
            ? ''
            : listboxId + '-option-' + focusIndex;

    const {
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

    useEffect(() => {
        if (activeDescendantId !== '') {
            const li = document.getElementById(activeDescendantId);
            if (li) {
                li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }, [activeDescendantId]);

    useEffect(() => {
        expanded && resizeOptions(optionsRef);
    }, [optionsRef, expanded]);

    useEffect(() => {
        const resize = () => resizeOptions(optionsRef);
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [optionsRef]);

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
                id={listboxId}
                data={range}
                displayField={displayField}
                focusIndex={focusIndex}
                expanded={expanded}
                onSelect={select}
                selected={selection}
                optionRenderer={optionRenderer}
                className={$picker}
                ref={optionsRef}
            />
        </div>
    );
}
