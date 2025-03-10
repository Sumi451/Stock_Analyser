
const API_BASE_URL = "http://54.87.114.114:5000";  // Replace with actual EC2 IP

export async function fetchHomeStocks() {
    const response = await fetch(`${API_BASE_URL}/home-stocks`);
    return response.json();
}

export async function fetchStockDetails(symbol: string) {
    const response = await fetch(`${API_BASE_URL}/stock?symbol=${symbol}`);
    if(!response.ok) {
        throw new Error('Failed to fetch stock data');
    }
    return response.json();
}
