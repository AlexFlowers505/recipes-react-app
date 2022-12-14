import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { Link } from 'react-router-dom'

export default function PopularSection() {

    const [popularData, setPopularData] = useState([])

    useEffect(() => {
        getPopularData()
    }, [])

    // either getting data from api or getting already gathered data from local storage
    const getPopularData = async () => {
        const check = localStorage.getItem('popular')
        if (check) {
            setPopularData(JSON.parse(check))
        } else {
            const data = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9`).then(response => response.json())
            setPopularData(data.recipes)    // because we know that there is 'recipes' prop inside of a gathered data
                
            localStorage.setItem('popular', JSON.stringify(data.recipes))
            setPopularData(data.recipes)
            console.log(data.recipes)
        }
    }

    return (
        <div>
            <Wrapper>
                <h3>Popular picks</h3>
                <Splide options={{
                    perPage: 5,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '4rem'
                }}>
                    {popularData.map(recipe => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={'/recipe/'+recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                        <Gradient/>
                                    </Link>
                                </Card>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`
const Card = styled.div`
    min-height: 25rem;
    position: relative;
    border-radius: 2rem;    
    overflow: hidden;

    img  {
        border-radius: 2rem;    
        overflow: hidden;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const Gradient = styled.div `
    z-index: 3;
    top: 0%;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.5))
`