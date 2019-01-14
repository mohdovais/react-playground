import React from 'react';
import { getDonutPath } from './path.js';
import { MATH, radian } from './../../../util/math.js';

function getTransform(startAngle, endAngle) {
    const theta = radian(endAngle + startAngle) / 2;
    return `translate(${25 * MATH.cos(theta)},${25 * MATH.sin(theta)})`;
}

function DonutPie(props) {
    return (
        <g
            onClick={props.onSelect}
            transform={
                props.highlight
                    ? getTransform(props.startAngle, props.endAngle)
                    : null
            }
        >
            <path
                d={getDonutPath(
                    props.cx,
                    props.cy,
                    props.radius,
                    props.startAngle,
                    props.endAngle,
                    props.donut
                )}
                data-id={props.id}
                fill={props.fill}
                stroke="rgba(0,0,0,0.2)"
            />
        </g>
    );
}

export default React.memo(DonutPie);
