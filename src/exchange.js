/* eslint-disable linebreak-style */
export async function getRates(baseCurrency = 'EUR', date = 'latest') {
  const URL = 'https://api.exchangeratesapi.io';
  const apiResp = await fetch(`${URL}/${date}?base=${baseCurrency}`);
  const apiRespJson = await apiResp.json();
  return apiRespJson.rates;
}

export async function getCurrencies() {
  const apiRespRates = await getRates();
  return Object.keys(apiRespRates).concat('EUR');
}
