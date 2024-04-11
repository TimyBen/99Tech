import React, { useState, useEffect } from 'react';
import CurrencyDropdown from './CurrencyDropDown';
import InputField from './InputField';
import ApiService from '../services/ApiService';

const CurrencySwapForm = () => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [result, setResult] = useState(null);
    const [allCurrencies, setAllCurrencies] = useState([]);

    useEffect(() => {
        async function fetchAllCurrencies() {
            try {
                const response = await fetch('https://interview.switcheo.com/prices.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAllCurrencies(data);
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        }

        fetchAllCurrencies();
    }, []);

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    }

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
    }

    const handleAmountChange = (newValue) => {
        setAmount(newValue);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fromCurrency || !toCurrency || !amount) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            // Fetch token prices
            const Prices = await ApiService.getTokenPrices();
            const tokenPrices = Object.values(Prices);

            console.log("token prices:", tokenPrices);

            // Find the price for the selected fromCurrency
            const fromPrice = tokenPrices.find(price => price.currency === fromCurrency)?.price;
            // Find the price for the selected toCurrency
            const toPrice = tokenPrices.find(price => price.currency === toCurrency)?.price;

            console.log("fromPrice:", fromPrice);
            console.log("toPrice:", toPrice);

            if (!fromPrice || !toPrice) {
                setErrorMessage('Exchange rate not available for selected currencies.');
                return;
            }

            const fromAmount = parseFloat(amount);
            const toAmount = (fromAmount / fromPrice) * toPrice;

            // Update result state
            setResult(`${fromAmount} ${fromCurrency} = ${toAmount.toFixed(2)} ${toCurrency}`);
            setErrorMessage('');
        } catch (error) {
            console.error('Error performing currency swap calculation:', error);
            setErrorMessage('Failed to perform currency swap calculation.');
        }
    }

    return (
        <div>
            <ul>
                {allCurrencies.map((currency, index) => (
                    <li key={index}>
                        {/* Use the SVG image for the currency */}
                        <img className='bg-red' src={`assets/token-icons/${currency.currency}.svg`} alt={currency.currency} width="24" height="24" />
                        {/* Display the currency symbol and price */}
                        {currency.currency}: {currency.price}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <CurrencyDropdown currencies={allCurrencies.map(currency => currency.currency)} selectedCurrency={fromCurrency} onChange={handleFromCurrencyChange} />
                <InputField value={amount} onChange={handleAmountChange} />
                <CurrencyDropdown currencies={allCurrencies.map(currency => currency.currency)} selectedCurrency={toCurrency} onChange={handleToCurrencyChange} />
                <button type="submit">Swap</button>
                {errorMessage && <p>{errorMessage}</p>}
                {result && <p>{result}</p>}
            </form>
        </div>
    );
}

export default CurrencySwapForm;
