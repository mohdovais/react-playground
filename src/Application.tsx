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
    return (
        <div>
            <p>
                Nullam vel odio magna. Ut lacinia sit amet quam nec imperdiet.
                Quisque eget lacus non lectus consectetur rhoncus. Proin eget
                nunc neque. Mauris sed laoreet augue. Nullam a turpis blandit,
                fringilla enim vel, accumsan enim. Donec pretium elit eget
                posuere ornare. Etiam laoreet lorem elit, in mattis ipsum
                pharetra ac. Quisque viverra sem in dolor dignissim fringilla.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae.
            </p>
            <Combobox data={countries} displayField="name" />
            <p>
                Duis vel enim vel mi vulputate egestas vitae nec odio. Donec vel
                sem dolor. Sed scelerisque tristique velit, vitae ultricies
                risus tempus quis. Integer dignissim in est et laoreet. Praesent
                aliquet congue placerat. Nam dolor ante, eleifend eu finibus
                eget, posuere accumsan est. Integer ut molestie tortor. Proin
                mattis orci sit amet lectus sollicitudin, non dignissim nisi
                tincidunt. Nullam vel leo venenatis, molestie lectus convallis,
                tincidunt eros. Pellentesque habitant morbi tristique senectus
                et netus et malesuada fames ac turpis egestas. Nunc lorem enim,
                consectetur at mollis rhoncus, hendrerit quis nulla.
            </p>
        </div>
    );
}
