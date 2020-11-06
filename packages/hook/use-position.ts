import React, { useState, useEffect } from '../utils/react';
import { win, addEventListener, removeEventListener } from '../utils/dom';
import { EVENT_RESIZE, EVENT_SCROLL } from '../constant';

const none: React.CSSProperties = { display: 'none' };

function getPosition(el: HTMLElement | null, pre = none): React.CSSProperties {
    if (el == null) {
        return pre;
    }
    const viewportHeight = win.innerHeight;
    const viewportWidth = win.innerWidth;

    const { top, left, bottom, height, width } = el.getBoundingClientRect();

    if (top < 0 || top > viewportHeight || left < 0 || left > viewportWidth) {
        return pre;
    }

    const bottomSpace = viewportHeight - bottom;
    const rightSpace = viewportWidth - left;

    let style: React.CSSProperties = {
        position: 'absolute',
        width: 'max-content',
        minWidth: width,
    };

    if (top < bottomSpace) {
        style.top = height;
        style.maxHeight = Math.floor(viewportHeight - bottom - 5);
    } else {
        style.bottom = height;
        style.maxHeight = top - 5;
    }

    if (left < rightSpace) {
        style.left = 0;
        style.maxWidth = Math.floor(viewportWidth - left - 5);
    } else {
        style.right = 0;
        style.maxWidth = left - 5;
    }

    return style;
}

export function usePickerPosition(
    ref: React.RefObject<HTMLElement>,
    calculate = true
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
