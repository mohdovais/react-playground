import React, {
    memo,
    useEffect,
    useMemo,
    useRef,
    useState,
} from '../utils/react';
import { usePickerPosition } from '../hook/use-position';
import { useRandomId } from '../hook/use-random-id';
import { emptyFn } from '../utils/function';
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
}

export const PickerContext = React.createContext({
    onClick: (value: any) => {
        console.log('sfsdfsdfds');
    },
    setValue: (value: string) => {},
});

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
        onChange,
        placeholder,
        readOnly,
        required,
        role = 'combobox',
        style,
        triggerIcon = <TriggerIcon />,
    } = props;

    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const randomId = useRandomId('combobox-');
    const componentId = id === undefined ? randomId : id;

    const pickerId = componentId + '-picker';

    /* will be extracted in reducer */
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState('');
    const listeners = useMemo(() => {
        return {
            onClick: function (selection: any) {
                typeof onChange === 'function' && onChange(selection);
            },
            setValue: function(value: string){
                if(!multiple){
                    setExpanded(false);
                }
                setValue(value);
            },
        };
    }, [onChange]);

    const pickerStyle = usePickerPosition(ref, expanded);
    const activeDescendant = undefined;
    const handleInput = emptyFn;
    const handleKey = console.log;

    const x = [
        'ArrowDown',
        'ArrowUp',
        'ArrowRight',
        'ArrowLeft',
        'Space',
        'Enter',
    ];
    //shiftKey //metaKey or ctrlKey

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
                        onKeyDown={handleKey}
                        onInput={handleInput}
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
                        <PickerContext.Provider value={listeners}>
                            {children}
                        </PickerContext.Provider>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default memo(Picker);
