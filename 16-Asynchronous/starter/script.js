'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/////////////////////////////////////
// const getCountryData = function(country) {
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
// request.send();

// request.addEventListener('load', function(){
//     const [data] = JSON.parse(this.responseText)
//     console.log(data);
//     console.log(data.flags);
//     console.log(data.languages.eng);
    
//     const [keyL, valueL] = Object.entries(data.languages)[0]
//    const cur = Object.entries(data.currencies)[0];
//    const curr = Object.values(cur)[1]
//    console.log(curr.name);
    

//     const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${valueL}</p>
//             <p class="country__row"><span>💰</span>${curr.name}</p>
//           </div>
//         </article>
//     `

//     countriesContainer.insertAdjacentHTML('beforeend', html)
//     countriesContainer.style.opacity = 1;
// })
// }
// getCountryData('nigeria')
// getCountryData('ghana')
// getCountryData('china')

const renderCountry = function(data) {
  const [keyL, valueL] = Object.entries(data.languages)[0]
     const cur = Object.entries(data.currencies)[0];
     const curr = Object.values(cur)[1]
     console.log(curr.name);

  const html = `
      <article class="country">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${valueL}</p>
              <p class="country__row"><span>💰</span>${curr.name}</p>
            </div>
          </article>
      `

      countriesContainer.insertAdjacentHTML('beforeend', html)
      countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = function(country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
  request.send();
  
  request.addEventListener('load', function(){
      const [data] = JSON.parse(this.responseText)
      console.log(data);
      
     // Render country 1
       renderCountry(data);
    
    // Get neighbour country (2)
    const [n1, n2, n3, n4] = data.borders;
    // console.log(n1);

    if (!n1 || !n2 || !n3 || !n4) return;
    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${n1}`)
    request2.send();
    
    request2.addEventListener('load', function(){
      const [dataNeighbour] = JSON.parse(this.responseText)
      console.log(dataNeighbour);

      // Render country 2
      renderCountry(dataNeighbour)
    })
  })
  }
  getCountryAndNeighbour('nigeria')
  // getCountryData('ghana')
  // getCountryData('china')