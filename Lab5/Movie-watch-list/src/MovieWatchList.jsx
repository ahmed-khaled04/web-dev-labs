import React, { useState } from "react";
import "./MovieWatchList.css"; // 👈 Make sure you have this file

function MovieWatchList() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  function handleAddMovie() {
    if (movieName.trim() === "") return;

    const newMovie = {
      name: movieName,
      review: review,
      rating: rating,
    };

    setMovies((prev) => [...prev, newMovie]);
    setMovieName("");
    setReview("");
    setRating(0);
  }

  function handleRemoveMovie(index) {
    setMovies((prev) => prev.filter((_, i) => i !== index));
  }

  function handleStarClick(value) {
    setRating(value);
  }

  function renderStars(num) {
    return "⭐".repeat(num);
  }

  return (
    <div className="watch-list-container">
      <h2 className="watch-list-title">🎬 Movie Watch List</h2>

      <input
        type="text"
        placeholder="Movie name..."
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        className="movie-input"
      />
      <br />

      <textarea
        placeholder="Write a short review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="review-input"
      />
      <br />

      <div className="rating-container">
        <p>Rate this movie:</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "active" : ""}`}
              onClick={() => handleStarClick(star)}
            >
              ⭐
            </span>
          ))}
        </div>
      </div>

      <button onClick={handleAddMovie} className="add-btn">
        Add Movie
      </button>

      <ul className="watch-list">
        {movies.map((m, index) => (
          <li key={index} className="movie-item">
            <div className="movie-details">
              <strong>{m.name}</strong>
              <p className="movie-stars">{renderStars(m.rating)}</p>
              <p className="movie-review">{m.review}</p>
            </div>
            <button
              onClick={() => handleRemoveMovie(index)}
              className="remove-btn"
            >
              ❌ Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieWatchList;
