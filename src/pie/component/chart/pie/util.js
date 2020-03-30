import { getRandomColor } from '../../../util/color.js';
import { MATH, sum } from '../../../util/math.js';

export function getAngles(data) {
    const total = sum.apply(null, data);
    let startAngle = 0;

    return data.map(value => {
        return {
            value,
            startAngle,
            endAngle: (startAngle += (value * 360) / total),
            color: getRandomColor(),
        };
    });
}

export function calculateAngles(data) {
    const total = sum.apply(null, data);
    let startAngle = 0;

    return data.map((value, i) => {
        const angle = (value * 360) / total;
        return {
            id: i,
            value,
            startAngle,
            endAngle: (startAngle += angle),
            animStartAngle: 0,
            animEndAngle: 0,
            color: getRandomColor(),
        };
    });
}

export function getInitialState(data) {
    return {
        data,
        discColor: getRandomColor(),
        animAngle: 1,
        maxAngle: MATH.max.apply(
            MATH,
            data.map(pie => pie.endAngle - pie.startAngle)
        ),
    };
}

export function getNextAnimationState(state) {
    const animAngle = state.animAngle * 1.5;
    let _animStartAngle = 0;

    return Object.assign({}, state, {
        animAngle,
        data: state.data.map(pie => {
            const animStartAngle = _animStartAngle;
            const animEndAngle =
                animStartAngle +
                MATH.min(animAngle, pie.endAngle - pie.startAngle);

            _animStartAngle = animEndAngle;

            return Object.assign({}, pie, {
                animStartAngle,
                animEndAngle,
            });
        }),
    });
}
