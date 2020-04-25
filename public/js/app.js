document.addEventListener("DOMContentLoaded", () => {
  const fetchWeather = (city="city") => {
    fetch(`/weather?address=${city}`).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
        }
      });
    });
  };

  const formEl = document.querySelector("form");
  formEl.onsubmit = (e) => {
    e.preventDefault();
    fetchWeather(e.target.city.value);
  };
});
