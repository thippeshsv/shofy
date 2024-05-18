import React,{useContext,  useEffect,  useState} from 'react'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import logo from '../Assets/logo.png';
import { ToastContainer,toast } from 'react-toastify';

import cart from '../Assets/cart.svg'
// import wishist from '../assets/wishlist.svg'
import {Link} from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
// import nav_dropdown from '../Assets/navbar_dropdown.svg'
import person_icon from '../Assets/person.svg'

 



const Navbar = () => {



  let userName = localStorage.getItem('name')
let imageName = localStorage.getItem('image')


const profileImage = imageName ? require(`../../Backend/uploads/${imageName}`) : null;



useEffect(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);

const handleBeforeUnload = () => {
  // Remove user data from localStorage when the session ends
  localStorage.removeItem('name');
  localStorage.removeItem('image');
};

console.log(profileImage)
    let[menu, setMenu] = useState('Home')
    let {getTotalCartItem} = useContext(ShopContext);
    // let history = useHistory()
let [user, setUser] = useState(null);
 
useEffect (() => {
  let loggedInUser = localStorage.getItem('user');
  if(loggedInUser){
    setUser(JSON.parse(loggedInUser));
  }
}, []);




let navigate = useNavigate()

let[category, setCategory] = useState('')

let category1 = category.charAt(0).toUpperCase() + category.slice(1);

let handleSubmit =() =>{
  console.log("Category:", category);
  if(category.trim() !== ''){
    // let category1 = category.charAt(0).toUpperCase() + category.slice(1);
    navigate(`/${category1}`);

  }
}

let [theme, setTheme] = useState('light')

let toggleTheme =() =>{
  setTheme(theme === 'light'? 'dark': 'light')
}
// useEffect(()=>{
//   if(category1.trim() !== ''){
//     let timeOutId = setTimeout(()=>{
//       navigate(`/${category1}`)
//     },2000)
//     return ()=>clearTimeout(timeOutId)
//   }
// },[category, category1, navigate])


  return (
    <nav className='navbar navbar-expand-lg '>
     
            <div className="nav-logo">
                <img src={logo} alt="sofy" />
                <p>SHOFY</p>
                
            </div>
            <button class="btn navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
            <ul className='nav-menu' >
            <li onClick={()=>{setMenu('Home')}}><Link style={{textDecoration: 'none', color : 'black'}} to='/'>Home {menu === 'Home'?<hr/>:<></>}</Link> </li>
                    <li onClick={()=>{setMenu('Mens')}}><Link style={{textDecoration: 'none', color : 'black'}}  to='/Mens'>Mens {menu === 'Mens'?<hr/>:<></>}</Link> </li>
                    <li onClick={()=>{setMenu('Womens')}}><Link style={{textDecoration: 'none', color : 'black'}} to='/Womens'>Womens {menu === 'Womens'?<hr/>:<></>}</Link> </li>
                    <li onClick={()=>{setMenu('Kids')}}><Link style={{textDecoration: 'none', color : 'black'}} to='/Kids'>Kids {menu === 'Kids'?<hr/>:<></>}</Link> </li>
                    <li onClick={()=>{setMenu('About')}}><Link style={{textDecoration: 'none', color : 'black'}} to='/About'>About {menu === 'About'?<hr/>:<></>}</Link>  </li>
            </ul>
          

         
            <form className="d-flex mx-auto me-5  border border-warning border-3" onSubmit={handleSubmit}>
                        <input className="form-control rounded-0 "
                         type="search"
                         value={category}
                         onChange={(e)=> {setCategory(e.target.value)}}
                         placeholder="Search for products...."
                          aria-label="Search"
                           />
                        <button className="btn btn-warning  rounded-0" type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        </form>

                        <div className='theme'>
                        <button className='theme-toggle btn me-3' onClick={toggleTheme}>
        <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
      </button>
      {/* <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                
                /> */}
                        </div>
                  
                    <div className="login-cart">
                    {userName && <span className='fw-bold'>{userName}</span>}
      {profileImage && <img src={profileImage} className='rounded-3' alt="User Profile" />}

                    <Link style={{textDecoration: 'none', color : 'black'}} to='/Login'><img src={person_icon} alt="" /></Link> 
                      <Link style={{textDecoration: 'none'}} to='/cart'><img className='me-4' src={cart} alt="" /></Link> 
                      <div className="cart-counter">{getTotalCartItem()}</div>
      
                  </div>
               
                   
        
        </div>

    </nav>
  )
}

export default Navbar;
