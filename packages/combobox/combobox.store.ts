/// <reference path="combobox.d.ts" />
import { extend } from '../utils/object';
import { Json, KeyboardNavType } from 'Combobox';
import { ComboboxState, ComboboxAction } from 'Combobox';

export const ACTION_TYPE_COLLAPSE = 0;
export const ACTION_TYPE_EXPAND = 1;
export const ACTION_TYPE_TOGGLE = 2;
export const ACTION_TYPE_KEYBOARD_NAVIGATION = 3;
export const ACTION_TYPE_SELECT = 4;
export const ACTION_TYPE_SET_DATA = 5;
export const ACTION_TYPE_LOCAL_SEARCH = 6;
export const ACTION_TYPE_SET_WAITING = 7;

export const initialState = {
    id: '',
    expanded: false,
    waiting: false,
    selection: [],
    data: [],
    range: [],
    keyboard: {
        key: '',
        count: 0,
    },
};

function keyboardNavigation(nav: KeyboardNavType, key: string) {
    return {
        key,
        count: nav.key === key ? nav.count + 1 : 0,
    };
}

export function comboboxReducer<T extends Json>(
    state: ComboboxState<T>,
    action: ComboboxAction<T>
): ComboboxState<T> {
    switch (action.type) {
        case ACTION_TYPE_COLLAPSE:
            return extend(state, {
                expanded: false,
                focusIndex: -1,
            });

        case ACTION_TYPE_EXPAND:
            return extend(state, {
                expanded: true,
            });

        case ACTION_TYPE_TOGGLE:
            return comboboxReducer(state, {
                type: state.expanded
                    ? ACTION_TYPE_COLLAPSE
                    : ACTION_TYPE_EXPAND,
            });

        case ACTION_TYPE_KEYBOARD_NAVIGATION:
            return extend(state, {
                expanded: true,
                keyboard: keyboardNavigation(state.keyboard, action.key),
            });

        case ACTION_TYPE_SELECT:
            return extend(state, {
                expanded: false,
                focusIndex: -1,
                range: state.data,
                selection: action.selection,
            });

        case ACTION_TYPE_LOCAL_SEARCH: {
            const search = new RegExp(action.query, 'i');
            return extend(state, {
                expanded: true,
                range: state.data.filter((record) =>
                    search.test(record.toString())
                ),
            });
        }

        case ACTION_TYPE_SET_DATA:
            return extend(state, {
                expanded: action.expand,
                waiting: false,
                data: action.data,
                range: action.data,
            });

        case ACTION_TYPE_SET_WAITING:
            return extend(state, {
                waiting: action.waiting,
            });
    }

    return state;
}
