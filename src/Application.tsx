import * as React from 'react';
import { useState, useEffect } from '../packages/utils/react';
import Combobox from '../packages/combobox';

type Language = {
    code: string;
    name: string;
};

type Currency = {
    code: string;
    name: string;
    symbol: string;
};

type Country = {
    name: string;
    code: string;
    capital: string;
    region: string;
    currency: Currency;
    language: Language;
    flag: string;
};

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
                displayField="name"
                queryMode="remote"
                onRemoteQuery={function (query: string) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve(
                                Array.from(query).map((name, index) => ({
                                    name,
                                    index,
                                }))
                            );
                        }, 5000);
                    });
                }}
                hideTrigger
            />
        </div>
    );
}
