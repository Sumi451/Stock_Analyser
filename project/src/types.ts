export interface User {
  id: string;
  name: string;
  balance: number;
  portfolio: StockHolding[];
  transactions: Transaction[];
}

export interface StockHolding {
  symbol: string;
  quantity: number;
  averageBuyPrice: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  type: 'buy' | 'sell';
  timestamp: number;
}

export interface StockData {
  symbol: string;
  price: string;
  change: string;
  graphs: {
    [key: string]: string;
  };
}

export interface PopularStock {
  symbol: string;
  price: string;
  change: string;
}

