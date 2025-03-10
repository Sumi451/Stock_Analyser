import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart2, Briefcase, Clock, User, Search } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8" />
            <span className="text-xl font-bold">StockTrainer</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-800 px-4 py-2 rounded-lg">
              <span className="font-medium">Balance: </span>
              <span className="font-bold">${user?.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="flex items-center space-x-1 hover:text-indigo-200">
                <BarChart2 className="h-5 w-5" />
                <span>Market</span>
              </Link>
              <Link to="/portfolio" className="flex items-center space-x-1 hover:text-indigo-200">
                <Briefcase className="h-5 w-5" />
                <span>Portfolio</span>
              </Link>
              <Link to="/transactions" className="flex items-center space-x-1 hover:text-indigo-200">
                <Clock className="h-5 w-5" />
                <span>Transactions</span>
              </Link>
              <Link to="/profile" className="flex items-center space-x-1 hover:text-indigo-200">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <Link to="/search" className="flex items-center space-x-1 hover:text-indigo-200">
                <Search className="h-5 w-5" />
                <span>Search Stock</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
