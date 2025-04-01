let selectedPet;

function showBreeds(breeds) {
  const breedsContainer = document.querySelector(".breeds-container");
  let buttonsHtml = "";
  for (const breed of breeds) {
    let image = "";
    if (typeof breed.id == "string") {
      image = `<img src="https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg"/>`;
    } else {
      image = `<img src="https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg"/>`;
    }
    buttonsHtml += `<div class="breed-item">${image}<button id=${breed.id} class="button is-light">${breed.name}</button></div>`;
  }
  breedsContainer.innerHTML = buttonsHtml;

  document.querySelectorAll(".breeds-container button").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      getBreedById(event.target.id);
      checkIfFavorite(event.target.id)
      toggleModal();
    });
  });
}

//get all favorite pets form localStorage
function getFavoritePetsFromStorage() {
  const storagePets = JSON.parse(localStorage.getItem("favoritePets"));
  if (storagePets == null) {
    return [];
  } else {
    return storagePets;
  }
}

function saveToLocalStorage(favoritePets) {
  localStorage.setItem("favoritePets", JSON.stringify(favoritePets));
}



document.querySelector(".delete").addEventListener("click", function () {
  toggleModal();
});

function toggleModal() {
  document.getElementById("modal").classList.toggle("is-active");
}

function checkIfFavorite(id) {
  const savedFavoritePets = getFavoritePetsFromStorage();
  const updatedFavorites = savedFavoritePets.filter((pet) => pet.id == id);
  if (updatedFavorites.length > 0) {
    const favIcon = document.querySelector(".favorite .icon");
    favIcon.classList.add("red");
  } else {
    const favIcon = document.querySelector(".favorite .icon");
    favIcon.classList.remove("red");
  }
}

const favoriteEl = document.querySelector(".favorite");
favoriteEl.addEventListener("click", function (event) {
  const savedFavoritePets = getFavoritePetsFromStorage();
  if (selectedPet) {
    savedFavoritePets.unshift(selectedPet);
  }
  const favIcon = document.querySelector(".favorite .icon");
  if (favIcon.className.includes("red")) {
    removeFromStorage(selectedPet.id);
  } else {
    saveToLocalStorage(savedFavoritePets);
    favIcon.classList.add("red");
  }
});
