import React, {
    useCallback,
    useRef,
    useReducer,
    useEffect,
    useMemo,
    memo,
} from '../utils/react';
import ListBox, {
    OptionRendererType,
    listBoxItemContentFactory,
} from './listbox';
import { usePickerPosition } from './use-position';
import { comboboxReducer, initialState, Json } from './combobox.store';
import { useComboboxActions } from './use-actions';
import { randomId } from '../utils/common';
import { debounced } from '../utils/function';
import {
    combobox as $combobox,
    input_wrapper as $input_wrapper,
    input as $input,
    trigger as $trigger,
    picker as $picker,
    waiting as $waiting,
} from './combobox.module.scss';
import { extend } from '../utils/object';

export interface ComboboxCommonProps<T> {
    displayField?: string;
    valueField?: string;
    onChange?: (selection: T[]) => void;
    optionRenderer?: OptionRendererType<T>;
    displayRenderer?: (record: T) => JSX.Element | string;
    hideTrigger?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    forceSelection?: boolean;
    placeholder?: string;
}

export interface ComboboxLocalProps<T> extends ComboboxCommonProps<T> {
    queryMode?: 'local';
    data: T[];
    onRemoteQuery?: undefined;
}

export interface ComboboxRemoteProps<T> extends ComboboxCommonProps<T> {
    queryMode: 'remote';
    data?: undefined;
    onRemoteQuery: (search: string) => T[] | Promise<T[]>;
}

export type ComboboxProps<T> = ComboboxLocalProps<T> | ComboboxRemoteProps<T>;

function focus(ref: React.RefObject<HTMLElement>) {
    let el = ref.current;
    if (el) {
        el.focus();
    }
}

function Combobox(props: ComboboxProps<Json>) {
    const comboboxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const activeDescendantId = '';

    const {
        queryMode = 'local',
        displayField = 'text',
        className = '',
        forceSelection = true,
        data,
        hideTrigger,
        disabled,
        readOnly,
        placeholder,
        onChange,
        onRemoteQuery,
        optionRenderer,
        displayRenderer,
    } = props;

    const optionRendererMemo = useMemo(() => {
        return optionRenderer == null
            ? listBoxItemContentFactory(displayField)
            : optionRenderer;
    }, [displayField, optionRenderer]);

    const [state, dispatch] = useReducer(
        comboboxReducer,
        initialState,
        (state) => extend(state, { id: randomId('combobox-'), displayField })
    );

    const {
        toggle,
        select,
        collapse,
        handleKeys,
        handleLocalSearch,
        setData,
        setWaiting,
    } = useComboboxActions(dispatch);

    const { id, expanded, selection, range, waiting, keyboard } = state;
    const pickerStyle = usePickerPosition(comboboxRef, expanded);
    const pickerId = id + '-picker';

    const handleTriggerClick = useCallback(() => {
        focus(inputRef);
        toggle();
    }, [inputRef]);

    const handleInput = useCallback(
        debounced((event: React.FormEvent<HTMLInputElement>) => {
            const input = event.target as HTMLInputElement;
            const text = input.value;
            if (queryMode === 'local') {
                handleLocalSearch(text);
            } else {
                setWaiting(true);
                Promise.resolve(
                    typeof onRemoteQuery === 'function' && onRemoteQuery(text)
                ).then((data) => {
                    data !== false && setData(data, true);
                });
            }
        }),
        [queryMode, onRemoteQuery, setWaiting, handleLocalSearch]
    );

    useEffect(() => {
        if (data !== undefined) {
            setData(data);
        }
    }, [data]);

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(selection);
        }
    }, [selection, onChange]);

    const cls =
        $combobox + ' ' + className + (waiting ? ' wating ' + $waiting : '');

    return (
        <div className={cls} ref={comboboxRef}>
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
                    disabled={disabled}
                    readOnly={readOnly}
                    placeholder={placeholder}
                />
                {hideTrigger ? null : (
                    <div
                        className={$trigger}
                        tabIndex={-1}
                        role="button"
                        aria-label="Show options"
                        onClick={disabled ? undefined : handleTriggerClick}>
                        ▼
                    </div>
                )}
            </div>
            <ListBox
                id={pickerId}
                data={range}
                itemRenderer={optionRendererMemo}
                expanded={expanded}
                onSelect={select}
                selection={selection}
                className={$picker}
                style={pickerStyle}
                keyboard={keyboard}
            />
        </div>
    );
}

export default memo(Combobox);
