import * as React from 'react';
import { useState, useEffect } from '../packages/utils/react';
import Combobox from '../packages/combobox';

interface Language {
    code: string;
    name: string;
}

interface Currency {
    code: string;
    name: string;
    symbol: string;
}

interface Country {
    name: string;
    code: string;
    capital: string;
    region: string;
    currency: Currency;
    language: Language;
    flag: string;
}

export function Application() {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        fetch('/data/countries.json')
            .then((response) => response.json())
            .then(setCountries);
    }, []);
    return <Combobox data={countries} displayField="name" />;
}
