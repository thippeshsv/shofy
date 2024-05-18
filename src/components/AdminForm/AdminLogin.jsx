import React,{useState} from 'react'
import{useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const AdminLogin = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('')
    let navigate = useNavigate();
    let UserName = localStorage.getItem('name')



    let handleLogin = async (event)=>{
        event.preventDefault();
        const formData = new FormData();

        formData.append('email', email); // Add email to FormData
        formData.append('password', password);
  console.log(formData)

  try{
    let response = await fetch('http://localhost:3001/adminLogin', {
        method: 'POST',
        body: formData
    })
    console.log(response);

    if(response.status === 200){
        let data = await response.json();
        let {token} = data
        console.log(response)


        // toast.success(`Welcome ${UserName} `)
        setTimeout(() => {
          navigate('/AdminPage');
        }, 3000);;


        localStorage.setItem('token', token);
        localStorage.setItem('name',data.user.name);
    }

  }catch(error){
    console.log('signup error', error)

  }

    }

  return (
    
        <div className="login">
           
          <div className="login-container shadow">
           <h1 className='text-success fw-bold'> Admin Login</h1>
           <form action="http://localhost:3001/AdminLogin" method='post' onSubmit={handleLogin}>

           <div className="login-fields">
              <input type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address" />
              <input type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}placeholder="Password" />
             <button className="btn btn-primary " type="submit" >Login</button>
             <ToastContainer
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
                
                />
            </div>
           </form>
          

              {/* <p className="error-message">{errorMessage}</p> */}
              {/* <p className="login-login">New User <span><Link to="/Signup" style={{ textDecoration: 'none', color: 'red', fontWeight: 'bolder' }}> Create Account</Link></span></p> */}
               <div className="login-agree">
                 <input type="checkbox" name="" id="" />
                 <p>I Agree to all Terms and conditions </p>
              </div>
              </div>
              </div>
    
  )
}

export default AdminLogin
