/* eslint-disable linebreak-style */
import { getRates, getCurrencies } from './exchange.js';

function statusShowing() {
  // eslint-disable-next-line no-multi-assign
  const $status = document.querySelector('#Rates tbody').innerHTML = 'Loading...';
  return $status;
}


function getSelectedCurrency() {
  const $activeCurrency = document.querySelector('.dropdown-item.active');
  if ($activeCurrency) {
    return document.querySelector('.dropdown-item.active').dataset.baseCurrency;
  }
  return undefined;
}

function getSelectedDate() {
  const $dateSelected = document.querySelector('#date-input').value;
  return $dateSelected || undefined;
}

function showCurrencyRates(currencyRates) {
  const $currencyRates = document.querySelector('#Rates tbody');
  $currencyRates.innerHTML = '';

  Object.keys(currencyRates).forEach((currency) => {
    const $row = document.createElement('tr');
    const $currency = document.createElement('td');
    const $currencyRate = document.createElement('td');
    $currency.textContent = currency;
    $currencyRate.textContent = currencyRates[currency];
    $row.appendChild($currency);
    $row.appendChild($currencyRate);
    $currencyRates.appendChild($row);
  });
}

async function updateData() {
  statusShowing();
  const currencyRates = await getRates(getSelectedCurrency(), getSelectedDate());
  showCurrencyRates(currencyRates);
}

function configureInputDate() {
  const $date = document.querySelector('#date-input');
  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  const month = (`0${todaysDate.getMonth() + 1}`).slice(-2);
  const day = (`0${todaysDate.getDate()}`).slice(-2);
  const maxDate = (`${year}-${month}-${day}`);
  $date.setAttribute('max', maxDate);
  $date.addEventListener('change', updateData);
}

function listOfCurrencies(currency) {
  const $list = document.querySelector('.dropdown-menu dropdown-menu-lg-right');
  currency.forEach((baseCurrency) => {
    const $item = document.createElement('button');
    $item.classList.add('dropdown-item');
    $item.textContent = baseCurrency;
    $item.dataset.baseCurrency = baseCurrency;
    $item.addEventListener('click', () => {
      const $activeElement = document.querySelector('.dropdown-item.active');
      if ($activeElement) {
        $activeElement.classList.remove('active');
      }
      $item.classList.add('active');
      updateData();
    });
    $list.appendChild($item);
  });
}

async function setUp() {
  const currencies = await getCurrencies();
  listOfCurrencies(currencies);
  configureInputDate();
}

setUp();
