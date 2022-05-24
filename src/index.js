import reactDom from "react-dom";
import App from './components/App'
import './assets/styles/reset.css'
import './assets/styles/style.css'

const element = document.querySelector(".root");
ReactDOM.render(<App />, element);