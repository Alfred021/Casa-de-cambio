/* eslint-disable linebreak-style */
import { getRates, getCurrencies } from './exchange.js';
import {
  listOfCurrencies,
  configureInputDate,
  statusShowing,
  showCurrencyRates,
  getSelectedDate,
  getSelectedCurrency,
} from './ui.js';

export default async function updateData() {
  statusShowing();
  const currencyRates = await getRates(getSelectedCurrency(), getSelectedDate());
  showCurrencyRates(currencyRates);
}
async function setUp() {
  const currencies = await getCurrencies();
  listOfCurrencies(currencies);
  configureInputDate();
}

setUp();
