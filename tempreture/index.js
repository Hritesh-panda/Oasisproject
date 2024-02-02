let celcius = document.getElementById("celcius");
let idegree = document.getElementById("idegree");
let temptype = document.getElementById("temp-type");
let convert_btn = document.getElementById("convert-btn");

window.addEventListener("load", () => {
  idegree.value = "";
  celcius.innerHTML = "";
});
convert_btn.addEventListener("click", (e) => {
  e.preventDefault();
  conveertTocelcius();
});
function conveertTocelcius() {
  let inputValue = idegree.value;
  if (temptype.value === "fahrenheit") {
    const fahrenheitTocelcius = (inputValue - 32) * (5 / 9);
    celcius.innerHTML = `${fahrenheitTocelcius.toFixed(3)} &deg;c`;
  } else if (temptype.value === "kelvine") {
    const kelvineTocelcius = inputValue - 273.15;
    celcius.innerHTML = `${kelvineTocelcius.toFixed(3)} &deg;c`;
  }
}
