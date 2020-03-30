import React from 'react';
import DonutPies from './DonutPies.jsx.js';
import Centre from './Centre.jsx.js';
import Labels from './Labels.jsx.js';
import './PieChart.css';
import { getAngles } from './util.js.js';
import { getRandomColor } from '../../../util/color.js';

function PieChart(props) {
    const { dimension, onSelect } = props;
    const halfDimension = dimension / 2;
    const radius = halfDimension * 0.8;

    const donut = props.donut === undefined ? 0 : props.donut;
    const data = getAngles(props.data === undefined ? [] : props.data);

    return (
        <svg
            width={dimension}
            height={dimension}
            viewBox={`-${halfDimension} -${halfDimension} ${dimension} ${dimension}`}>
            <DonutPies
                data={data}
                cx={0}
                cy={0}
                radius={radius}
                donut={donut}
                onSelect={onSelect}
            />
            <Centre
                cx="0"
                cy="0"
                radius={donut * radius}
                fill={getRandomColor()}
                text="Hello World"
            />
            <Labels
                data={data}
                cx={0}
                cy={0}
                radius={((1 + donut) * radius) / 2}
                donut={donut}
            />
        </svg>
    );
}

export default React.memo(PieChart);
