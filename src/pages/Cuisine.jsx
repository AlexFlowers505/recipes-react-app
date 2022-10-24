import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import {Link, useParams} from 'react-router-dom'

export default function Cuisine() {

    const [cuisine, setCuisine] = useState([])
    let params = useParams()
    
    const getCuisineData = async (cuisineName) => {
        const cuisineRecipes = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&cuisine=${cuisineName}`).then(response => response.json())
        setCuisine(cuisineRecipes.results)
    }
    useEffect(() => {
        getCuisineData(params.cuisineType)
    }, [params.cuisineType])
    return (
        <Grid>
            {cuisine.map( elm => {
            return (
                <Card key={elm.id}>
                    <img src={elm.image} alt={elm.title} />
                    <h4>{elm.title}</h4>
                </Card>
            )
            })}  
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;