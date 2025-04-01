const favoritePets = getFavoritePetsFromStorage();
console.log(favoritePets);
showBreeds(favoritePets);

function getBreedById(id) {
  const petData = favoritePets.find((pet) => pet.id == id);
  showModalData(petData);
  selectedPet = petData;
}

function showModalData(data) {
  document.querySelector(".modal-card-title").innerHTML = data.name;
  const modalBody = document.querySelector(".modal-card-body");
  let image = "";
  if (typeof data.id == "string") {
    image = `<img src="https://cdn2.thecatapi.com/images/${data.reference_image_id}.jpg"/>`;
  } else {
    image = `<img src="https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg"/>`;
  }
  const lifeSpan = `<h3> <strong>Life Span:</strong> ${data.life_span}</h3>`;
  const weight = `<h3> <strong>Weight:</strong> ${data.weight.imperial} lbs.</h3>`;
  const temperament = `<h3> <strong>Temperament:</strong> ${data.temperament}</h3>`;
  modalBody.innerHTML = image + lifeSpan + weight + temperament;
}

function removeFromStorage(id) {
  const savedFavoritePets = getFavoritePetsFromStorage();
  const updatedFavorites = savedFavoritePets.filter((pet) => pet.id != id);
  saveToLocalStorage(updatedFavorites);
  showBreeds(updatedFavorites);
  toggleModal();
}