'use strict';

// prettier-ignore

// storing element in a variable
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class Workout {

    date = new Date();
    id = (Date.now() + '').slice(-10);
    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
}

class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace(){
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed(){
        // km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

// const run1 = new Running([31, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([31, -12], 27, 95, 523);
// console.log(run1, cycling1);
////////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE 
class App {
    #map
    #mapEvent
    #workouts = [];
    constructor(){
        this._getPosition();

        form.addEventListener('submit', this._newWorkout.bind(this))
    
        inputType.addEventListener('change', this._toggleElevationField)
    }

    _getPosition(){if (navigator.geolocation) 
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function() {
            alert('Could not get your position!')
        })
    }

    _loadMap(position){
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, 13);

L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.#map);

// Handling click events on map
    this.#map.on('click', this._showForm.bind(this) )
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    }

    _newWorkout(e){
        // helper functions
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositives = (...inputs) => inputs.every(inp => inp > 0);

        e.preventDefault();

        // Get data from the form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;
        
        // If workout running, create a running object
        if (type === 'running') {
            // Check if data is valid
            const cadence = +inputCadence.value;
            if(
                // !Number.isFinite(distance) ||
                // !Number.isFinite(duration) ||
                // !Number.isFinite(cadence)
                !validInputs(distance, duration, cadence) ||
                !allPositives(distance, duration, cadence)
            )
                return alert('Input has to be positive numbers!')

                workout = new Running([lat, lng], distance, duration, cadence);

        }
        // If workout cycling, create a cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            if(!validInputs(distance, duration, elevation) ||
            !allPositives(distance, duration))
                return alert('Input has to be positive numbers!')

                workout = new Cycling([lat, lng], distance, duration, elevation);
        }
        // Add new objects to the workout array
        this.#workouts.push(workout);
        // Display marker
        
    
        L.marker([lat, lng]).addTo(this.#map)
    .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
    })).setPopupContent('Workout')
    .openPopup();

        // Render workout on map as a marker

        // Render workout on the list
        
    
        // Hide input form + clear input fields
            inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
    
            
    }
}

const app = new App();
   
    