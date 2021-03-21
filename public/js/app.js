const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTow");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error), (messageTow.textContent = "");
      } else {
        messageOne.textContent = data.Forecast;
        messageTwo.textContent = data.location;
      }
    });
  });
});
