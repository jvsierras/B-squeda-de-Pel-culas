// Cargar datos desde Google Drive, Terabox o Amazon S3
async function fetchData() {
  const response = await fetch("https://www.dropbox.com/scl/fi/xk6jq4xtgxe3vu4wixu1j/abyss1.js?rlkey=tasyh82uzse8zet088n617gp8&st=fdhq3yfg&dl=0");
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  const data = await response.json();
  return data.items; // Ajusta según la estructura de tu archivo JSON
}

function displayMovies(movies) {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    const movieImage = document.createElement("img");
    movieImage.src = "assets/placeholder.jpg"; // Reemplaza con la URL del póster si está disponible
    movieImage.alt = movie.name;

    const movieName = document.createElement("p");
    movieName.textContent = movie.name;

    movieItem.appendChild(movieImage);
    movieItem.appendChild(movieName);

    // Agregar evento de clic para abrir la información de la película
    movieItem.addEventListener("click", () => openMovieModal(movie));

    movieList.appendChild(movieItem);
  });
}

function createIframe(slug) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://short.icu/${slug}`;
  iframe.width = "640";
  iframe.height = "360";
  iframe.frameBorder = "0";
  iframe.scrolling = "0";
  iframe.allowFullscreen = true;
  return iframe;
}

function openMovieModal(movie) {
  const modal = document.getElementById("info-modal");
  const infoMovieTitle = document.getElementById("info-movie-title");
  const infoPoster = document.getElementById("info-poster");
  const infoOverview = document.getElementById("info-overview");
  const infoReleaseDate = document.getElementById("info-release-date");
  const infoGenres = document.getElementById("info-genres");
  const infoRuntime = document.getElementById("info-runtime");
  const infoPopularity = document.getElementById("info-popularity");
  const infoOriginalLanguage = document.getElementById("info-original-language");
  const iframeContainer = document.getElementById("modal-movie-player");

  // Limpiar el contenedor antes de agregar un nuevo iframe
  iframeContainer.innerHTML = "";

  // Crear el iframe dinámicamente
  const iframe = createIframe(movie.slug);
  iframeContainer.appendChild(iframe);

  // Mostrar los detalles de la película
  infoMovieTitle.textContent = movie.name;
  infoPoster.src = "assets/placeholder.jpg"; // Reemplaza con la URL del póster si está disponible
  infoOverview.textContent = "Sinopsis no disponible.";
  infoReleaseDate.textContent = "Fecha de estreno no disponible";
  infoGenres.textContent = "Géneros no disponibles";
  infoRuntime.textContent = movie.resolution || "Duración no disponible";
  infoPopularity.textContent = movie.status || "Popularidad no disponible";
  infoOriginalLanguage.textContent = "Idioma original no disponible";

  // Mostrar el modal
  modal.style.display = "block";
}

// Cerrar la ventana modal
document.querySelectorAll(".close").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.getElementById("info-modal");
    modal.style.display = "none";
    const iframeContainer = document.getElementById("modal-movie-player");
    iframeContainer.innerHTML = ""; // Detener el video
  });
});

// Cerrar la ventana modal al hacer clic fuera de ella
window.addEventListener("click", (event) => {
  const modal = document.getElementById("info-modal");
  if (event.target === modal) {
    modal.style.display = "none";
    const iframeContainer = document.getElementById("modal-movie-player");
    iframeContainer.innerHTML = ""; // Detener el video
  }
});

// Cargar las películas al iniciar
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const movies = await fetchData();
    displayMovies(movies);
  } catch (error) {
    console.error("Error al cargar datos:", error);
    alert("Hubo un error al cargar los datos. Por favor, intenta nuevamente.");
  }
});