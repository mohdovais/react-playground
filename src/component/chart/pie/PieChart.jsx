import React from 'react';
import DonutPie from './DonutPie.jsx';
import Centre from './Centre.jsx';
import Label from './Label.jsx';
import {
    getInitialState,
    calculateAngles,
    getNextAnimationState,
} from './util.js';
import './PieChart.css';

export default class PieChart extends React.PureComponent {
    constructor(props) {
        super(props);

        const me = this;
        me.state = getInitialState(calculateAngles(props.data));
        me.onSelect = me.onSelect.bind(me);
        me.animate = me.animate.bind(me);
    }

    componentDidMount() {
        this.animate(0);
    }

    render() {
        const { dimension, donut } = this.props;
        const { data, discColor } = this.state;
        const radius = dimension / 2;

        return (
            <svg
                width={dimension}
                height={dimension}
                viewBox={`-${radius} -${radius} ${dimension} ${dimension}`}
            >
                {data.map(item => (
                    <DonutPie
                        label={'value is ' + item.value}
                        key={'pie' + item.id}
                        id={item.id}
                        cx={0}
                        cy={0}
                        radius={radius * 0.8}
                        fill={item.color}
                        startAngle={item.animStartAngle}
                        endAngle={item.animEndAngle}
                        donut={donut}
                        highlight={item.highlight === true}
                        onSelect={this.onSelect}
                    />
                ))}
                <Centre
                    cx="0"
                    cy="0"
                    radius={donut * radius * 0.8}
                    fill={discColor}
                    text="Hello World"
                />
                {data.map(item => (
                    <Label
                        text={'value is ' + item.value}
                        key={'label' + item.id}
                        cx={0}
                        cy={0}
                        radius={radius * 0.8}
                        startAngle={item.animStartAngle}
                        endAngle={item.animEndAngle}
                        donut={donut}
                    />
                ))}
            </svg>
        );
    }

    animate() {
        const me = this;
        const state = me.state;

        if (state.animAngle < state.maxAngle) {
            requestAnimationFrame(me.animate);
        }

        me.setState(getNextAnimationState);
    }

    onSelect(event) {
        const index = event.target.getAttribute('data-id') | 0;
        const selected = this.state.data[index];

        if (selected.highlight !== true) {
            this.setState(state =>
                Object.assign({}, state, {
                    data: state.data.map(item => {
                        if (item === selected) {
                            return Object.assign({}, item, {
                                highlight: true,
                            });
                        } else if (item.highlight) {
                            return Object.assign({}, item, {
                                highlight: false,
                            });
                        } else {
                            return item;
                        }
                    }),
                })
            );
        }
    }
}
