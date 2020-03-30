import React from 'react';
import { MATH, radian } from '../../../util/math.js';

function Label(props) {
    return (
        <text
            x={props.cx + props.radius * MATH.cos(props.angle)}
            y={props.cy + props.radius * MATH.sin(props.angle)}
            textAnchor="middle">
            {props.text}
        </text>
    );
}

export default React.memo(Label);
