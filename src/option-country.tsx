import * as React from 'react';
import { memo } from '../packages/utils/react';
import { Country } from './Application';
import {
    wrapper as $wrapper,
    flag as $flag,
    details as $details,
    capital as $capital,
} from './option-country.module.css';

type CountryOptionProps = {
    record: Country;
    selected: boolean;
};

export function CountryOption({ record, selected }: CountryOptionProps) {
    return (
        <div className={$wrapper}>
            <img src={record.flag} className={$flag} />
            <div className={$details}>
                <div>{record.name}</div>
                <div className={$capital}>{record.capital}</div>
            </div>
        </div>
    );
}

export default memo(CountryOption);
