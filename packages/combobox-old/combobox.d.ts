declare module 'Combobox' {
    export const ACTION_TYPE_COLLAPSE = 0;
    export const ACTION_TYPE_EXPAND = 1;
    export const ACTION_TYPE_TOGGLE = 2;
    export const ACTION_TYPE_KEYBOARD_NAVIGATION = 3;
    export const ACTION_TYPE_SELECT = 4;
    export const ACTION_TYPE_SET_DATA = 5;
    export const ACTION_TYPE_LOCAL_SEARCH = 6;
    export const ACTION_TYPE_SET_WAITING = 7;
    export const ACTION_TYPE_SET_ACTIVE_DECENDENT = 8;

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
        activeDescendant: string;
    }

    export interface ComboboxCommonProps<T> {
        displayField?: string;
        valueField?: string;
        onChange?: (selection: T[]) => void;
        optionRenderer?: OptionRendererType<T>;
        displayRenderer?: (record: T) => JSX.Element | string;
        hideTrigger?: boolean;
        disabled?: boolean;
        readOnly?: boolean;
        className?: string;
        forceSelection?: boolean;
        placeholder?: string;
    }

    export interface ComboboxLocalProps<T> extends ComboboxCommonProps<T> {
        queryMode?: 'local';
        data: T[];
        onRemoteQuery?: undefined;
    }

    export interface ComboboxRemoteProps<T> extends ComboboxCommonProps<T> {
        queryMode: 'remote';
        data?: undefined;
        onRemoteQuery: (search: string) => T[] | Promise<T[]>;
    }

    export type ComboboxProps<T> =
        | ComboboxLocalProps<T>
        | ComboboxRemoteProps<T>;

    interface ComboboxActionCollpase {
        type: typeof ACTION_TYPE_COLLAPSE;
    }

    interface ComboboxActionExpand {
        type: typeof ACTION_TYPE_EXPAND;
    }

    interface ComboboxActionToggle {
        type: typeof ACTION_TYPE_TOGGLE;
    }

    interface CompobobxActionKeyboardNavigation {
        type: typeof ACTION_TYPE_KEYBOARD_NAVIGATION;
        key: string;
    }

    interface ComboboxActionSelect<T> {
        type: typeof ACTION_TYPE_SELECT;
        selection: T;
    }

    interface ComboboxActionSetData<T> {
        type: typeof ACTION_TYPE_SET_DATA;
        data: T[];
        expand: boolean;
    }

    interface ComboboxActionSearch {
        type: typeof ACTION_TYPE_LOCAL_SEARCH;
        query: string;
    }

    interface ComboboxActionSetWating {
        type: typeof ACTION_TYPE_SET_WAITING;
        waiting: boolean;
    }

    interface ComboboxActionsetActiveDecendent {
        type: typeof ACTION_TYPE_SET_ACTIVE_DECENDENT;
        id: string;
    }

    export type ComboboxAction<T> =
        | ComboboxActionCollpase
        | ComboboxActionExpand
        | ComboboxActionToggle
        | CompobobxActionKeyboardNavigation
        | ComboboxActionSelect<T>
        | ComboboxActionSetData<T>
        | ComboboxActionSearch
        | ComboboxActionSetWating
        | ComboboxActionsetActiveDecendent;

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
        onKeyFocus?: (focusElementId: string) => void;
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
