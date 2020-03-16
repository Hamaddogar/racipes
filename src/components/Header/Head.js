import React, { Component } from 'react';
import './style.css';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

/**
* @author
* @class Head
**/

class Head extends Component {
 state = {}
 render() {
  return(
    <div className="container-fluid" style={{height: '10.20vh'}}>
        <div className="row" style={{ backgroundColor: '#1E1E1E', height: '100%'}}>
            <div className="center" style={{}}>
                <NavLink to="/">
                    <img src={require('./Log.png')} alt="no img" style={{width:'29%',padding:'5px 5px'}} className="center"/>
                </NavLink>
            </div>
        </div>
    </div>
    )
   }
 }


Head.propTypes = {}
export default Head