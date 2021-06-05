import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./components/Home.jsx"
import { Component } from "react"

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {})

  window.location.hash = "";

const client_id = "ede976d713b14614b050b8afe5c3ac0c"
// const client_secret = "ede976d713b14614b050b8afe5c3ac0c"
const AUTHORIZE = "https://accounts.spotify.com/authorize"
const redirect_uri = "http://localhost:3000"


class App extends Component {

  state = {
    token: null,
    
  }

  componentDidMount = () => {
    // Set token
    let _token = hash.access_token
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }

  componentDidUpdate = () => {

  }

  getAuthorized = async () => {

    let url = AUTHORIZE;

    url += "?client_id=" + client_id;
    url += "&response_type=token";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; 
    // Show Spotify's authorization screen


  }

  // getAccessToken = async () => {

  //   try {
      
  //     const body = `grant_type=authorization_code&code=${this.state.token}&redirect_uri=${encodeURIComponent("http://localhost:3000")}`
      
      

  //     const response = await fetch("https://accounts.spotify.com/api/token", { method: "POST", headers: {"content-type": "application/x-www-form-urlencoded", Authorization: `Basic ${btoa(client_id)}:${btoa(client_secret)}`}, body: body })
  //     const json = await response.json()
  //     console.log(response)
  //     console.log(json)
  //     this.setState({ accessToken: json })
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  render() {

    return (
      <div className="App">
        {!this.state.token && <button onClick={this.getAuthorized} >Login</button>}
        {this.state.token && <Home token={this.state.token} ></Home>}
      </div>
    );
  }
}

export default App;

