import React from 'react';

function Centre(props) {
    return (
        <g>
            <circle
                cx={props.cx}
                cy={props.cy}
                r={props.radius}
                fill={props.fill}
            />
            <text x={props.cx} y={props.cy} textAnchor="middle">
                {props.text}
            </text>
        </g>
    );
}

export default React.memo(Centre);
