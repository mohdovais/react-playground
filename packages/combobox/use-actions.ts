import { useCallback } from '../utils/react';
import {
    ACTION_TYPE_COLLAPSE,
    ACTION_TYPE_EXPAND,
    ACTION_TYPE_KEY_ARROW_DOWN,
    ACTION_TYPE_KEY_ARROW_UP,
    ACTION_TYPE_KEY_ENTER,
    ACTION_TYPE_LOCAL_SEARCH,
    ACTION_TYPE_SELECT,
    ACTION_TYPE_SET_DATA,
    ACTION_TYPE_SET_DATA_AND_EXPAND,
    ACTION_TYPE_TOGGLE,
    ACTION_TYPE_SET_WAITING,
    ComboboxAction,
} from './combobox.store';

export function useComboboxActions<Json>(
    dispatch: React.Dispatch<ComboboxAction<Json>>
) {
    const expand = useCallback(
        function () {
            dispatch({ type: ACTION_TYPE_EXPAND });
        },
        [dispatch]
    );

    const collapse = useCallback(
        function () {
            dispatch({ type: ACTION_TYPE_COLLAPSE });
        },
        [dispatch]
    );

    const toggle = useCallback(
        function () {
            dispatch({ type: ACTION_TYPE_TOGGLE });
        },
        [dispatch]
    );

    const select = useCallback(
        function (selection: Json) {
            dispatch({
                type: ACTION_TYPE_SELECT,
                selection,
            });
        },
        [dispatch]
    );

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

    const handleLocalSearch = useCallback(
        function (query: string) {
            dispatch({
                type: ACTION_TYPE_LOCAL_SEARCH,
                query,
            });
        },
        [dispatch]
    );

    const setData = useCallback(
        function (data: Json[]) {
            dispatch({ type: ACTION_TYPE_SET_DATA, data });
        },
        [dispatch]
    );

    const handleRemoteSearch = useCallback(
        function (data: Json[]) {
            dispatch({ type: ACTION_TYPE_SET_DATA_AND_EXPAND, data });
        },
        [dispatch]
    );

    const setWaiting = useCallback(
        function (waiting: boolean) {
            dispatch({ type: ACTION_TYPE_SET_WAITING, waiting });
        },
        [dispatch]
    );

    return {
        expand,
        collapse,
        toggle,
        select,
        handleKeys,
        handleLocalSearch,
        setData,
        handleRemoteSearch,
        setWaiting
    };
}
