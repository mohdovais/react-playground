import React from 'react';
import { MATH, radian } from './../../../util/math.js';

function Label(props) {
    const angle = radian((props.endAngle + props.startAngle) / 2);
    const radius = ((1 + props.donut) * props.radius) / 2;
    return (
        <text
            x={props.cx + radius * MATH.cos(angle)}
            y={props.cy + radius * MATH.sin(angle)}
            textAnchor="middle"
        >
            {props.text}
        </text>
    );
}

export default React.memo(Label);
