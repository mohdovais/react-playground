import React, { useState, useEffect } from '../utils/react';
import { win, addEventListener, removeEventListener } from '../utils/dom';

const displayNone = {
    display: 'none',
};

function getPosition(el: HTMLDivElement | null): React.CSSProperties {
    if (el == null) {
        return displayNone;
    }
    const viewportHeight = win.innerHeight;
    const { top, bottom, height } = el.getBoundingClientRect();

    if (top < 0 || top > viewportHeight) {
        return displayNone;
    }

    const bottomSpace = viewportHeight - bottom;

    if (top < bottomSpace) {
        return {
            top: height,
            maxHeight: viewportHeight - bottom - 5,
        };
    }

    return {
        bottom: height,
        maxHeight: top - 5,
    };
}

export function usePickerPosition(
    ref: React.RefObject<HTMLDivElement>,
    calculate: boolean
) {
    const current = ref.current;
    const [postion, setPosition] = useState(() => getPosition(current));

    useEffect(() => {
        let busy = false;
        function doCalculate() {
            if (calculate && !busy) {
                busy = true;
                win.requestAnimationFrame(() => {
                    setPosition(getPosition(current));
                    busy = false;
                });
            }
        }
        addEventListener('resize', doCalculate);
        addEventListener('scroll', doCalculate);

        if (calculate) {
            doCalculate();
        } else {
            setPosition(displayNone);
        }

        return () => {
            removeEventListener('resize', doCalculate);
            removeEventListener('scroll', doCalculate);
        };
    }, [calculate, current]);

    return postion;
}
