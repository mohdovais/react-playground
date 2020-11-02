import { createContext } from '../utils/react';

export type Key = {
    key: string;
    shiftKey: boolean;
    ctrlKey: boolean;
};

type Context = {
    keyDown: Key | null;
    setValue: (value: string) => void;
};

const context: Context = {
    keyDown: null,
    setValue: (value: string) => {},
};

export default createContext(context);
