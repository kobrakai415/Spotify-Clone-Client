
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { Col } from 'react-bootstrap';
import CategoryContainer from './CategoryContainer';
const ApiUrl = process.env.REACT_APP_SPOTIFY_API

const CategoryPage = (props) => {

    const [categoryData, setCategoryData] = useState([])

    const { id } = useParams()

    const fetchCatData = async () => {
        try {
            console.log(id)
            const res = await fetch(`${ApiUrl}/browse/categories/${id}/playlists`,{
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            })
            const json = await res.json()

            setCategoryData(json.items)

            console.log(json)
            
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchCatData()
    }, [])

    return (
        <Col className="main-page main-page-mobile" xs={12} md={9} lg={10}>

            {categoryData.length > 0 ? categoryData.map(category => {
                <CategoryContainer cat={category}></CategoryContainer>
            }): <div>Error</div>}

        </Col>
    );
}

export default CategoryPage;
