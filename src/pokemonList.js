import React, { useState } from 'react';
import axios from 'axios';
import { Card, Image, Grid } from 'semantic-ui-react';


export default function PokemonList({ pokemon }) {
    return (
        <>
        {pokemon.map(p => (
            <Grid.Column computer={'5'} mobile={'10'} width={'4'}>
                <PokeCard key={p} p={p} />
            </Grid.Column>
        ))}
        </>
    )
}


function PokeCard({ p }) {
    let url = `https://pokeapi.co/api/v2/pokemon/${p}/`;
  
    const [attributes, setAttributes] = useState({});

    axios.get(url).then(res => {
        setAttributes({
            image : res.data.sprites.front_default,
            hp : '',
            atk : '',
            def : '',
            speed : ''
        })
    })




    function capitalize(s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const name = capitalize(p);

    return (
        <Card>
            <Image src={attributes.image} wrapped ui={true} size={'medium'} />
            <Card.Content>
                <Card.Header textAlign="center" >{name}</Card.Header>
                <Card.Meta textAlign="center"> {`Grass Type Pokemon`} </Card.Meta>
                <Card.Description textAlign="center">
                    Daniel is a comedian living in Nashville.
                </Card.Description>
            </Card.Content>
        </Card>
    );
}