import React from 'react';
import Combobox from '../packages/combobox';

const veggies = [
    {
        text: 'Apple',
        value: 'apple',
    },
    {
        text: 'Orange',
        value: 'orange',
    },
    {
        text: 'Banana',
        value: 'banana',
    },
];

export function Application() {
    return <Combobox label="Fruit or Vegtable" value="123" data={veggies} />;
}
