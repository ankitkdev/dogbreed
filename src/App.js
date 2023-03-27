import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        if (response.status === 200 || response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error status: ${response.status}`);
        }
      })
      .then((json) => {
        setBreeds(Object.keys(json.message));
      });
  }, []);

  const searchByBreed = () => {
    setIsLoading(true);
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`)
      .then((response) => {
        if (response.status === 200 || response.ok) {
          return response.json();
        } else {
          setIsLoading(false);
          throw new Error(`HTTP error status: ${response.status}`);
        }
      })
      .then((json) => {
        setIsLoading(false);
        setDogImages(json.message);
      });
  };

  return (
    <div className="container">
      <div className="row m-4 d-flex justify-content-center align-items-center">
          <h1 className="text-center text-white">Doggy Breed</h1>
          <div className="input-group w-25">
            <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon" value={selectedBreed}
            onChange={(event) => setSelectedBreed(event.target.value)}>
              <option value="" disabled>Choose...</option>
              {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
            </select>
            <button className="btn btn-success" type="button" disabled={!selectedBreed}
            onClick={searchByBreed}>Search</button>
          </div>
        </div>
        {dogImages.length > 0 && !isLoading && (
          <div className="px-5 mx-5 text-end" data-testid="results-count">
            <p className="fs-5">{dogImages.length} results</p>
          </div>
        )}
        {isLoading && (
            <div className="d-flex align-items-center justify-content-center">
              <button className="btn btn-outline-primary" type="button" disabled>
          <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
            </div>
          )}
          {dogImages.length > 0 &&
            !isLoading &&
            dogImages.map((imgSrc, index) => (
              <img
                key={`${index}-${selectedBreed}`}
                src={imgSrc}
                className="img-thumbnail w-25"
                alt={`${selectedBreed} ${index + 1} of ${dogImages.length}`}
              />
            ))}
    </div>
  );
}
export default App;
