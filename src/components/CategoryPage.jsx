
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Col } from 'react-bootstrap';
import PlaylistContainer from "./PlaylistContainer"
import { Row } from "react-bootstrap"

const ApiUrl = process.env.REACT_APP_SPOTIFY_API

const CategoryPage = (props) => {

    const [categoryData, setCategoryData] = useState([])

    const { category } = useParams()

    const fetchCatData = async () => {
        try {
            console.log(category)
            const res = await fetch(`${ApiUrl}/browse/categories/${category}/playlists`, {
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            })
            const json = await res.json()

            setCategoryData(json.playlists.items)

            console.log(json.playlists.items)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(async () => {
        await fetchCatData()
    }, [])

    return (
        <Col  className="main-page main-page-mobile" xs={12} md={9} lg={10}>
            <Row style={{position: "relative", height: "300px", backgroundColor: "green"}} className="mx-0 mb-3">
                <h1 style={{position: "absolute", bottom: "0"}}>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            </Row>
            <Row className="mx-0">
            <h4>Popular playlists</h4>
                {categoryData.length > 0 && categoryData.map(playlist => {
                    return <PlaylistContainer playlist={playlist}></PlaylistContainer>
                })}
            </Row>
        </Col>
    );
}

export default CategoryPage;
