declare module 'Combobox' {
    export const ACTION_TYPE_COLLAPSE = 0;
    export const ACTION_TYPE_EXPAND = 1;
    export const ACTION_TYPE_TOGGLE = 2;
    export const ACTION_TYPE_KEYBOARD_NAVIGATION = 3;
    export const ACTION_TYPE_SELECT = 4;
    export const ACTION_TYPE_SET_DATA = 5;
    export const ACTION_TYPE_LOCAL_SEARCH = 6;
    export const ACTION_TYPE_SET_WAITING = 7;

    export type Json = {
        [prop: string]: string | number | boolean | Date | Json | Json[];
    };

    export interface ComboboxState<T> {
        id: string;
        waiting: boolean;
        expanded: boolean;
        selection: T[];
        data: T[];
        range: T[];
        keyboard: KeyboardNavType;
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

    export interface CompobobxActionKeyboardNavigation {
        type: typeof ACTION_TYPE_KEYBOARD_NAVIGATION;
        key: string;
    }

    export interface ComboboxActionSelect<T> {
        type: typeof ACTION_TYPE_SELECT;
        selection: T;
    }

    export interface ComboboxActionSetData<T> {
        type: typeof ACTION_TYPE_SET_DATA;
        data: T[];
        expand: boolean;
    }

    export interface ComboboxActionSearch {
        type: typeof ACTION_TYPE_LOCAL_SEARCH;
        query: string;
    }

    export interface ComboboxActionSetWating {
        type: typeof ACTION_TYPE_SET_WAITING;
        waiting: boolean;
    }

    export type ComboboxAction<T> =
        | ComboboxActionCollpase
        | ComboboxActionExpand
        | ComboboxActionToggle
        | CompobobxActionKeyboardNavigation
        | ComboboxActionSelect<T>
        | ComboboxActionSetData<T>
        | ComboboxActionSearch
        | ComboboxActionSetWating;

    export interface ListBoxItemContentProps<T> {
        record: T;
        selected: boolean;
    }

    export type OptionRendererType<T> =
        | React.ComponentType<ListBoxItemContentProps<T>>
        | React.MemoExoticComponent<React.ComponentType<T>>;

    type Ref<T> =
        | React.MutableRefObject<T | null>
        | ((instance: T | null) => void)
        | null;

    type KeyboardNavType = {
        key: string;
        count: number;
    };

    export interface ListBoxProps<T> {
        data: T[];
        itemRenderer: OptionRendererType<T>;
        onSelect: (selection: T) => void;

        id?: string;
        className?: string;
        selection?: T[];
        expanded?: boolean;
        style?: React.CSSProperties;
        keyboard?: KeyboardNavType;
    }

    export interface ListBoxItemProps<T> {
        id: string;
        className: string;
        children: any;
        record: T;
        selected: boolean;
        onClick: (record: T) => void;
    }
}
