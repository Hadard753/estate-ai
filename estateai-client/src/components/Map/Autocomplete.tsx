import React, { useState } from 'react';

declare var window: any;

export const googleAutocomplete = async text =>
  new Promise((resolve, reject) => {
    if (!text) {
      return reject("Need valid text input")
    }

    // for use in things like GatsbyJS where the html is generated first
    if (typeof window === "undefined") {
      return reject("Need valid window object")
    }

    try {
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        { input: text, componentRestrictions: { country: "gb" } },
        resolve
      )
    } catch (e) {
      reject(e)
    }
});

export default function PredictionsOnFormSubmission() {
  const [searchValue, setSearchValue] = useState("")
  const [predictions, setPredictions] = useState([])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const results: any = await googleAutocomplete(searchValue)
    if (results) {
      setPredictions(results)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="predictionSearch"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <img
        src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
        alt="Powered by Google"
      />
      {predictions?.map((prediction: any) => (
        <p key={prediction?.place_id}>
          {prediction?.structured_formatting?.main_text || "Not found"}
        </p>
      ))}
    </>
  )
}