import { useState } from "../utils/react";

export function useRandomId(prefix = "") {
    const id = useState(() => prefix + Math.round(Math.random() + Math.random() * 10e16).toString(32));
    return id[0];
}