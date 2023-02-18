const submitForm = document.getElementById('color-pick-form');
const colorPicker = document.getElementById('color-picker');
const colorList = document.getElementById('color-list');

let paletteContainer = document.getElementById('palette-container');
let hexValueContainer = document.getElementById('hex-value-container');

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  renderColors();
});

const renderColors = () => {
  paletteContainer.innerHTML = '';
  hexValueContainer.innerHTML = '';

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorPicker.value.substring(
      1
    )}&mode=${colorList.value.toLowerCase()}`
  )
    .then((res) => res.json())
    .then((data) => {
      let i = 1;
      for (let color of data.colors) {
        paletteContainer.innerHTML += `
          <div id="color${i}" class="color${i}" data-color="${color.hex.value}"></div>
        `;
        document.getElementById(`color${i}`).style.backgroundColor =
          color.hex.value;

        hexValueContainer.innerHTML += `
          <h3 id=color-id-${i}>${color.hex.value}</h3>
        `;
        i++;
      }
    });
};

paletteContainer.addEventListener('click', (e) => {
  copyContent(e.target.dataset.color);
  alert(`Color: ${e.target.dataset.color} copied to clipboard!`);
});

const copyContent = async (target) => {
  try {
    await navigator.clipboard.writeText(target);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

renderColors();
