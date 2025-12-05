import { StrictMode } from 'react'
import ReactDOM from "react-dom/client"
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";
import "./index.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
