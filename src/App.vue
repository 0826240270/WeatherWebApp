<template>
  <div id="app" :class="typeof weather.main !='undefined' && weather.main.temp > 16 ? 'warm': 'cold'">  
    <main>
      <div class="search-box">
        <input 
        type="text" 
        class="search-bar" 
        placeholder="Search Destination..."
        v-model="query"
        @keypress="fetchWeather"
        >
      </div>
      <div class="weather-wrap" :class="typeof weather.main !='undefined' && weather.main.temp > 16 ? 'warm': 'cold'" v-if="typeof weather.main != 'undefined'">
            <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
            <div class="date">{{ dateBuilder() }}</div>
            <div class="temperature">{{ Math.round(weather.main.temp) }}°C</div>
            <div class="weather">{{ weather.weather[0].main }}</div>
      </div>
    </main>
  </div>
</template>
<script src="./tranformText.js"></script>

<script>
export default {
  name: 'App',
  data () {
    return {
    api_key: '89060ece1eca231d7eddf319112032df',
    url_base: 'http://api.openweathermap.org/data/2.5/',
    query: '',
    weather: {
     
    }
    } 
  },
  methods: {
  fetchWeather(e) {
          if(e.key == "Enter"){
            fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
              .then(res =>  {
                return res.json();
              }).then(this.setResults);
          }
    },
    setResults (results){
      this.weather = results;
    },
    dateBuilder () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "July",
      "August", "Semtemper", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
       "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    }
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Sansita Swashed', cursive;
  }

  #app {
    background-image: url('./assets/cold-bg.jpg');
    background-size: auto;
    background-position: center;
    transition: 1s;
    background-attachment: scroll ;
  }

  #app.warm {
    background-image: url(./assets/warm-bg.jpg);
  }

  .weather-wrap.warm {
    color:  #b30059;
  }

  .weather-wrap.cold {
    color: 	 #668cff;
  }

  main {
    min-height: 100vh;
    padding: 25px;

    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25));
  }

  .search-box {
    width: 100%;
    margin-bottom: 30px;
  }

  .search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;

    color: #313131;
    font-size: 20px;
    
    appearance: none;
    border: none;
    outline: none;
    background: none;

    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 16px;
    transition: 0.4s;
  }

  .search-bar:focus {
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 16px 0px;
  }

  .weather-wrap {
    text-align: center;
    color: whitesmoke;
  }

  .weather-wrap .location {
      font-size: 32px;
      font-weight: 500;
      text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }

  .weather-wrap .date {
      font-size: 25px;
      margin-top: 10px;
      font-style: italic;
      font-weight: 100;
  }

  .weather-wrap .temperature:hover {
    cursor: pointer;
  }

  .weather-wrap .temperature {
      display: inline-block;
      padding: 10px 10px;
      font-size: 90px;
      font-weight: 900;

      box-shadow: 3px 6px rgba(0, 0, 0, 0.5);
      text-shadow: 3px 6px rgba(0, 0, 0, 0.5);
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 20px;

      margin: 30px 0px;
  }

 .weather {
     text-transform: uppercase;
    padding: 5px 15px;
    font-size: 48px;  
    font-weight: 500;
    font-style: bold;
      box-shadow: 3px 6px rgba(0, 0, 0, 0.5);
            background-color: rgba(255, 255, 255, 0.25);
    
    text-shadow: 3px 4px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 240px !important;
    margin: auto;
  }


</style>
