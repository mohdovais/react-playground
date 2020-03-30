import React from 'react';

function animate() {}

export default class Animator extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { duration, animate, children, data } = this.props;
        //const { count, setCount } = useState(0);
        return React.Children.map(children, function(element) {
            if (React.isValidElement(element)) {
                const { children, ...props } = element.props;
                return (
                    <element.type {...props} data={data}>
                        {animate}
                    </element.type>
                );
            }
        });
    }
}
