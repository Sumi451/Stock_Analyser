import React, { useState } from 'react';
import { User, Settings, HelpCircle, RefreshCw } from 'lucide-react';
import { useUser } from '../context/UserContext';

const ProfilePage: React.FC = () => {
  const { user, resetPortfolio } = useUser();
  const [username, setUsername] = useState(user?.name || 'Trader');
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const handleResetPortfolio = () => {
    if (window.confirm('Are you sure you want to reset your portfolio? This will clear all your holdings and transactions and reset your balance to $100,000.')) {
      resetPortfolio();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-600">Manage your account settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <User className="h-12 w-12 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">Virtual Trader</p>
              
              <div className="w-full mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Account Balance</span>
                  <span className="font-medium">₹{user.balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Portfolio Holdings</span>
                  <span className="font-medium">{user.portfolio.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Transactions</span>
                  <span className="font-medium">{user.transactions.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-xl font-bold">Account Settings</h3>
            </div>
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled
              />
              <p className="text-sm text-gray-500 mt-1">Name editing is disabled in this demo</p>
            </div>
            
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Save Changes
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <RefreshCw className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-xl font-bold">Reset Portfolio</h3>
            </div>
            
            <p className="text-gray-700 mb-4">
              This will reset your virtual balance to ₹100,000 and clear all your holdings and transaction history.
              This action cannot be undone.
            </p>
            
            <button
              onClick={handleResetPortfolio}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Reset Portfolio
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <HelpCircle className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-xl font-bold">About This App</h3>
            </div>
            
            <p className="text-gray-700 mb-4">
              This is a virtual stock trading platform designed for learning and practicing stock market trading
              without risking real money. The stock data is fetched from your Amazon EC2 hosted API.
            </p>
            
            <p className="text-gray-700">
              Use this platform to develop your trading strategies, understand market movements, and gain
              confidence before investing real money in the stock market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;