const assign = Object.assign;

export const ACTION_TYPE_COLLAPSE = 0;
export const ACTION_TYPE_EXPAND = 1;
export const ACTION_TYPE_TOGGLE = 2;
export const ACTION_TYPE_KEY_ARROW_DOWN = 3;
export const ACTION_TYPE_KEY_ARROW_UP = 4;
export const ACTION_TYPE_KEY_ENTER = 5;
export const ACTION_TYPE_SELECT = 6;
export const ACTION_TYPE_SET_DATA = 7;
export const ACTION_TYPE_SEARCH = 8;

// not actual definition of JSON (null and Array not used)
export type Json = { [prop: string]: string | number | boolean | Date };

export interface ComboboxState<T> {
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
    type: typeof ACTION_TYPE_SEARCH;
    query: string;
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
    | ComboboxActionSearch;

export const initialState = {
    displayField: '',
    expanded: false,
    focusIndex: -1,
    selection: undefined,
    data: [],
    range: [],
};

export function comboboxReducer(
    state: ComboboxState<Json>,
    action: ComboboxAction<Json>
) {
    switch (action.type) {
        case ACTION_TYPE_COLLAPSE:
            return assign({}, state, {
                expanded: false,
                focusIndex: -1,
            });

        case ACTION_TYPE_EXPAND:
            return assign({}, state, {
                expanded: true,
            });

        case ACTION_TYPE_TOGGLE:
            return assign({}, state, {
                expanded: !state.expanded,
            });

        case ACTION_TYPE_KEY_ARROW_DOWN: {
            let count = state.range.length;
            return assign({}, state, {
                expanded: true,
                focusIndex: count === 0 ? -1 : (state.focusIndex + 1) % count,
            });
        }

        case ACTION_TYPE_KEY_ARROW_UP: {
            let count = state.range.length;
            let index = state.focusIndex === -1 ? count : state.focusIndex;
            return assign({}, state, {
                expanded: true,
                focusIndex: count === 0 ? -1 : (count + index - 1) % count,
            });
        }

        case ACTION_TYPE_KEY_ENTER:
            if (state.focusIndex !== -1) {
                return assign({}, state, {
                    expanded: false,
                    focusIndex: -1,
                    selection: state.range[state.focusIndex],
                });
            }
            break;

        case ACTION_TYPE_SELECT:
            return assign({}, state, {
                expanded: false,
                focusIndex: -1,
                selection: action.selection,
            });

        case ACTION_TYPE_SET_DATA: {
            let data = action.data;
            return assign({}, state, {
                data,
                range: data,
            });
        }

        case ACTION_TYPE_SEARCH: {
            const search = new RegExp(action.query, 'i');
            return assign({}, state, {
                expanded: true,
                range: state.data.filter((record) =>
                    search.test(record[state.displayField].toString())
                ),
            });
        }
    }

    return state;
}
