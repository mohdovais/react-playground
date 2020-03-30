import React from 'react';
import Lableable from '../labelable';
import ListBox from '../listbox';
import { combobox, combobox_wrapper } from './Combobox.module.scss';

export function Combobox(props) {
    const {
        label,
        value,
        data,
        displayField = 'text',
        valueField = 'value',
        queryMode = 'local',
        displayRenderer = false,
        itemRenderer = false,
    } = props;

    return (
        <Lableable
            label={label}
            inputId="ggg"
            className="comobox"
            role="combobox"
            aria-expanded="false"
            aria-owns="ex3-listbox"
            aria-haspopup="listbox">
            <div className={combobox_wrapper}>
                <div className={combobox}>
                    <input
                        type="text"
                        aria-autocomplete="both"
                        aria-controls="ex3-listbox"
                        aria-labelledby="ex3-label"
                        id="ggg"
                        aria-activedescendant=""
                    />
                    <button
                        type="button"
                        className="combobox-dropdown"
                        tabIndex="-1"
                        aria-label="Show vegetable options">
                        ▼
                    </button>
                </div>
                <ListBox
                    data={data}
                    displayField={displayField}
                    valueField={valueField}
                    itemRenderer={itemRenderer}
                />
            </div>
        </Lableable>
    );
}
