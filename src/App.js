import React, { useState, useEffect } from 'react';

import PokemonList from './pokemonList';
import Pagination from './pagination';

import axios from 'axios';

import { Grid, Image, Container } from 'semantic-ui-react'


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
    if(nextPageUrl != null){
      setCurrentPageUrl(nextPageUrl);
    }
  }

  function goToPrevPage(){
    if(prevPageUrl != null){
      setCurrentPageUrl(prevPageUrl);
    }
  }

  if (loading) return "Loading Pokemon Data..." 

  return (
    <div style={{ backgroundColor: '#f2f2f2', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{width: '100%', height: '7.5vh', backgroundColor: '#2b2b2b', marginBottom: '4vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <h1 style={{ color: 'white', fontSize: '2rem' }}>PokeQuick</h1>
      </div>
      <Container fluid={false}>
        <Grid columns={3} centered={true} verticalAlign='middle'>
          <PokemonList pokemon={pokemon} />
        </Grid>
      </Container >
      <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage}/>
      <footer style={{height: '5vh', width: '100vw', backgroundColor: '#2b2b2b'}}></footer>
    </div>
  );
}

export default App;
