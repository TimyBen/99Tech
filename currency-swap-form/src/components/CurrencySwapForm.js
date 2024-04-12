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

    // Filter out duplicate currencies
    const uniqueCurrencies = [...new Set(allCurrencies.map(currency => currency.currency))];

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
        <div className='flex justify-center items-center pt-4 flex-col bg-stone-600'>
            {/* <div className='border border-e-indigo-800 w-92 h-92'>dsdd</div> */}
            <div className='flex justify-center uppercase ext-center p-4 w-full h-32 font-extrabold text-5xl'>
                <h1 className='w-fit hh-full p-4 font-serif text-center text-white'> Currrency Swap Form </h1>
            </div>
            <form className='flex justify-center items-center gap-10 border-2 border-green-400 h-24 w-[75%] rounded-xl' onSubmit={handleSubmit}>
                <CurrencyDropdown currencies={uniqueCurrencies} selectedCurrency={fromCurrency} onChange={handleFromCurrencyChange} />
                <InputField value={amount} onChange={handleAmountChange} />
                <CurrencyDropdown currencies={uniqueCurrencies} selectedCurrency={toCurrency} onChange={handleToCurrencyChange} />
                <button className="w-32 px-4 py-2  text-white bg-stone-700 text-2xl font-serif border rounded-md hover:bg-opacity-20  transition duration-200 ease-in-out" type="submit">
                    Swap
                </button>
            </form>
            {errorMessage && <div className='font-serif py-4  font-bold text-2xl leading-12 text-gray-900'><p>{errorMessage}</p></div>}
            {result && <div className='font-serif py-4  font-bold text-2xl leading-12 text-gray-200'><p>Exchange : {result}</p></div>}

            <div className='pt-8 text-xl font-serif font-bold'>
                <h1>Available Currencies</h1>
            </div>
            <table className='border-collapse borde border-x-cyan-950 mt-4 w-[50%] text-gray-300'>
                <thead>
                    <tr>
                        <th className='border border-x-cyan-950 px-4 py-2 text-left'>Currency</th>
                        <th className='border border-x-cyan-950 px-4 py-2 text-left'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {allCurrencies
                        // Remove duplicates based on currency name
                        .filter((currency, index, self) =>
                            index === self.findIndex((c) => c.currency === currency.currency)
                        )
                        .map((currency, index) => (
                            <tr key={index}>
                                <td className='border border-x-cyan-950 px-4 py-2 font-semibold'>{currency.currency}</td>
                                <td className='border border-x-cyan-950 px-4 py-2'>{currency.price}</td>
                            </tr>
                        ))}
                </tbody>
            </table>


        </div>
    );
}

export default CurrencySwapForm;
