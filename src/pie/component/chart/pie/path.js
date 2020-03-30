import { MATH, round, radian } from '../../../util/math.js';

/**
 *
 * @param {Number} cx X coordinate of center of circle
 * @param {Number} cy Y coordinate of center of circle
 * @param {Number} radius Radius of circle
 * @param {Number} degree Angle in Degrees for seeking point
 * @returns {Object} {x,y} coordinates
 */
export function getArcPoint(cx, cy, radius, degree) {
    var theta = radian(degree);
    return {
        x: round(cx + radius * MATH.cos(theta), 2),
        y: round(cy + radius * MATH.sin(theta), 2),
    };
}

/**
 *
 * @param {Number} cx X coordinate of center of circle
 * @param {Number} cy Y coordinate of center of circle
 * @param {Number} radius Radius of circle
 * @param {Number} startDegree Arc start angle in Degrees
 * @param {Number} endDegree Arc end angle in Degrees
 * @returns {String} SVG path definition `d`
 */
export function getPiePath(cx, cy, radius, startDegree, endDegree) {
    var start = getArcPoint(cx, cy, radius, startDegree),
        end = getArcPoint(cx, cy, radius, endDegree),
        largeArcFlag = MATH.abs(endDegree - startDegree) > 180 ? 1 : 0,
        sweepFlag = 1,
        M = 'M ' + start.x + ' ' + start.y,
        A =
            'A ' +
            radius +
            ' ' +
            radius +
            ' 0 ' +
            largeArcFlag +
            ' ' +
            sweepFlag +
            ' ' +
            end.x +
            ' ' +
            end.y,
        L = 'L ' + cx + ' ' + cy;

    return M + A + L + 'Z';
}

export function getDonutPath(
    cx,
    cy,
    radius,
    startDegree,
    endDegree,
    donutRatio
) {
    const donut = round(
            radius * (donutRatio === undefined ? 0.5 : donutRatio),
            2
        ),
        a = getArcPoint(cx, cy, donut, startDegree),
        b = getArcPoint(cx, cy, donut, endDegree),
        d = getArcPoint(cx, cy, radius, startDegree),
        c = getArcPoint(cx, cy, radius, endDegree),
        largeArcFlag = MATH.abs(endDegree - startDegree) > 180 ? 1 : 0,
        //sweepFlag = 1,
        M = `M${a.x} ${a.y}`,
        A1 = `A${donut} ${donut} 0 ${largeArcFlag} 1 ${b.x} ${b.y}`,
        L1 = `L${c.x} ${c.y}`,
        A2 = `A${radius} ${radius} 0 ${largeArcFlag} 0 ${d.x} ${d.y}`,
        L2 = `L${a.x} ${a.y}`;

    return M + A1 + L1 + A2 + L2 + 'Z';
}
