import React, { memo, useEffect, useRef } from '../utils/react';
import { usePickerPosition } from '../hook/use-position';
import { useRandomId } from '../hook/use-random-id';
import PickerContext from './context';
import { usePickerState } from './state';
import {
    reaper as $reaper,
    input as $input,
    picker as $picker,
    picker_container as $picker_container,
    trigger as $trigger,
} from './picker.module.css';

export interface PickerProps {
    autocomplete?: React.AriaAttributes['aria-autocomplete'];
    autofocus?: boolean;
    disabled?: boolean;
    multiple?: boolean;
    name?: string;
    required?: boolean;
    role?: string;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    readOnly?: boolean;
    placeholder?: string;
    children?: React.ReactElement;
    onChange?: CallableFunction;
    triggerIcon?: any;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
}

const TriggerIcon = memo(function TriggerIcon() {
    return (
        <svg viewBox="0 0 16 16">
            <path
                fill="none"
                stroke="#343a40"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2 5l6 6 6-6"
            />
        </svg>
    );
});

function Picker(props: PickerProps) {
    const {
        autocomplete = 'both',
        autofocus,
        children,
        className = '',
        disabled,
        id,
        multiple,
        name,
        onInput,
        placeholder,
        readOnly,
        required,
        role = 'combobox',
        style,
        triggerIcon = <TriggerIcon />,
    } = props;

    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        expanded,
        value,
        activeDescendant,
        context,
        handleKeyDown,
    } = usePickerState({ multiple });

    const randomId = useRandomId('picker-');
    const componentId = id === undefined ? randomId : id;
    const pickerId = componentId + '-picker';
    const pickerStyle = usePickerPosition(ref, expanded);

    useEffect(() => {
        if (autofocus) {
            inputRef?.current?.focus();
        }
    }, []);

    return (
        <div
            id={componentId}
            className={$reaper + ' ' + className}
            style={style}
            role={role}
            aria-expanded={expanded ? 'true' : 'false'}
            aria-owns={pickerId}
            aria-haspopup="listbox"
            ref={ref}>
            <div className={$picker_container}>
                <div>
                    <input
                        type="text"
                        name={name}
                        aria-autocomplete={autocomplete}
                        aria-controls={pickerId}
                        aria-activedescendant={activeDescendant}
                        onKeyDown={handleKeyDown}
                        onInput={onInput}
                        ref={inputRef}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        className={$input}
                        required={required}
                        value={value}
                    />
                    <div
                        tabIndex={-1}
                        role="button"
                        aria-label="Show picker"
                        className={$trigger}
                        onClick={
                            disabled
                                ? undefined
                                : () => {
                                      setExpanded(!expanded);
                                      inputRef?.current?.focus();
                                  }
                        }>
                        {triggerIcon}
                    </div>
                </div>
                <div id={pickerId} className={$picker} style={pickerStyle}>
                    {expanded ? (
                        <PickerContext.Provider value={context}>
                            {children}
                        </PickerContext.Provider>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default memo(Picker);
