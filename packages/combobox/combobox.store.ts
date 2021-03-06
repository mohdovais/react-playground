import { extend } from '../utils/object';

export const ACTION_TYPE_COLLAPSE = 0;
export const ACTION_TYPE_EXPAND = 1;
export const ACTION_TYPE_TOGGLE = 2;
export const ACTION_TYPE_KEY_ARROW_DOWN = 3;
export const ACTION_TYPE_KEY_ARROW_UP = 4;
export const ACTION_TYPE_KEY_ENTER = 5;
export const ACTION_TYPE_SELECT = 6;
export const ACTION_TYPE_SET_DATA = 7;
export const ACTION_TYPE_LOCAL_SEARCH = 8;
export const ACTION_TYPE_SET_DATA_AND_EXPAND = 9;
export const ACTION_TYPE_SET_WAITING = 10;

// not actual definition of JSON (null and Array not used)
export type Json = {
    [prop: string]: string | number | boolean | Date | Json | Json[];
};

export interface ComboboxState<T> {
    id: string;
    waiting: boolean;
    displayField: string;
    expanded: boolean;
    focusIndex: number;
    selection?: T;
    data: T[];
    range: T[];
}

export interface ComboboxActionCollpase {
    type: typeof ACTION_TYPE_COLLAPSE;
}

export interface ComboboxActionExpand {
    type: typeof ACTION_TYPE_EXPAND;
}

export interface ComboboxActionToggle {
    type: typeof ACTION_TYPE_TOGGLE;
}

export interface CompobobxActionArrowDown {
    type: typeof ACTION_TYPE_KEY_ARROW_DOWN;
}

export interface ComboboxActionArrowUp {
    type: typeof ACTION_TYPE_KEY_ARROW_UP;
}

export interface ComboboxActionEnter {
    type: typeof ACTION_TYPE_KEY_ENTER;
}

export interface ComboboxActionSelect<T> {
    type: typeof ACTION_TYPE_SELECT;
    selection: T;
}

export interface ComboboxActionSetData<T> {
    type: typeof ACTION_TYPE_SET_DATA;
    data: T[];
}

export interface ComboboxActionSearch {
    type: typeof ACTION_TYPE_LOCAL_SEARCH;
    query: string;
}

export interface ComboboxActionSetDataAndExpand<T> {
    type: typeof ACTION_TYPE_SET_DATA_AND_EXPAND;
    data: T[];
}

export interface ComboboxActionSetWating {
    type: typeof ACTION_TYPE_SET_WAITING;
    waiting: boolean;
}

export type ComboboxAction<T> =
    | ComboboxActionCollpase
    | ComboboxActionExpand
    | ComboboxActionToggle
    | CompobobxActionArrowDown
    | ComboboxActionArrowUp
    | ComboboxActionEnter
    | ComboboxActionSelect<T>
    | ComboboxActionSetData<T>
    | ComboboxActionSearch
    | ComboboxActionSetDataAndExpand<T>
    | ComboboxActionSetWating;

export const initialState = {
    id: '',
    displayField: '',
    expanded: false,
    waiting: false,
    focusIndex: -1,
    selection: undefined,
    data: [],
    range: [],
};

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

        case ACTION_TYPE_KEY_ARROW_DOWN: {
            let count = state.range.length;
            return extend(state, {
                expanded: true,
                focusIndex: count === 0 ? -1 : (state.focusIndex + 1) % count,
            });
        }

        case ACTION_TYPE_KEY_ARROW_UP: {
            let count = state.range.length;
            let index = state.focusIndex === -1 ? count : state.focusIndex;
            return extend(state, {
                expanded: true,
                focusIndex: count === 0 ? -1 : (count + index - 1) % count,
            });
        }

        case ACTION_TYPE_KEY_ENTER:
            if (state.focusIndex !== -1) {
                return extend(state, {
                    expanded: false,
                    focusIndex: -1,
                    range: state.data,
                    selection: state.range[state.focusIndex],
                });
            }
            break;

        case ACTION_TYPE_SELECT:
            return extend(state, {
                expanded: false,
                focusIndex: -1,
                range: state.data,
                selection: action.selection,
            });

        case ACTION_TYPE_SET_DATA: {
            let data = action.data;
            return extend(state, {
                data,
                range: data,
            });
        }

        case ACTION_TYPE_LOCAL_SEARCH: {
            const search = new RegExp(action.query, 'i');
            return extend(state, {
                expanded: true,
                range: state.data.filter((record) =>
                    search.test(record[state.displayField].toString())
                ),
            });
        }

        case ACTION_TYPE_SET_DATA_AND_EXPAND:
            return extend(state, {
                expanded: true,
                focusIndex: -1,
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
