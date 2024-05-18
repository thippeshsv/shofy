
import './App.css';


import Navbar from './components/navbar/Navbar';
// import Slider from './components/Slider/Slider';
// import Popular from './components/popular/Popular';
// import NewCollection from './components/NewCollection/NewCollection';
import Footer from './components/Footer/Footer';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/cart';
// import Login from './Pages/login';
import men_banner from './components/Assets/banner_mens.png'
import women_banner from './components/Assets/banner_women.png'
import kids_banner from './components/Assets/banner_kids.png'
import About from './components/About/About';
import CheckOut from './components/checkout/CheckOut';
import LoginPage from './components/LoginPage/LoginPage';
import Signup from './Pages/login';
import Admin from './components/AdminForm/Admin';
import AdminNavBar from './components/AdminNavbar/AdminNavBar';
import AdminLogin from './components/AdminForm/AdminLogin';
import AdminPage from './components/AdminForm/AdminPage';



function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      

      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/Mens' element={<ShopCategory banner={men_banner} category='men'/>}/>
        <Route path='/Womens' element={<ShopCategory banner={women_banner} category='women'/>}/>
        <Route path='/Kids' element={<ShopCategory banner={kids_banner} category='kid'/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/CheckOut' element={<CheckOut/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/AdminSignup' element={<Admin/>}/>
        <Route path ='AdminLogin' element={<AdminLogin/>}/>
        <Route path ='AdminPage' element={<AdminPage/>}/>
      </Routes>
<Footer/>
      </BrowserRouter>
     
    
    </div>
  );
}

export default App;
