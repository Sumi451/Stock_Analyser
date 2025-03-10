import { useNavigate } from "react-router-dom";

function StockCard({ stock }: { stock: any }) {
    const navigate = useNavigate();
    const isPositive = stock.change.startsWith("+");

    return (
        <div 
            className="p-4 border rounded-lg shadow hover:shadow-md cursor-pointer transition-transform hover:scale-105 bg-white"
            onClick={() => navigate(`/stock/${stock.symbol}`)}
        >
            <h3 className="text-xl font-bold">{stock.symbol}</h3>
            <p className="text-gray-600">Price: {stock.price}</p>
            <p className={isPositive ? "text-green-500" : "text-red-500"}>
                Change: {stock.change}
            </p>
        </div>
    );
}

export default StockCard;
