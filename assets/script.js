async function fetchData() {
  const response = await fetch("data.json");
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
    movieImage.src = "assets/images/placeholder.jpg"; // Reemplaza con la URL del póster si está disponible
    movieImage.alt = movie.name;

    const movieName = document.createElement("p");
    movieName.textContent = movie.name;

    movieItem.appendChild(movieImage);
    movieItem.appendChild(movieName);

    movieList.appendChild(movieItem);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const movies = await fetchData();
    displayMovies(movies);
  } catch (error) {
    console.error("Error al cargar datos:", error);
    alert("Hubo un error al cargar los datos. Por favor, intenta nuevamente.");
  }
});
