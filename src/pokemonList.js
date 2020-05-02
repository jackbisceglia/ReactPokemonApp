import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Image, Grid } from 'semantic-ui-react';


export default function PokemonList({ pokemon }) {
    return (
        <>
            {pokemon.map(p => (
                <Grid.Column key={p} computer={'5'} mobile={'12'}>
                    <PokeCard p={p} />
                </Grid.Column>
            ))}
        </>
    )
}


function PokeCard({ p }) {
    let url = `https://pokeapi.co/api/v2/pokemon/${p}/`;

    const [attributes, setAttributes] = useState({});

    useEffect(() => {
        axios.get(url).then(res => {
            setAttributes({
                image: res.data.sprites.front_default,
                hp: res.data.stats[5].base_stat,
                atk: res.data.stats[4].base_stat,
                def: res.data.stats[3].base_stat,
                speed: res.data.stats[0].base_stat
            })
        })
    }, [])

    function capitalize(s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const name = capitalize(p);

    return (
        <Card raised={true} color={"grey"}>
            <Image src={attributes.image} wrapped ui={true} fluid={true} centered={true} />
            <Card.Content>
                <Card.Header textAlign="center" >{name}</Card.Header>
                <Card.Meta textAlign="center"> HP: {attributes.hp} </Card.Meta>
                <Card.Description textAlign="center">
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div style={{marginRight: '5px'}}>
                            <p>Attack: {attributes.atk}</p>
                            <p>Defense: {attributes.def}</p>
                            <p>Speed: {attributes.speed}</p>
                        </div>

                        <div style={{marginLeft: '5px'}}>
                            <p>Attack: {attributes.atk}</p>
                            <p>Defense: {attributes.def}</p>
                            <p>Speed: {attributes.speed}</p>
                        </div>
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    );
}



/*
<p>Speed: {attributes.speed}</p>
<p>Attack: {attributes.atk}</p>
<p>Defense: {attributes.def}</p>
*/