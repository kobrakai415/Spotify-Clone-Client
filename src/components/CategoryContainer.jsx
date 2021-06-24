import React from "react"
import { withRouter } from "react-router-dom"

class Category extends React.Component {


    directToPlaylist = (id) => {
        try {
            
         this.props.history.push(`/category/${id}`)   
        } catch (error) {
            console.log(error)
        }
        

    }

    render() {
        return(

           <div key={this.props.cat.id} onClick={() => this.directToPlaylist(this.props.cat.id)} className="category-container d-flex align-items-center justify-content-center mb-4 col-6 col-md-4 col-lg-3 col-xl-2">
                
                <img className="img-fluid" src={this.props.cat.icons[0].url} height={150} alt="category-cover"></img>
                <span className="category-text-overlay text-center">{this.props.cat.name}</span>

            </div>

        )
    }
}
export default withRouter(Category)