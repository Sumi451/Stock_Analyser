import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StockHolding, Transaction } from '../types';

interface UserContextType {
  user: User | null;
  buyStock: (symbol: string, quantity: number, price: number) => void;
  sellStock: (symbol: string, quantity: number, price: number) => void;
  resetPortfolio: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const INITIAL_BALANCE = 100000; // $100,000 virtual currency

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user data from localStorage on component mount
    const savedUser = localStorage.getItem('stockAnalyzerUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Create a new user if none exists
      const newUser: User = {
        id: crypto.randomUUID(),
        name: 'Trader',
        balance: INITIAL_BALANCE,
        portfolio: [],
        transactions: []
      };
      setUser(newUser);
      localStorage.setItem('stockAnalyzerUser', JSON.stringify(newUser));
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('stockAnalyzerUser', JSON.stringify(user));
    }
  }, [user]);

  const buyStock = (symbol: string, quantity: number, price: number) => {
    if (!user) return;

    const totalCost = quantity * price;
    
    if (user.balance < totalCost) {
      alert('Insufficient funds for this transaction');
      return;
    }

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      symbol,
      quantity,
      price,
      type: 'buy',
      timestamp: Date.now()
    };

    // Update portfolio
    const existingHolding = user.portfolio.find(stock => stock.symbol === symbol);
    let updatedPortfolio: StockHolding[];

    if (existingHolding) {
      // Update existing holding
      const totalShares = existingHolding.quantity + quantity;
      const totalCostBasis = existingHolding.quantity * existingHolding.averageBuyPrice + totalCost;
      const newAverageBuyPrice = totalCostBasis / totalShares;

      updatedPortfolio = user.portfolio.map(stock => 
        stock.symbol === symbol 
          ? { ...stock, quantity: totalShares, averageBuyPrice: newAverageBuyPrice } 
          : stock
      );
    } else {
      // Add new holding
      updatedPortfolio = [
        ...user.portfolio,
        { symbol, quantity, averageBuyPrice: price }
      ];
    }

    setUser({
      ...user,
      balance: user.balance - totalCost,
      portfolio: updatedPortfolio,
      transactions: [...user.transactions, transaction]
    });
  };

  const sellStock = (symbol: string, quantity: number, price: number) => {
    if (!user) return;

    const holding = user.portfolio.find(stock => stock.symbol === symbol);
    
    if (!holding || holding.quantity < quantity) {
      alert('You do not own enough shares to sell');
      return;
    }

    const totalValue = quantity * price;
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      symbol,
      quantity,
      price,
      type: 'sell',
      timestamp: Date.now()
    };

    // Update portfolio
    let updatedPortfolio: StockHolding[];
    
    if (holding.quantity === quantity) {
      // Remove the holding entirely
      updatedPortfolio = user.portfolio.filter(stock => stock.symbol !== symbol);
    } else {
      // Reduce the quantity
      updatedPortfolio = user.portfolio.map(stock => 
        stock.symbol === symbol 
          ? { ...stock, quantity: stock.quantity - quantity } 
          : stock
      );
    }

    setUser({
      ...user,
      balance: user.balance + totalValue,
      portfolio: updatedPortfolio,
      transactions: [...user.transactions, transaction]
    });
  };

  const resetPortfolio = () => {
    const newUser: User = {
      ...user!,
      balance: INITIAL_BALANCE,
      portfolio: [],
      transactions: []
    };
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, buyStock, sellStock, resetPortfolio }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};