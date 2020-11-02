import React, { memo, Children, isValidElement } from '../utils/react';
import { OptGroupContext } from './context';
import Option from './option';
import {
    option_group as $option_group,
    option_group_label as $option_group_label,
} from './style.module.css';

export interface OptGroupProps {
    disabled?: boolean;
    label: string;
    children: any;
}

function OptGroup(props: OptGroupProps) {
    const { label, disabled = false } = props;
    const children = Children.toArray(props.children).filter(
        (child: React.ReactNode) =>
            isValidElement(child) && child.type === Option
    );
    return (
        <li className={$option_group}>
            <label className={$option_group_label}>{label}</label>
            {children.length > 0 ? (
                <ul>
                    <OptGroupContext.Provider value={{ disabled }}>
                        {children}
                    </OptGroupContext.Provider>
                </ul>
            ) : null}
        </li>
    );
}

export default memo(OptGroup);
