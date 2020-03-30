const regex_aria_prop = /^aria-/;
export const ariaProps = (props) =>
    Object.keys(props).reduce((accum, propName) => {
        if (regex_aria_prop.test(propName)) {
            accum[propName] = props[propName];
        }
        return accum;
    }, {});
