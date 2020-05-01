import React, { useState, useEffect } from 'react';
import PokemonList from './pokemonList';
import axios from 'axios';
import Pagination from './pagination';


function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(each => each.name));

      return () => cancel.cancel();
    })
  }, [currentPageUrl])

  function goToNextPage(){
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage(){
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading Pokemon Data..." 

  return (
    <>
      < PokemonList pokemon={pokemon} />
      <Pagination 
        goToNextPage = {nextPageUrl ? goToNextPage : null}
        goToPrevPage = {prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
