import React, { useState } from 'react';
import { fetchStockDetails } from '../services/api';
import { StockData } from '../types';
import StockDetails from '../components/StockDetails';
import TradeForm from '../components/TradeForm';

const SearchPage: React.FC = () => {
    const [symbol, setSymbol] = useState('');
    const [stock, setStock] = useState<StockData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        setStock(null);
        setError(null);

        if (!symbol.trim()) {
            setError('Please enter a stock symbol.');
            return;
        }

        try {
            const data = await fetchStockDetails(symbol);
            setStock(data);
        } catch (err) {
            setError('Failed to fetch stock data. Please check the symbol and try again.');
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Search for Stock Data</h1>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Enter stock symbol (e.g., RELIANCE)"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    className="border p-2 flex-1"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2"
                >
                    Search
                </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {stock && (
                <div>
                    <StockDetails stock={stock} />
                    <TradeForm symbol={stock.symbol} currentPrice={stock.price} />
                </div>
            )}
        </div>
    );
};

export default SearchPage;
