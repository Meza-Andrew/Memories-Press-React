import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Homepage from './components/Homepage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Homepage />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
