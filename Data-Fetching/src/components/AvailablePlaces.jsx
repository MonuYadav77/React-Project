import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  // fetch function :- used to send http req to some other server
  //useEfect to excute fetch only once
  //one Way:-
  // useEffect(() =>{
  //   fetch("http://localhost:3000/places")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((resData) => {
  //       setAvailablePlaces(resData.places);
  //     });
  // },[]);

  useEffect(() => {
    async function fetchplaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();

        //location using navigator from browser
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlacs = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlacs);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message: error.message || "Could not fetch ! please again !",
        });
        setIsFetching(false);
      }
    }
    fetchplaces();
  }, []);
  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
