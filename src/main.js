import ReactDOM from 'react-dom';
import React from 'react';
//import PieChart from './svg/PieChart.jsx';
import PieChart from './component/chart/pie/PieChart.jsx';
import { MATH } from './util/math.js';

function random(a, b) {
    return MATH.round(a + MATH.random() * (b - a));
}

ReactDOM.render(
    <PieChart
        data={new Array(random(1, 15))
            .join(',')
            .split(',')
            .map(() => random(0, 100))}
        dimension={1024}
        donut={0.33}
    />,
    document.getElementById('root')
);
