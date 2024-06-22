'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function(data, className = '') {
  const [keyL, valueL] = Object.entries(data.languages)[0]
  const cur = Object.entries(data.currencies)[0];
  const curr = Object.values(cur)[1]
  console.log(valueL);

  const html = `
      <article class="country ${className}">
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
      // countriesContainer.style.opacity = 1;
}

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg)
  // countriesContainer.style.opacity = 1;
}
// /////////////////////////////////////
// // const getCountryData = function(country) {
// // const request = new XMLHttpRequest();
// // request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
// // request.send();

// // request.addEventListener('load', function(){
// //     const [data] = JSON.parse(this.responseText)
// //     console.log(data);
// //     console.log(data.flags);
// //     console.log(data.languages.eng);
    
// //     const [keyL, valueL] = Object.entries(data.languages)[0]
// //    const cur = Object.entries(data.currencies)[0];
// //    const curr = Object.values(cur)[1]
// //    console.log(curr.name);
    

// //     const html = `
// //     <article class="country">
// //           <img class="country__img" src="${data.flags.png}" />
// //           <div class="country__data">
// //             <h3 class="country__name">${data.name.common}</h3>
// //             <h4 class="country__region">${data.region}</h4>
// //             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
// //             <p class="country__row"><span>🗣️</span>${valueL}</p>
// //             <p class="country__row"><span>💰</span>${curr.name}</p>
// //           </div>
// //         </article>
// //     `

// //     countriesContainer.insertAdjacentHTML('beforeend', html)
// //     countriesContainer.style.opacity = 1;
// // })
// // }
// // getCountryData('nigeria')
// // getCountryData('ghana')
// // getCountryData('china')



// const getCountryAndNeighbour = function(country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
//   request.send();
  
//   request.addEventListener('load', function(){
//       const [data] = JSON.parse(this.responseText)
//       console.log(data);
      
//      // Render country 1
//        renderCountry(data);
    
//     // Get neighbour country (2)
//     const [neighbour] = data.borders;
//     console.log(neighbour);

//     if (!neighbour) return;
//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`)
//     request2.send();
    
//     request2.addEventListener('load', function(){
//       const [dataNeighbour] = JSON.parse(this.responseText)
//       console.log(dataNeighbour);

//       // Render country 2
//       renderCountry(dataNeighbour, 'neighbour')
//     })
//   })
//   }
//   // getCountryAndNeighbour('nigeria')
//   // getCountryAndNeighbour('ghana')
//   getCountryAndNeighbour('china')


//   setTimeout(()=> {
//     console.log('1 Seconds passed')
//     setTimeout(()=> {
//       console.log('2 Seconds passed'), 1000})
//       setTimeout(()=> {
//         console.log('3 Seconds passed'), 1000})
//         setTimeout(()=> {
//           console.log('4 Seconds passed'), 1000})
//     , 1000})



// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}
// `).then(function (response){
//       console.log(response);
//       return response.json()
//     }).then(function(data){
//       console.log(data);

//       renderCountry(data[0])
//     })
// }
const getJSON = function(url, erroMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if(!response.ok) 
    throw new Error(`Country not found (${response.status} not found!)`)
  
  return response.json()})
}
// const getCountryData = country => {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}
// `).then(response => {
//   console.log(response);

//   if(!response.ok) 
//     throw new Error(`Country not found (${response.status} not found!)`)
  
//   return response.json()})
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data[0]);
//       const neighbour = data[0].borders[0];

//       if(!neighbour) returns;

//       // Country 2
//      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {console.error(`${err} 🔥💥💥`),
//     renderError(`Something went wrong 🔥💥💥 ${err.message}. Try again later `)})
//     .finally(()=> {
//       countriesContainer.style.opacity = 1;
//     })
// }


const getCountryData = country => {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found').then(data => {
      renderCountry(data[0]);
      console.log(data[0]);
      const neighbour = data[0].borders[0];
    // const neighbour = 'sahdhfh'
      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
     return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found');
    })
     .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {console.error(`${err} 🔥💥💥`),
    renderError(`Something went wrong 🔥💥💥 ${err.message}. Try again later `)})
    .finally(()=> {
      countriesContainer.style.opacity = 1;
    })
}
btn.addEventListener('click', function(){

  getCountryData('nigeria');
})

getCountryData('australia');