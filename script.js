document.addEventListener("DOMContentLoaded", () => {
  // ————— Volunteering —————
  const volunteerBtn = document.getElementById("volunteer-btn");
  const emailInput   = document.getElementById("email-input");

  volunteerBtn?.addEventListener("click", () => {
    const email = emailInput.value.trim();
    if (!email) {
      alert("Please enter your email before volunteering!");
      return;
    }
    alert(`Thank you ${email} for volunteering for Green Horizons!`);
  });

  const getWeatherBtn = document.getElementById("get-weather-btn");
  const cityInput     = document.getElementById("city-input");
  const weatherResult = document.getElementById("weather-result");

  getWeatherBtn?.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      weatherResult.innerText = "Please enter a city name.";
      return;
    }

    const apiKey = "affdff361b9f07c0f8905a8396a9400d";
    const apiUrl = 
  `https://api.openweathermap.org/data/2.5/weather?q=` +
  `${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;


    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("City not found or API issue.");

      const data = await response.json();
      const weather = data.weather[0].main;
      const temp    = data.main.temp;

      weatherResult.innerHTML = `
        <p>Current weather in <strong>${city}</strong>: ${weather}, ${temp}°F</p>
        <p>${weather.toLowerCase().includes("rain")
          ? "⚠️ It might rain—please plan accordingly!"
          : "✅ Looks clear for the event!"}</p>
      `;
    } catch (err) {
      weatherResult.innerHTML = `<p style="color:red;">Error fetching weather: ${err.message}</p>`;
    }
  });
});
