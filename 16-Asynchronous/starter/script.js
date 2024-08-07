'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const [keyL, valueL] = Object.entries(data.languages)[0];
  const cur = Object.entries(data.currencies)[0];
  const curr = Object.values(cur)[1];
  // console.log(valueL);

  const html = `
      <article class="country ${className}">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${valueL}</p>
              <p class="country__row"><span>💰</span>${curr.name}</p>
            </div>
          </article>
      `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};
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
const getJSON = function (url, erroMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`Country not found (${response.status} not found!)`);

    return response.json();
  });
};
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

// const getCountryData = country => {
//   // Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found').then(data => {
//       renderCountry(data[0]);
//       console.log(data[0]);
//       const neighbour = data[0].borders[0];
//     // const neighbour = 'sahdhfh'
//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found');
//     })
//      .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {console.error(`${err} 🔥💥💥`),
//     renderError(`Something went wrong 🔥💥💥 ${err.message}. Try again later `)})
//     .finally(()=> {
//       countriesContainer.style.opacity = 1;
//     })
// }
// btn.addEventListener('click', function(){

//   getCountryData('nigeria');
// })

// getCountryData('australia');

// CODING CHALLENGE 1
// 1. Create a function 'whereAmI' which takes as inputs a
// latitude value ('lat') and a longitude value ('lng')

// 2. Do “reverse geocoding” of the provided coordinates.
// Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json.
// Use the fetch API and promises to get the data.

// 3. Once you have the data, take a look at it in the console to see all the attributes
// that you received about the provided location. Then, using this data, log a
// message like this to the console: “You are in Berlin, Germany”

// 4. Chain a .catch method to the end of the promise chain and log errors to the
// console

// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message

// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.
// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=177995075472916719155x118314`
//   )
//     .then(response => {
//       // console.log(response.json());

//       if (!response.ok)
//         throw new Error(
//           `Problem with geocoding. ${response.status} not found!`
//         );

//       return response.json();
//     })
//     .then(data => {
//       // console.log(data),
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//       // console.log(`You are in ${data.city}, ${data.country}`);
//     })
//     .then(response => {
//       // console.log(response.json()),
//       return response.json();
//     })
//     .then(data => {
//       // console.log(data[1]),
//       renderCountry(data[0]);
//     });
//   // .catch(err => console.log(`${err.message} 💥💥💥💥`));
// };

// whereAmI(19.037, 72.873);
// whereAmI(52.508, 13.381);
// whereAmI(-33.933, 18.474);
// 177995075472916719155x118314 - API AUTH

// DAY 121 - EVENT LOOP IN PRACTICE
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 100000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

// DAY 122 - BUILDING A NEW PROMISE

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happeneing 🔮');
//   setTimeout(function () {
//     if (Math.random() > 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You LOST your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

// // Promisifying set timeout function
// const wait = seconds => {
//   return new Promise(resolve => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(err => console.error(err));

// PROMISIFYING GEOLOCATION API
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=177995075472916719155x118314`
//       );
//     })
//     .then(response => {
//       // console.log(response.json());

//       if (!response.ok)
//         throw new Error(
//           `Problem with geocoding. ${response.status} not found!`
//         );

//       return response.json();
//     })
//     .then(data => {
//       // console.log(data),
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//       // console.log(`You are in ${data.city}, ${data.country}`);
//     })
//     .then(response => {
//       // console.log(response.json()),
//       return response.json();
//     })
//     .then(data => {
//       // console.log(data[1]),
//       renderCountry(data[0]);
//     });
//   // .catch(err => console.log(`${err.message} 💥💥💥💥`));
// };

// btn.addEventListener('click', whereAmI);

// CODING CHALLENGE 2

// const wait = seconds => {
//   return new Promise(resolve => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// const imageContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imageContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image NOT found'));
//     });
//   });
// };

// let currentImage;

// createImage('./img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('Image one loaded');

//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     console.log('Image two loaded');

//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// DAY 123 - CONSUMING PROMISES WITH ASYNC AWAIT

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const whereAmI = async function (country) {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding
//     const resGeo = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json&auth=177995075472916719155x118314`
//     );
//     if (!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();
//     // console.log(dataGeo);

//     // Country data
//     // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
//     //   console.log(res)
//     // );
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error('Problem getting country data');
//     const data = await res.json();
//     // console.log(data);
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`💥 ${err}`);
//     renderError(` 💥 ${err.message}`);
//   }

//   throw err;
// };

// console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message}`);
//   }
//   console.log('3: Finished getting location');
// })();
// ERROR HANDLING WITH THE TRY...CATCH
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

// RUNNING PROMISES IN PARALLEL
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] =
//     //   await 'getJSON(`https://restcountries.com/v3.1/name/${c2}`);';
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

//     // console.log([data1.capital, data2.capital, data3.capital]);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);

//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('nigeria', 'canada', 'zambia');

// Promise.race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/ghana`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//     getJSON(`https://restcountries.com/v3.1/name/spain`),
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/zambia`),
//   timeout(0.9),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// // Promise.allSettled
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// // Promise.all
// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// // Promise.any
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// CODING CHALLENGE 3

// const wait = seconds => {
//   return new Promise(resolve => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// const imageContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imageContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image NOT found'));
//     });
//   });
// };

// let currentImage;

// // createImage('./img/img-1.jpg')
// //   .then(img => {
// //     currentImage = img;
// //     console.log('Image one loaded');

// //     return wait(2);
// //   })
// //   .then(() => {
// //     currentImage.style.display = 'none';
// //     return createImage('./img/img-2.jpg');
// //   })
// //   .then(img => {
// //     currentImage = img;
// //     console.log('Image two loaded');

// //     return wait(2);
// //   })
// //   .then(() => {
// //     currentImage.style.display = 'none';
// //   })
// //   .catch(err => console.error(err));

// const loadNPause = async function () {
//   try {
//     // Load image 1
//     let img = await createImage('./img/img-1.jpg');
//     console.log('Image one loaded');
//     await wait(2);

//     img.style.display = 'none';

//     // Load image 2
//     img = await createImage('./img/img-2.jpg');
//     console.log('Image two loaded');
//     await wait(2);

//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// // loadNPause();

// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async img => await createImage(img));
//     console.log(imgs);
//     const imgsEL = await Promise.all(imgs);
//     console.log(imgsEL);

//     imgsEL.forEach(img => img.classList.add('parallel'));
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
