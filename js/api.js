export async function fetchLocationInfo(name) {
  const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=pt&format=json`;

  return fetch(URL)
    .then((res) => {
      if(!res.ok) {
        throw new Error(`Erro HTTP! Status: ${res.status}`);
      }

      return res.json();
    })
    .then((data) => {
      if (!data.hasOwnProperty("results")) {
        throw new Error("Failed to load city data!");
      }

      return data;
    });
}

export async function fetchWeatherInfo({ latitude, longitude }) {
  const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m,apparent_temperature,precipitation_probability,wind_speed_10m,uv_index&current=temperature_2m,weather_code&timezone=auto`;

  return fetch(URL)
    .then((res) => {
      if(!res.ok) {
        throw new Error(`Erro HTTP! Status: ${res.status}`);
      }

      const data = res.json();

      return data;
    })
}
