import * as React from 'react';
import { useState, useEffect, useCallback } from '../packages/utils/react';
import Combobox from '../packages/combobox';
import OptionCountry from './option-country';

type Language = {
    code: string;
    name: string;
};

type Currency = {
    code: string;
    name: string;
    symbol: string;
};

export type Country = {
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

    const remoteQuery = useCallback(
        function (query: string) {
            query = query.trim();
            if (query === '') return [];
            return new Promise<Country[]>(function (resolve, reject) {
                const re = new RegExp(query, 'i');
                const result = countries.filter((country) => {
                    return re.test(country.name) || re.test(country.capital);
                });
                resolve(result);
            });
        },
        [countries]
    );

    const optionRenderer = useCallback(function (country: Country) {
        return <OptionCountry country={country} />;
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
                onRemoteQuery={remoteQuery}
                optionRenderer={optionRenderer}
                hideTrigger
            />
        </div>
    );
}
