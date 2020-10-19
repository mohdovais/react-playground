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
    return (
        <Combobox
            value="123"
            data={veggies}
            optionRenderer={(record) => 'Fruit ' + record.text}
            displayRenderer={record => 'aaa' + record.value}
            query={(query:string)=> {}}
        />
    );
}
