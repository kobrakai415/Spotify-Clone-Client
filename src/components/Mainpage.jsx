import { Component } from "react"
import { Col, Row } from "react-bootstrap"
import Category from "./Category.jsx"
import SongContainer from "./SongContainer.jsx"


class Mainpage extends Component {

    state = {
        browseAll: null,
        
    }

    componentDidMount = async () => {
        
        await this.props.token ? this.fetchBrowseAll() : console.log("no token yet")
    }

 
    fetchBrowseAll = async () => {
        try {
            let response = await fetch("https://api.spotify.com/v1/browse/categories", {
                headers: {
                    "Authorization": "Bearer " + this.props.token
                }
            })

            console.log(await this.props.token)
            console.log(response)

            let json = await response.json()

            console.log(json)
            this.setState({ browseAll: json.categories.items })
            
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        return (
            <Col className=" main-page main-page-mobile" xs={12} md={9} lg={10}>
            {<div id="search-bar-parent" onChange={(e) => this.props.queryHandler(e)}>
            <input id="search-bar" placeholder="Songs, Artists or Albums"/>
            <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                    </svg>
            </div>}
               <h3 className="py-3 px-2">Your Top Genres</h3>
                
               <Row className="mx-0">
            <h3 className="py-3 px-2">Browse All</h3>
            
               {this.state.browseAll && this.state.browseAll.map(item =>{
                
                return <Category cat={item}></Category>

            })}


               </Row>
            </Col>



        )
    }
}

export default Mainpage