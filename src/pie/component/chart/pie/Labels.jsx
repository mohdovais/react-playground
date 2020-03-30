import React from 'react';
import Label from './Label.jsx.js';
import { radian } from '../../../util/math.js';

function Labels(props) {
    return (
        <g>
            {props.data.map((item, index) => (
                <Label
                    key={index}
                    text={item.value}
                    cx={props.cx}
                    cy={props.cy}
                    radius={props.radius}
                    angle={radian((item.endAngle + item.startAngle) / 2)}
                />
            ))}
        </g>
    );
}

export default React.memo(Labels);
