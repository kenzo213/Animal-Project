const dogBaseUrl = "https://api.thedogapi.com/v1";
const dogApiKey =
  "live_UOjfU5yMJMSn0iNtFAJfiutWXY0Py1pJqDJt6oEWwwtMUplQstSsRv3KcHWQ5k9E";

  function fetchDogBreeds() {
    fetch(`${dogBaseUrl}/breeds`)
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
    fetch(`${dogBaseUrl}/breeds/${id}`)
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
    const image = `<img src="https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg"/>`;
    const lifeSpan = `<h3> <strong>Life Span:</strong> ${data.life_span}</h3>`;
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

  window.onload = fetchDogBreeds;

