import { useReducer, useCallback, useMemo } from '../utils/react';
import { extend } from '../utils/object';
import { Key } from './context';

interface PickerState {
    expanded: boolean;
    keyDown: Key | null;
    value: string;
    activeDescendant: string;
}

const ACTION_SET_VALUE = 0;
const ACTION_SET_EXPANDED = 1;
const ACTION_SET_KEY = 2;

type ActionSetValue = {
    type: typeof ACTION_SET_VALUE;
    value: string;
    collapse: boolean;
};

type ActionSetExpanded = {
    type: typeof ACTION_SET_EXPANDED;
    expand: boolean;
};

type ActionSetKey = {
    type: typeof ACTION_SET_KEY;
    key: Key;
    expand: boolean;
};

type Action = ActionSetValue | ActionSetExpanded | ActionSetKey;

const KEYS_TO_BE_PROPAGATED = [
    'ArrowDown',
    'ArrowUp',
    'ArrowRight',
    'ArrowLeft',
    ' ',
    'Enter',
    'Escape',
];

function pickerReducer(state: PickerState, action: Action): PickerState {
    switch (action.type) {
        case ACTION_SET_VALUE:
            return extend(state, {
                value: action.value,
                expanded: action.collapse ? false : state.expanded,
            });
        case ACTION_SET_EXPANDED:
            return extend(state, {
                expanded: action.expand,
            });
        case ACTION_SET_KEY:
            return extend(state, {
                keyDown: action.key,
                expanded: action.expand || state.expanded,
            });
    }
    return state;
}

export function usePickerState({ multiple }) {
    const [state, disptach] = useReducer(pickerReducer, {
        expanded: false,
        keyDown: null,
        value: '',
        activeDescendant: '',
    });

    const { expanded, value, keyDown, activeDescendant } = state;

    const setValue = useCallback(
        (value: string) => {
            disptach({
                type: ACTION_SET_VALUE,
                value,
                collapse: !multiple,
            });
        },
        [disptach]
    );

    const context = useMemo(() => ({ setValue, keyDown }), [keyDown]);

    const handleKeyDown = useCallback(function (event: React.KeyboardEvent) {
        const { key, ctrlKey, metaKey, shiftKey } = event;

        if (key === 'Escape') {
            return disptach({ type: ACTION_SET_EXPANDED, expand: false });
        }

        if (KEYS_TO_BE_PROPAGATED.indexOf(key) > -1) {
            return disptach({
                type: ACTION_SET_KEY,
                key: {
                    key,
                    shiftKey,
                    ctrlKey: ctrlKey || metaKey,
                },
                expand: key === 'ArrowDown' || key === 'ArrowUp',
            });
        }
    }, []);

    return { expanded, value, activeDescendant, context, handleKeyDown };
}
