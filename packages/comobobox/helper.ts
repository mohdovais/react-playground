import React, { Children, isValidElement } from '../utils/react';
import OptGroup from './optgroup';
import Option from './option';

type Children = React.ReactElement | React.ReactElement[];

export function validateChildren(children?: Children) {
    return Children.toArray(children).filter(
        (child: React.ReactElement) =>
            isValidElement(child) &&
            (child.type === Option || child.type === OptGroup)
    );
}

function doGetValue(children: React.ReactElement[], values: any[]) {
    for (let i = 0, length = children.length; i < length; i++) {
        const child = children[i];
        if (child.type === Option) {
            const props = child.props;
            if (props.selected) {
                values.push(props.value);
            }
        } else if (child.type === OptGroup) {
            doGetValue(child.props.children, values);
        }
    }

    return values;
}

export function getChildrenValue(children: React.ReactElement[]) {
    return doGetValue(children, []);
}
