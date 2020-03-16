import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';

/**
* @author
* @class Footer
**/

class Footer extends Component {
 state = {}
 render() {
  return(
    <div className="container-fluid" style={{height: '10.20vh'}}>
        <div className="row" style={{ backgroundColor: '#1E1E1E', paddingTop: '9px', paddingBottom: '9px', height: '100%'}}>
        <div className="col-md-12" style={{}}>
            <h3 className="footer" style={{color:'white'}}>© 2020 Copyright: MDBootstrap.com</h3>
        </div>
        
        </div>
    </div>
    )
   }
 }


Footer.propTypes = {}
export default Footer