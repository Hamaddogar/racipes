import React from 'react';
import {Redirect} from 'react-router-dom';

/**
* @author
* @function Protected
**/

const Protected = (props) => {
    if(localStorage.getItem('token')){
      var base64Url = localStorage.getItem('token').split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      console.log(JSON.parse(jsonPayload));
      var auth = JSON.parse(jsonPayload);
    }else{
      var auth = false;
    }
    
  return(
  <div>{auth ? <props.component /> : <Redirect to="/login"></Redirect>}</div>
   )

 }

export default Protected