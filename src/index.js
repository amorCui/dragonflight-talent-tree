import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'

import reportWebVitals from './reportWebVitals'

// 天赋树
import Talent from './routes/talent/talent'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="talent" element={<Talent />} />
                <Route path="talent/:professional" element={<Talent />} />
                <Route path="talent/:professional/:spec" element={<Talent />} />
            </Route>
            <Route
                path="*"
                element={
                    <main style={{ padding: '1rem' }}>
                        <p>404</p>
                    </main>
                }
            />
        </Routes>
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
