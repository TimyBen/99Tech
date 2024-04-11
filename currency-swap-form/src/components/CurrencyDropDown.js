import React from 'react';

const CurrencyDropDown = ({ currencies, selectedCurrency, onChange }) => {
    return (
        <select value={selectedCurrency} onChange={onChange}>
            {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
            ))}
        </select>
    );
}

export default CurrencyDropDown;
