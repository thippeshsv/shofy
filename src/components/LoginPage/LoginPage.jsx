

  
    // const handleLogin = async (event) => {
    //   event.preventDefault(); // Prevent default form submission
    
    //   try {
    //     const response = await axios.post('http://localhost:3001/Login', {
    //       email,
    //       password
    //     });
    
    //     if (!response.ok) {
    //       const errorData = response.data;
    //       throw new Error(errorData.error || 'Failed to login');
    //     }
    
    //     const { token } = response.data; // Extract token from response
    //     localStorage.setItem('token', token); // Store token in localStorage
    //     navigate('/'); // Redirect to home page
    //   } catch (error) {
    //     console.error('Login error:', error);
    //     setErrorMessage(error.message);
    //   }
    // };
  
   

   
    


    import React,{useState} from 'react';
    import './Login.css'
    import {Link, useNavigate} from 'react-router-dom';
  //  import axios from 'axios'
  import { ToastContainer,toast } from 'react-toastify';

    
  let LoginPage = () =>{

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('')

let navigate = useNavigate()
   const handleLogin = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    
      formData.append('email', email); // Add email to FormData
      formData.append('password', password);
console.log(formData)
    try {
      const response = await fetch('http://localhost:3001/Login', {
        method : 'POST',

     body: formData
    });
      console.log(response)

      if (response.status === 200) {
        
        const data = await response.json(); 
      let {token} = data
      console.log(data.user)

       localStorage.setItem('token', token);
  localStorage.setItem('name',data.user.name);
  localStorage.setItem('email', data.user.email)
  localStorage.setItem('image', data.user.profile_pic);
  console.log(JSON.stringify(data))
  // console.log(data.user.name);
  // console.log(data.token)


        console.log('Login successful');

        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.error);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  }
  return (
        <div className="login">
          <div className="login-container shadow">
           <h1>Login</h1>
           <form action="http://localhost:3001/Login" method='post' onSubmit={handleLogin}>

           <div className="login-fields">
              <input type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address" />
              <input type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}placeholder="Password" />
             <button className="btn btn-danger " type="submit" >Login</button>
             {/* <ToastContainer
                position="top-center"
                autoClose={3000}
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
           </form>
          

              {/* <p className="error-message">{errorMessage}</p> */}
              <p className="login-login">New User <span><Link to="/Signup" style={{ textDecoration: 'none', color: 'red', fontWeight: 'bolder' }}> Create Account</Link></span></p>
               <div className="login-agree">
                 <input type="checkbox" name="" id="" />
                 <p>I Agree to all Terms and conditions </p>
              </div>
              <p className=''>Switch to <span className='text-danger fw-bold'><Link to='/AdminSignup' style={{textDecoration: 'none'}}>Business Account</Link></span> </p>

            </div>

           </div>
      )
   
  }
    
    export default LoginPage;
    





















































  

  
  
  





  // (
  //   <div className="login">
  //     <div className="login-container shadow">
  //       <h1>Login</h1>
  //       <div className="login-fields">
  //       <form onSubmit={handleLogin} >
          
  //           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
  //           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
  //           <button className="btn btn-danger button" type="submit">Login</button>
       
  //       </form>
  //       </div>
  //       {/* <p className="error-message">{errorMessage}</p> */}
  //       <p className="login-login">New User <span><Link to="/Signup" style={{ textDecoration: 'none', color: 'red', fontWeight: 'bolder' }}> Create Account</Link></span></p>
  //       <div className="login-agree">
  //         <input type="checkbox" name="" id="" />
  //         <p>I Agree to all Terms and conditions </p>
  //       </div>
  //     </div>
  //   </div>
  // );