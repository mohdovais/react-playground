import React from 'react';
import DonutPie from './DonutPie.jsx.js';

function DonutPies(props) {
    return (
        <g>
            {props.data.map((item, index) => (
                <DonutPie
                    key={index}
                    cx={0}
                    cy={0}
                    radius={props.radius}
                    startAngle={item.startAngle}
                    endAngle={item.endAngle}
                    donut={props.donut}
                    fill={item.color}
                    highlight={item.highlight === true}
                    onSelect={props.onSelect}
                />
            ))}
        </g>
    );
}

export default React.memo(DonutPies);
