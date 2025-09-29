// Local cache of popular stocks to reduce API calls
// This list can be expanded or fetched dynamically if needed
const symbols = [
  { "symbol": "AAPL", "name": "Apple Inc.", "exchange": "NASDAQ" },
  { "symbol": "MSFT", "name": "Microsoft Corp.", "exchange": "NASDAQ" },
  { "symbol": "GOOGL", "name": "Alphabet Inc.", "exchange": "NASDAQ" },
  { "symbol": "AMZN", "name": "Amazon.com Inc.", "exchange": "NASDAQ" },
  { "symbol": "TSLA", "name": "Tesla Inc.", "exchange": "NASDAQ" },
  { "symbol": "META", "name": "Meta Platforms Inc.", "exchange": "NASDAQ" },
  { "symbol": "NVDA", "name": "NVIDIA Corp.", "exchange": "NASDAQ" },
  { "symbol": "NFLX", "name": "Netflix Inc.", "exchange": "NASDAQ" },
  { "symbol": "ADBE", "name": "Adobe Inc.", "exchange": "NASDAQ" },
  { "symbol": "INTC", "name": "Intel Corp.", "exchange": "NASDAQ" },
  { "symbol": "AMD", "name": "Advanced Micro Devices Inc.", "exchange": "NASDAQ" },
  { "symbol": "PYPL", "name": "PayPal Holdings Inc.", "exchange": "NASDAQ" },
  { "symbol": "ORCL", "name": "Oracle Corp.", "exchange": "NYSE" },
  { "symbol": "CSCO", "name": "Cisco Systems Inc.", "exchange": "NASDAQ" },
  { "symbol": "CRM", "name": "Salesforce Inc.", "exchange": "NYSE" },
  { "symbol": "QCOM", "name": "Qualcomm Inc.", "exchange": "NASDAQ" },
  { "symbol": "AMAT", "name": "Applied Materials Inc.", "exchange": "NASDAQ" },
  { "symbol": "TXN", "name": "Texas Instruments Inc.", "exchange": "NASDAQ" },
  { "symbol": "BA", "name": "Boeing Co.", "exchange": "NYSE" },
  { "symbol": "V", "name": "Visa Inc.", "exchange": "NYSE" },
  { "symbol": "MA", "name": "Mastercard Inc.", "exchange": "NYSE" },
  { "symbol": "JNJ", "name": "Johnson & Johnson", "exchange": "NYSE" },
  { "symbol": "WMT", "name": "Walmart Inc.", "exchange": "NYSE" },
  { "symbol": "KO", "name": "Coca-Cola Co.", "exchange": "NYSE" },
  { "symbol": "DIS", "name": "The Walt Disney Co.", "exchange": "NYSE" },
  { "symbol": "PFE", "name": "Pfizer Inc.", "exchange": "NYSE" },
  { "symbol": "CVX", "name": "Chevron Corp.", "exchange": "NYSE" },
  { "symbol": "XOM", "name": "Exxon Mobil Corp.", "exchange": "NYSE" },
  { "symbol": "MCD", "name": "McDonald's Corp.", "exchange": "NYSE" },
  { "symbol": "NKE", "name": "Nike Inc.", "exchange": "NYSE" }
]

export default symbols;
