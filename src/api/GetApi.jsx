import axios from 'axios';

let API_KEY = process.env.VITE_EXCHANGE_RATE_API_KEY;
API_KEY = API_KEY.replace(/"/g, '');

const axiosInstance = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${API_KEY}`,
});

const CurrencyOptions = async () => {
  try {
    const res = await axiosInstance.get('/latest/USD');
    return res.data.conversion_rates;
  } catch (error) {
    console.error('Error fetching currency options:', error);
    throw error;
  }
};

const ExchangeAmount = async (fromCurrency, toCurrency, amount) => {
  try {
    const res = await axiosInstance.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
    return res.data.conversion_result;
  } catch (error) {
    console.error('Error exchanging amount:', error);
    throw error;
  }
};

export default {
  CurrencyOptions,
  ExchangeAmount,
};