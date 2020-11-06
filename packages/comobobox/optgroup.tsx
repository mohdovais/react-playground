import React, { memo, Children, isValidElement, useMemo } from '../utils/react';
import { OptGroupContext } from './context';
import Option from './option';
import {
    option_group as $option_group,
    option_group_label as $option_group_label,
} from './style.module.css';

export interface OptGroupProps {
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    label: string;
    children: any;
}

function OptGroup(props: OptGroupProps) {
    const { className = '', style, label, disabled = false } = props;
    const children = useMemo(
        () =>
            Children.toArray(props.children).filter(
                (child: React.ReactNode) =>
                    isValidElement(child) && child.type === Option
            ),
        [props.children]
    );

    return (
        <li className={$option_group + ' ' + className} style={style}>
            <label
                className={$option_group_label + (disabled ? ' disabled' : '')}>
                {label}
            </label>
            {children.length > 0 ? (
                <OptGroupContext.Provider value={{ disabled }}>
                    <ul>{children}</ul>
                </OptGroupContext.Provider>
            ) : null}
        </li>
    );
}

export default memo(OptGroup);
