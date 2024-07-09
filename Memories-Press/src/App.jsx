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
import UpdateContactInfo from './components/UpdateContactInfo';
import UpdateBusinessInfo from './components/UpdateBusinessInfo';
import UpdatePaymentInfo from './components/UpdatePaymentInfo';
import ChangePassword from './components/ChangePassword';

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
                <Route path='updatecontactinfo' element={<UpdateContactInfo />}/>
                <Route path='updatebusinessinfo' element={<UpdateBusinessInfo />}/>
                <Route path='updatepaymentinfo' element={<UpdatePaymentInfo />}/>
                <Route path='changepassword' element={<ChangePassword />}/>
                <Route path='products'>
                  <Route index element={<Products />}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
