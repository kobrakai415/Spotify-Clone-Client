import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from "react"
import Login from './components/login.jsx';
import Auth from "./components/Auth.js"


const client_secret = "ede976d713b14614b050b8afe5c3ac0c"

const code = new URLSearchParams(window.location.search).get("code")

class App extends Component {

  state = {
    token: null,
    
  }

  
  render() {

    return (
      <div className="App">
        {code ? <Auth code={code}></Auth> : <Login></Login>}
      </div>
    );
  }
}

export default App;

