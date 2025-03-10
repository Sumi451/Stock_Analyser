import React from 'react';
import { StockData } from '../types';
import StockChart from './StockChart';

const StockDetails: React.FC<{ stock: StockData }> = ({ stock }) => {
    const isPositive = stock.change.startsWith('+');

    return (
        <div className="p-4 border rounded-lg shadow bg-white">
            <h2 className="text-2xl font-bold mb-2">{stock.symbol}</h2>
            <p className="text-gray-500">Price: {stock.price}</p>
            <p className={isPositive ? 'text-green-500' : 'text-red-500'}>
                Change: {stock.change}
            </p>

            <h3 className="mt-4 text-lg font-semibold">Price Charts</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
                {Object.entries(stock.graphs).map(([period, base64Img]) => (
                    <div key={period} className="border p-2">
                        <h4 className="text-sm font-medium">{period}</h4>
                        <StockChart base64Img={base64Img} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockDetails;
