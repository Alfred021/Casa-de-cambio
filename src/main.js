function getRates(baseCurrency = 'EUR', date = 'latest') {
    const URL = 'https://api.exchangeratesapi.io';
    return fetch(`${URL}/${date}?base=${baseCurrency}`)
    .then((resp) => resp.json())
    .then((resp) => resp.rates)
}

function getCurrencies() {
    return getRates().then((resp) => Object.keys(resp).concat('EUR'));
}

function statusShowing() {
    const $status = document.querySelector('#Rates tbody').innerHTML = 'Loading...';
    return $status;
} 

function configureInputDate() {
    const $date = document.querySelector('#date-input');
    var todaysDate = new Date()
    var year = todaysDate.getFullYear();                        
    var month = ("0" + (todaysDate.getMonth() + 1)).slice(-2);  
    var day = ("0" + todaysDate.getDate()).slice(-2);           
    var maxDate = (year +"-"+ month +"-"+ day); // Results in "YYYY-MM-DD" for today's date 
    $date.setAttribute('max', maxDate);
    $date.addEventListener('change', updateData)
}

function listOfCurrencies(currency) {
    $list = document.querySelector('.list-group')
    currency.forEach((baseCurrency) => {
        const $item = document.createElement('a');
        $item.href = '#';
        $item.classList.add('list-group-item', 'list-group-item-action');
        $item.textContent = baseCurrency;
        $item.dataset.baseCurrency = baseCurrency;
        $item.addEventListener('click', () => {
            const $activeElement = document.querySelector('.list-group-item.active');
            if ($activeElement) {
                $activeElement.classList.remove('active');
            }
            $item.classList.add('active');
            updateData()
        });
    $list.appendChild($item);
    });
}

function getSelectedCurrency() {
    const $activeCurrency = document.querySelector('.list-group-item.active');
    if ($activeCurrency) {
        return document.querySelector('.list-group-item.active').dataset.baseCurrency;
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
        $currency.textContent = currency
        $currencyRate.textContent = currencyRates[currency];
        $row.appendChild($currency)
        $row.appendChild($currencyRate);
        $currencyRates.appendChild($row)
    });
}

function setUp() {
    getCurrencies().then((currency) => {
        listOfCurrencies(currency);
    });
    configureInputDate();
}

function updateData() {
    statusShowing()
    getRates(getSelectedCurrency(), getSelectedDate())
        .then((currencyRates) => {
            showCurrencyRates(currencyRates)
        });
}

setUp();
