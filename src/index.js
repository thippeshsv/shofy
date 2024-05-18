import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import ShopContextProvider from './Context/ShopContext';
import {ToastContainer} from  'react-toastify'
// import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <ShopContextProvider>
<App />

<ToastContainer
   position="top-right"
   autoClose={3000}
  //  hideProgressBar
   newestOnTop={false}
   closeOnClick
   rtl={false}
   pauseOnFocusLoss
   draggable
   pauseOnHover
   theme="light" />

 </ShopContextProvider>
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
