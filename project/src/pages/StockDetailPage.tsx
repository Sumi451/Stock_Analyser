import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStockDetails } from '../services/api';
import StockDetails from '../components/StockDetails';
import { StockData } from '../types';
import TradeForm from '../components/TradeForm';

const StockDetailPage: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>();
    const [stock, setStock] = useState<StockData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (symbol) {
            fetchStockDetails(symbol)
                .then(setStock)
                .catch(() => setError(`Failed to fetch data for ${symbol}`));
        }
    }, [symbol]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!stock) {
        return <p>Loading stock data for {symbol}...</p>;
    }

    return (
        <div className="p-6">
            <StockDetails stock={stock} />
            <TradeForm symbol={stock.symbol} currentPrice={stock.price} />
        </div>
    );
};

export default StockDetailPage;
