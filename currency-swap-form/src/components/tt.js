fetch('https://interview.switcheo.com/prices.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Extract currency values
    const currencies = data.map(item => item.currency);

    // List out the currencies with numbers
    currencies.forEach((currency, index) => {
      console.log(`${index + 1}. ${currency}`);
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
