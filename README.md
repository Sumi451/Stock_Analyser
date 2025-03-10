# 📈 Stock Analyzer Web App

A stock market analysis and virtual trading platform that allows users to track stock prices, view charts, and simulate trades using virtual currency.

## 🌟 Features
- 🔍 **Search & View Stocks**: Get real-time stock prices and historical data.
- 📊 **Interactive Charts**: View price trends for different timeframes.
- 💰 **Virtual Trading**: Buy and sell stocks using virtual currency.
- 🌐 **Real-Time Data**: Fetch live stock prices using Yahoo Finance.

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Python (Flask), Yahoo Finance API
- **Database**: LocalStorage (for virtual trading)

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/stock-analyzer.git
cd stock-analyzer
```

### 2️⃣ Backend Setup (Flask API)(This can be found on my Github page as Indian_Stock_Market_Scraper_api or similar name)
```sh
cd backend
pip install -r requirements.txt
python app.py  # Runs on http://localhost:5000
```

### 3️⃣ Frontend Setup (React)
```sh
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

## 📌 Usage Guide
1. **Search for a stock** to view its price and historical data.
2. **Click on a stock** to view details and trade options.
3. **Use Buy/Sell buttons** to trade using virtual currency.
4. **Track your portfolio** and simulate investments.

## 📡 API Endpoints
- `GET /home-stocks` → Fetches popular stocks.
- `GET /stock?symbol=AAPL` → Fetches stock details and charts.

## 📜 License
This project is open-source under the MIT License.

---

🎯 **Contributions & Feedback Welcome!** 🚀

