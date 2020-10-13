/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */

import updateData from './index.js';

export function statusShowing() {
  const $status = document.querySelector('#Rates tbody');
  $status.innerHTML = 'Loading....';
  return $status;
}

export function configureInputDate() {
  const $date = document.querySelector('#date-input');
  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  const month = (`0${todaysDate.getMonth() + 1}`).slice(-2);
  const day = (`0${todaysDate.getDate()}`).slice(-2);
  const maxDate = (`${year}-${month}-${day}`);
  $date.setAttribute('max', maxDate);
  $date.addEventListener('change', updateData);
}

export function listOfCurrencies(currency) {
  const $list = document.querySelector('.dropdown-menu.dropdown-menu-right');
  currency.forEach((baseCurrency) => {
    const $item = document.createElement('button');
    $item.type = 'button';
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

export function showCurrencyRates(currencyRates) {
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

export function getSelectedDate() {
  const $dateSelected = document.querySelector('#date-input').value;
  return $dateSelected || undefined;
}

export function getSelectedCurrency() {
  const $activeCurrency = document.querySelector('.dropdown-item.active');
  if ($activeCurrency) {
    return document.querySelector('.dropdown-item.active').dataset.baseCurrency;
  }
  return undefined;
}
