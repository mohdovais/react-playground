import * as React from 'react';
import { useState, useEffect, useCallback } from '../packages/utils/react';
import Combobox, { Option, OptGroup } from '../packages/comobobox';
import {
    combobox as $combobox,
    optgroup as $optgroup,
    option as $option,
} from './Application.module.css';

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

    useEffect(() => {
        fetch('data/countries.json')
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

    const regions = countries.reduce(function (accum, country) {
        const region = country.region;
        if (!accum[region]) {
            accum[region] = [];
        }
        accum[region].push(country);
        return accum;
    }, {});

    return (
        <div>
            <Combobox onChange={console.log} className={$combobox}>
                {Object.keys(regions).map((region) => (
                    <OptGroup
                        key={region}
                        label={region}
                        disabled={region === 'EU'}
                        className={$optgroup}>
                        {regions[region].map((country) => (
                            <Option
                                key={country.code}
                                value={country.code}
                                selected={
                                    country.name === 'India' ||
                                    country.name === 'Pakistan'
                                }
                                className={$option}>
                                {country.name}
                            </Option>
                        ))}
                    </OptGroup>
                ))}
            </Combobox>
            -<Combobox onChange={console.log} className={$combobox}></Combobox>-
            <Combobox onChange={console.log} className={$combobox}>
                <Option value="IN">India</Option>
            </Combobox>
            -
            <Combobox onChange={console.log} className={$combobox}>
                <Option value="IN">
                    In<span>d</span>ia
                </Option>
            </Combobox>
        </div>
    );
}
