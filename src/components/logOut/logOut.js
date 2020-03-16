import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
* @author
* @class logOut
**/

class logOut extends Component {
    constructor(props){
        super(props);
        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            var str = window.location.href;
            var pieces = str.split("/");
            var base_url = pieces[0]+'//'+pieces[2];
            window.location.replace(base_url+'/login');
        }else{
            var str = window.location.href;
            var pieces = str.split("/");
            var base_url = pieces[0]+'//'+pieces[2];
            window.location.replace(base_url+'/login');
        }

        if(localStorage.getItem('usertoken')){
            localStorage.removeItem('usertoken');
            localStorage.removeItem('username');
            var str = window.location.href;
            var pieces = str.split("/");
            var base_url = pieces[0]+'//'+pieces[2];
            window.location.replace(base_url);
        }else{
            var str = window.location.href;
            var pieces = str.split("/");
            var base_url = pieces[0]+'//'+pieces[2];
            window.location.replace(base_url+'/login');
        }
        
    }
 state = {}
 render() {
  return(
   <div></div>
    )
   }
 }


logOut.propTypes = {}
export default logOut