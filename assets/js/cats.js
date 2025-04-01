const catBaseUrl = "https://api.thecatapi.com/v1";
const catApiKey =
  "live_XIJ61rTGzrcgWLwQRMEqokr5qx6iJrORl2zr9k4374qNbDbba5pF1f37eXHGQQ1h";

function fetchCatBreeds() {
  fetch(`${catBaseUrl}/breeds`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showBreeds(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getBreedById(id) {
  fetch(`${catBaseUrl}/breeds/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showModalData(data);
      selectedPet = data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function showModalData(data) {
  document.querySelector(".modal-card-title").innerHTML = data.name;
  const modalBody = document.querySelector(".modal-card-body");
  const image = `<img src="https://cdn2.thecatapi.com/images/${data.reference_image_id}.jpg"/>`;
  const lifeSpan = `<h3> <strong>Life Span:</strong> ${data.life_span} years </h3>`;
  const weight = `<h3> <strong>Weight:</strong> ${data.weight.imperial} lbs.</h3>`;
  const temperament = `<h3> <strong>Temperament:</strong> ${data.temperament}</h3>`;
  modalBody.innerHTML = image + lifeSpan + weight + temperament;
}

function removeFromStorage(id) {
  const savedFavoritePets = getFavoritePetsFromStorage();
  const updatedFavorites = savedFavoritePets.filter((pet) => pet.id != id);
  saveToLocalStorage(updatedFavorites);
  toggleModal();
}

window.onload = fetchCatBreeds;
