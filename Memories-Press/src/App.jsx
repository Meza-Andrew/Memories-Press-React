import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

import Homepage from './components/Homepage';
import Products from './components/Products';
import Cart from './components/Cart';
import About from './components/About';
import Resources from './components/Resources';
import FuneralStationary from './components/FuneralStationary';
import ViewOrders from './components/ViewOrders';
import UpdateInfo from './components/UpdateInfo';
import ChangePassword from './components/ChangePassword';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PrayerCardDesigner from './components/PrayerCardDesigner';


function App() {
  const [user, setUser] = React.useState(false);
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout isLoggedIn={user} setUser={setUser}/>}>
                <Route index element={<Homepage isLoggedIn={user} />}/>
                <Route path='cart' element={<Cart />}/>
                <Route path='about' element={<About />}/>
                <Route path='resources' element={<Resources />}/>
                <Route path='funeralstationary' element={<FuneralStationary />}/>
                <Route path='vieworders' element={<ViewOrders />}/>
                <Route path='updateinfo' element={<UpdateInfo />}/>
                <Route path='changepassword' element={<ChangePassword />}/>
                <Route path='signin' element={<SignIn />}/>
                <Route path='signup' element={<SignUp />}/>
                <Route path='products'>
                  <Route index element={<Products />}/>
                  <Route path='prayercardeditor' element={<PrayerCardDesigner />}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
