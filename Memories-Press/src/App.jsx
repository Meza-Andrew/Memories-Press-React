import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Homepage from './components/Homepage';

function App() {
  const [user, setUser] = React.useState('true');
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout isLoggedIn={user}/>}>
                <Route index element={<Homepage isLoggedIn={user}/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
