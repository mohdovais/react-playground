import React, { useState, useEffect } from '../utils/react';
import { win, addEventListener, removeEventListener } from '../utils/dom';
import { EVENT_RESIZE, EVENT_SCROLL } from './constant';

const none = {};

function getPosition(el: HTMLDivElement | null): React.CSSProperties {
    if (el == null) {
        return none;
    }
    const viewportHeight = win.innerHeight;
    const { top, bottom, height } = el.getBoundingClientRect();

    if (top < 0 || top > viewportHeight) {
        return none;
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
        addEventListener(EVENT_RESIZE, doCalculate);
        addEventListener(EVENT_SCROLL, doCalculate);

        if (calculate) {
            doCalculate();
        } else {
            setPosition(none);
        }

        return () => {
            removeEventListener(EVENT_RESIZE, doCalculate);
            removeEventListener(EVENT_SCROLL, doCalculate);
        };
    }, [calculate, current]);

    return postion;
}
