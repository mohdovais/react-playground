import { useCallback } from '../utils/react';

const assign = Object.assign;
const ACTION_TYPE_COLLAPSE = 0;
const ACTION_TYPE_EXPAND = 1;
const ACTION_TYPE_TOGGLE = 2;
const ACTION_TYPE_KEY_ARROW_DOWN = 3;
const ACTION_TYPE_KEY_ARROW_UP = 4;
const ACTION_TYPE_KEY_ENTER = 5;
const ACTION_TYPE_SELECT = 6;
const ACTION_TYPE_SET_DATA = 7;
const ACTION_TYPE_SEARCH = 8;

// not actual definition of JSON (null and Array not used)
export type Json = { [prop: string]: string | number | boolean | Date }

export interface ComboboxState<T> {
    displayField: string;
    expanded: boolean;
    focusIndex: number;
    selection?: T;
    data: T[];
    range: T[];
}

export interface ComboboxActionCollpase {
    type: typeof ACTION_TYPE_COLLAPSE
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
    type: typeof ACTION_TYPE_SELECT,
    selection: T
}

export interface ComboboxActionSetData<T> {
    type: typeof ACTION_TYPE_SET_DATA,
    data: T[]
}

export interface ComboboxActionSearch {
    type: typeof ACTION_TYPE_SEARCH,
    query: string;
}

export type ComboboxAction<T> = ComboboxActionCollpase | ComboboxActionExpand | ComboboxActionToggle | CompobobxActionArrowDown | ComboboxActionArrowUp | ComboboxActionEnter | ComboboxActionSelect<T> | ComboboxActionSetData<T> | ComboboxActionSearch;

export const initialState = {
    displayField: '',
    expanded: false,
    focusIndex: -1,
    selection: undefined,
    data: [],
    range: []
}

export function comboboxReducer(state: ComboboxState<Json>, action: ComboboxAction<Json>) {

    switch (action.type) {
        case ACTION_TYPE_COLLAPSE:
            return assign({}, state, {
                expanded: false,
                focusIndex: -1
            });

        case ACTION_TYPE_EXPAND:
            return assign({}, state, {
                expanded: true
            });

        case ACTION_TYPE_TOGGLE:
            return assign({}, state, {
                expanded: !state.expanded
            });

        case ACTION_TYPE_KEY_ARROW_DOWN: {
            let count = state.range.length;
            return assign({}, state, {
                expanded: true,
                focusIndex: count === 0 ? -1 : (state.focusIndex + 1) % count
            });
        }

        case ACTION_TYPE_KEY_ARROW_UP: {
            let count = state.range.length;
            let index = state.focusIndex === -1 ? count : state.focusIndex;
            return assign({}, state, {
                expanded: true,
                focusIndex: count === 0 ? -1 : (count + index - 1) % count
            });
        }

        case ACTION_TYPE_KEY_ENTER:
            if (state.focusIndex !== -1) {
                return assign({}, state, {
                    expanded: false,
                    focusIndex: -1,
                    selection: state.range[state.focusIndex]
                })
            }
            break;

        case ACTION_TYPE_SELECT:
            return assign({}, state, {
                expanded: false,
                focusIndex: -1,
                selection: action.selection
            });

        case ACTION_TYPE_SET_DATA: {
            let data = action.data;
            return assign({}, state, {
                data,
                range: data
            });
        }

        case ACTION_TYPE_SEARCH: {
            const search = new RegExp(action.query, 'i');
            return assign({}, state, {
                expanded: true,
                range: state.data.filter(record => search.test(record[state.displayField].toString()))
            })
        }


    }

    return state;
}

export function useComboboxActions<Json>(dispatch: React.Dispatch<ComboboxAction<Json>>) {

    const expand = useCallback(function () {
        dispatch({ type: ACTION_TYPE_EXPAND })
    }, [dispatch])

    const collapse = useCallback(function () {
        dispatch({ type: ACTION_TYPE_COLLAPSE })
    }, [dispatch]);

    const toggle = useCallback(function () {
        dispatch({ type: ACTION_TYPE_TOGGLE })
    }, [dispatch])

    const select = useCallback(function (selection: Json) {
        dispatch({
            type: ACTION_TYPE_SELECT,
            selection
        })
    }, [dispatch]);

    const handleKeys = useCallback(
        function (event: React.KeyboardEvent<HTMLInputElement>) {
            switch (event.key) {
                case 'ArrowDown': {
                    dispatch({ type: ACTION_TYPE_KEY_ARROW_DOWN });
                    break;
                }
                case 'ArrowUp': {
                    dispatch({ type: ACTION_TYPE_KEY_ARROW_UP });
                    break;
                }
                case 'Escape':
                    collapse();
                    break;
                case 'Enter':
                    dispatch({ type: ACTION_TYPE_KEY_ENTER });
                    break;
            }
        },
        [dispatch]
    );

    const handleInput = useCallback(function (event: React.FormEvent<HTMLInputElement>) {
        const inputEl = event.target as HTMLInputElement;
        dispatch({
            type: ACTION_TYPE_SEARCH,
            query: inputEl.value
        })
    }, [dispatch]);

    const setData = useCallback(function (data: Json[]) {
        dispatch({ type: ACTION_TYPE_SET_DATA, data })
    }, [dispatch])

    return { expand, collapse, toggle, select, handleKeys, handleInput, setData }
}