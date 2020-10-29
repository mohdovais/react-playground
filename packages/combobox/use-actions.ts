/// <reference path="combobox.d.ts" />
import { useCallback } from '../utils/react';
import {
    ACTION_TYPE_COLLAPSE,
    ACTION_TYPE_EXPAND,
    ACTION_TYPE_KEYBOARD_NAVIGATION,
    ACTION_TYPE_LOCAL_SEARCH,
    ACTION_TYPE_SELECT,
    ACTION_TYPE_SET_DATA,
    ACTION_TYPE_TOGGLE,
    ACTION_TYPE_SET_WAITING,
} from './combobox.store';
import { ComboboxAction } from 'Combobox';

export function useComboboxActions<Json>(
    dispatch: React.Dispatch<ComboboxAction<Json>>
) {
    const deps = [dispatch];

    const expand = useCallback(
        () => dispatch({ type: ACTION_TYPE_EXPAND }),
        deps
    );

    const collapse = useCallback(
        () => dispatch({ type: ACTION_TYPE_COLLAPSE }),
        deps
    );

    const toggle = useCallback(
        () => dispatch({ type: ACTION_TYPE_TOGGLE }),
        deps
    );

    const select = useCallback(
        (selection: Json) => dispatch({ type: ACTION_TYPE_SELECT, selection }),
        deps
    );

    const handleKeys = useCallback(function (
        event: React.KeyboardEvent<HTMLInputElement>
    ) {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
            case 'Enter':
                dispatch({
                    type: ACTION_TYPE_KEYBOARD_NAVIGATION,
                    key: event.key,
                });
                break;

            case 'Escape':
                collapse();
                break;
        }
    },
    deps);

    const handleLocalSearch = useCallback(
        (query: string) => dispatch({ type: ACTION_TYPE_LOCAL_SEARCH, query }),
        deps
    );

    const setData = useCallback((data: Json[], expand = false) => {
        dispatch({ type: ACTION_TYPE_SET_DATA, data, expand });
    }, deps);

    const setWaiting = useCallback(
        (waiting: boolean) =>
            dispatch({ type: ACTION_TYPE_SET_WAITING, waiting }),
        deps
    );

    return {
        expand,
        collapse,
        toggle,
        select,
        handleKeys,
        handleLocalSearch,
        setData,
        setWaiting,
    };
}
