import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

/**
* @author
* @class instructionSteps
**/

const modalRoot = document.getElementById('steps-box');
var el;

class instructionSteps extends Component {
    constructor(props){
        super(props);
        this.el = document.createElement('div');
        el.className = "col-md-4 col-sm-4 col-xs-4 single_portfolio_text";
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

 state = {}
 render() {
    return ReactDOM.createPortal(
        this.props.children,
        this.el,
    );
 }
}