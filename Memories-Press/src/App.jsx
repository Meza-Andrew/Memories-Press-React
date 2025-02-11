import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Homepage from './components/Homepage';
import PrayerCards from './components/PrayerCards';
import Cart from './components/Cart';
import About from './components/About';
import Resources from './components/Resources';
import ViewOrders from './components/ViewOrders';
import UpdateInfo from './components/UpdateInfo';
import ChangePassword from './components/ChangePassword';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PrayerCardDesigner from './components/PrayerCardDesigner';
import Checkout from './components/Checkout';
import ProductEditor from './components/ProductEditor/ProductEditor';
import Bookmarks from './components/Bookmarks';
import MemorialHearts from './components/MemorialHearts';

function App() {
  const [user, setUser] = React.useState(false);

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout isLoggedIn={user} setUser={setUser} />}>
          <Route index element={<Homepage isLoggedIn={user} />} />
          <Route path='cart' element={<Cart />} />
          <Route path='about' element={<About />} />
          <Route path='resources' element={<Resources />} />
          <Route path='vieworders' element={<ViewOrders />} />
          <Route path='updateinfo' element={<UpdateInfo />} />
          <Route path='changepassword' element={<ChangePassword />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='prayercards'>
            <Route index element={<PrayerCards />}/>
            <Route path='prayercardeditor' element={<PrayerCardDesigner />} />
            <Route path='producteditor' element={<ProductEditor />} />
          </Route>
          <Route path='bookmarks'>
            <Route index element={<Bookmarks />}/>
            <Route path='producteditor' element={<ProductEditor />} />
          </Route>
          <Route path='memorialhearts'>
            <Route index element={<MemorialHearts />}/>
            <Route path='producteditor' element={<ProductEditor />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;