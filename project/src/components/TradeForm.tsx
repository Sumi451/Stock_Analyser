import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

interface TradeFormProps {
  symbol: string;
  currentPrice: string | number; // Accept formatted price with ₹
}

const TradeForm: React.FC<TradeFormProps> = ({ symbol, currentPrice }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const { user, buyStock, sellStock } = useUser();

  // Extract numeric value from formatted price
  const price = typeof currentPrice === "string" ? parseFloat(currentPrice.replace(/[^0-9.]/g, "")) : currentPrice;

  const maxAffordableShares = user ? Math.floor(user.balance / price) || 1 : 1; // Ensure valid number
  const totalValue = quantity * price;
  
  const currentHolding = user?.portfolio.find(stock => stock.symbol === symbol);
  const sharesOwned = currentHolding?.quantity || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (action === 'buy') {
      buyStock(symbol, quantity, price);
    } else {
      sellStock(symbol, quantity, price);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Trade {symbol}</h3>
      
      <div className="flex space-x-2 mb-6">
        <button
          className={`flex-1 py-2 rounded-md ${action === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setAction('buy')}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-2 rounded-md ${action === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setAction('sell')}
          disabled={sharesOwned === 0}
        >
          Sell
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Current Price</label>
          <div className="bg-gray-100 p-3 rounded-md">
            <span className="font-bold">₹{price.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            id="quantity"
            min={1}
            max={action === 'buy' ? maxAffordableShares : sharesOwned}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {action === 'buy' && (
            <p className="text-sm text-gray-500 mt-1">Max affordable: {maxAffordableShares} shares</p>
          )}
          {action === 'sell' && (
            <p className="text-sm text-gray-500 mt-1">Shares owned: {sharesOwned}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Total Value</label>
          <div className="bg-gray-100 p-3 rounded-md">
            <span className="font-bold">₹{totalValue.toLocaleString()}</span>
          </div>
        </div>
        
        <button
          type="submit"
          className={`w-full py-3 rounded-md font-bold ${
            action === 'buy' 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          disabled={(action === 'buy' && totalValue > (user?.balance || 0)) || 
                  (action === 'sell' && quantity > sharesOwned)}
        >
          {action === 'buy' ? 'Buy' : 'Sell'} {symbol}
        </button>
      </form>
    </div>
  );
};

export default TradeForm;
