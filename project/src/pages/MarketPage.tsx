
import { useEffect, useState } from "react";
import { fetchHomeStocks } from "../services/api";
import StockCard from "../components/StockCard";

function MarketPage() {
    const [stocks, setStocks] = useState<any[]>([]);

    useEffect(() => {
        fetchHomeStocks().then(setStocks).catch(console.error);
    }, []);

    return (
        <div>
            <h1>Market Overview</h1>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">  
                {stocks.map(stock => <StockCard key={stock.symbol} stock={stock} />)}
            </div>
        </div>
    );
}

export default MarketPage;
