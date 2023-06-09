import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import ProductList from './pages/ProductList/ProductList';
import ProductPage from './pages/ProductPage/ProductPage';
import Login from './pages/Login/Login';
import Admin from './components/Admin/Admin';
import Addgame from './components/Admin/Addgame';
import Orders from './components/Admin/Orders';
import GameList from './components/Admin/GameList';
import Users from './components/Admin/Users';
import UpdateGame from './components/Admin/UpdateGame';
import Signup from './pages/Login/Signup';
import Cart from './pages/Cart/Cart';
import Cartstate from './context/CartState';
import Payment from './pages/payment/Payment';
import UserOrders from './pages/orders/UserOrders';
import Notfound from './pages/404/Notfound';
import Uploader from './components/Admin/Uploader';
import Category from './pages/Category/Category';
import Invoice from './pages/Invoice/Invoice';
import Bills from './components/Admin/Bills';
import Contactus from './components/Admin/Contactus';
import Dashboard from './components/Admin/Dashboard';

function App() {
  return (
    <div className="App">
      <Cartstate>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/productlist' element={<ProductList/>}/>
            <Route path='/productpage/:id' element={<ProductPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/userorders' element={<UserOrders/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/category' element={<Category/>}/>
            <Route path='/invoice/:id' element={<Invoice/>}/>
            <Route path='*' element={<Notfound/>}/> 
          </Route>
          <Route path='/admin' element={<Admin/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='addgame' element={<Addgame/>}/>
            <Route path='addgame/uploader/:id' element={<Uploader/>}/>
            <Route path='gamelist/updategame/:id' element={<UpdateGame/>}/>
            <Route path='gamelist' element={<GameList/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path='users' element={<Users/>}/>
            <Route path='bills' element={<Bills/>}/>
            <Route path='contacted' element={<Contactus/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </Cartstate>
    </div>
  );
}

export default App;
