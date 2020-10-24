import React from 'react';
import { memo } from '../packages/utils/react';
import { Country } from './Application';
import {
    wrapper as $wrapper,
    flag as $flag,
    details as $details,
    capital as $capital
} from './option-country.module.css';

type CountryOptionProps = {
    country: Country;
};

export function CountryOption({ country }: CountryOptionProps) {
    return (
        <div className={$wrapper}>
            <img src={country.flag} className={$flag} />
            <div className={$details}>
                <div>{country.name}</div>
                <div className={$capital}>{country.capital}</div>
            </div>
        </div>
    );
}

export default memo(CountryOption);
