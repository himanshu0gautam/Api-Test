import React from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom"
import { Rag } from './pages/Rag'

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route 
        path='/' 
        element={
          <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100vh", alignItems: "center", justifyContent: "center"}}>
            <h1>Welcome to My Project</h1>
            <a href="/rag">Rag route</a>
          </div>
        } 
        />
        <Route path='/rag' element={<Rag />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoute