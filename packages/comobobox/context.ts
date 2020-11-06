import React from '../utils/react';

export const DropdownContext = React.createContext({
    onClick: (value: string) => {},
});
export const OptGroupContext = React.createContext({ disabled: false });
