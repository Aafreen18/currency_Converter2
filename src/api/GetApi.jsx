import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_RATE_API_KEY}`, 
});

const CurrencyOptions = async () => {
  const res = await axiosInstance.get('/latest/USD');
  return res.data.conversion_rates;
};

const ExchangeAmount = async (fromCurrency, toCurrency, amount) => {
  const res = await axiosInstance.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
  return res.data.conversion_result;
};

export default {
  CurrencyOptions,
  ExchangeAmount,
};