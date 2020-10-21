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
    const [remoteData, setRemoteData] = useState([]);

    useEffect(() => {
        fetch('/data/countries.json')
            .then((response) => response.json())
            .then(setCountries);
    }, []);

    return (
        <div>
            <h5>Normal</h5>
            <Combobox data={countries} displayField="name" />
            <h5>Read Only</h5>
            <Combobox readOnly data={countries} displayField="name" />
            <h5>Disabled</h5>
            <Combobox disabled data={countries} displayField="name" />
            <h5>Search</h5>
            <Combobox
                data={remoteData}
                displayField="name"
                queryMode="remote"
                onRemoteQuery={function (query: string) {
                    return Array.from(query).map((name, index) => ({
                        name,
                        index,
                    }));
                }}
                hideTrigger
            />
        </div>
    );
}
