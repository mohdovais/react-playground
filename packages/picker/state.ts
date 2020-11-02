type KeyboardKey = {
    code: string;
    count: number;
}

export interface PickerState {
    expanded: boolean;
    key?: KeyboardKey;
}