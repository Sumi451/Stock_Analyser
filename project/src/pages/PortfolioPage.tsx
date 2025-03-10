import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useUser } from '../context/UserContext';

// Mock current prices for demonstration
const mockCurrentPrices: Record<string, number> = {
  'RELIANCE': 2750.45,
  'TCS': 3456.70,
  'HDFCBANK': 1678.30,
  'INFY': 1456.80,
  'ICICIBANK': 945.60,
  'HINDUNILVR': 2567.40,
  'SBIN': 567.80,
  'BAJFINANCE': 7890.25,
  'BHARTIARTL': 876.45,
  'KOTAKBANK': 1789.65,
};

const PortfolioPage: React.FC = () => {
  const { user, resetPortfolio } = useUser();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const portfolioValue = user.portfolio.reduce((total, holding) => {
    const currentPrice = mockCurrentPrices[holding.symbol] || holding.averageBuyPrice;
    return total + (holding.quantity * currentPrice);
  }, 0);
  
  const totalInvestment = user.portfolio.reduce((total, holding) => {
    return total + (holding.quantity * holding.averageBuyPrice);
  }, 0);
  
  const totalProfitLoss = portfolioValue - totalInvestment;
  const profitLossPercentage = totalInvestment > 0 
    ? (totalProfitLoss / totalInvestment) * 100 
    : 0;
  
  const handleResetPortfolio = () => {
    if (window.confirm('Are you sure you want to reset your portfolio? This will clear all your holdings and transactions and reset your balance to $100,000.')) {
      resetPortfolio();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Portfolio</h1>
          <p className="text-gray-600">Track your investments and performance</p>
        </div>
        <button
          onClick={handleResetPortfolio}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Reset Portfolio
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 font-medium mb-2">Portfolio Value</h3>
          <p className="text-3xl font-bold">₹{portfolioValue.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 font-medium mb-2">Available Cash</h3>
          <p className="text-3xl font-bold">₹{user.balance.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 font-medium mb-2">Total P&L</h3>
          <div className="flex items-center">
            <p className={`text-3xl font-bold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{Math.abs(totalProfitLoss).toLocaleString()}
            </p>
            <div className={`ml-2 flex items-center ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalProfitLoss >= 0 ? (
                <ArrowUpRight className="h-5 w-5 mr-1" />
              ) : (
                <ArrowDownRight className="h-5 w-5 mr-1" />
              )}
              <span className="font-medium">{Math.abs(profitLossPercentage).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
      
      {user.portfolio.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <TrendingUp className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your portfolio is empty</h2>
          <p className="text-gray-600 mb-6">Start trading to build your portfolio</p>
          <Link to="/" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium">
            Explore Stocks
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Buy Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P&L
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user.portfolio.map((holding) => {
                const currentPrice = mockCurrentPrices[holding.symbol] || holding.averageBuyPrice;
                const currentValue = holding.quantity * currentPrice;
                const investmentValue = holding.quantity * holding.averageBuyPrice;
                const profitLoss = currentValue - investmentValue;
                const profitLossPercentage = (profitLoss / investmentValue) * 100;
                
                return (
                  <tr key={holding.symbol} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/stock/${holding.symbol}`} className="text-indigo-600 hover:text-indigo-900 font-medium">
                        {holding.symbol}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {holding.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{holding.averageBuyPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{currentPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      ₹{currentValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {profitLoss >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <span className="font-medium">₹{Math.abs(profitLoss).toLocaleString()}</span>
                        <span className="ml-1 text-sm">({Math.abs(profitLossPercentage).toFixed(2)}%)</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;