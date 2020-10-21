import { useState } from '../utils/react';
import { randomId } from '../utils/common';

export function useRandomId(prefix?: string) {
    const id = useState(() => randomId(prefix));
    return id[0];
}
