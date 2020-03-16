import React, { Component, useState, useRef, useEffect } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import'./style.css';
import axios from 'axios';

class signUp extends Component {
	constructor(props){
		super(props);
		this.state ={
			username: null,
			email: null,
			password: null
		}
		this.checkvalues = this.checkvalues.bind(this);
		this.spinner = this.spinner.bind(this);
	}

	spinner(){
		var load = document.getElementById('loading');
		load.style.display = 'block';
	}

	checkvalues(){
		var err = document.getElementById('validation-errors');
		err.style.display = 'none';



		if(document.getElementById('username').value != '' && document.getElementById('email').value != '' && document.getElementById('password').value != ''){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  			if(!re.test(this.state.email)){
				var eml = document.getElementById('email-errors');
				eml.style.display = 'block';
			}else{
				var eml = document.getElementById('email-errors');
				eml.style.display = 'none';
				var element = document.getElementById('payment-btns');
				element.style.display = 'block';
			}
		}else{
			var message = document.getElementById('validation-errors');
			message.style.display = 'block';
		}
	}
	
    render() {
		var str = window.location.href;
		var pieces = str.split("/");
		var base_url = pieces[0]+'//'+pieces[2];
        return (
            <div>
                <div className="wrapper">
			<div className="innerSign">
			<h5 className="head" style={{marginBottom: '20px', margin: '0 auto'}}>Sign Up</h5>
				<div id="loading" style={{width: '100px', display: 'none', margin: '0 auto'}}>
					<img src={base_url+'/videos/loading.gif'} />
				</div>
				<div id="validation-errors" style={{border: '2px solid red', color: 'red', display: 'none', marginTop: '24px'}}>
					All Fields are Required!
				</div>
				<div id="email-errors" style={{border: '2px solid red', color: 'red', display: 'none', marginTop: '24px'}}>
					Valid Email is Required!
				</div>
				<form className="forms" >
					
					<label className="form-group" id="paaass" >
						<input type="text" id="username" onChange={ (e) => {this.setState({username: e.target.value})}} className="form-control"  required />
						<span className="paaass" style={{marginRight: '385px'}}>Username</span>
						<span className="border"></span>
					</label>
					<label className="form-group" id="paas">
						<input type="email" id="email" style={{width: '100%', margin: '0px'}} onChange={ (e) => {this.setState({email: e.target.value})}} className="form-control"  required />
						<span className="paas">Email</span>
						<span className="border"></span>
					</label>
                    <label className="form-group" id="paaas">
						<input type="password" id="password" onChange={ (e) => {this.setState({password: e.target.value})}} className="form-control"  required />
						<span className="paaas" >Password</span>
						<span className="border"></span>
					</label>
					
					<div style={{marginBottom: '30px', color: '#666666', border: '2px solid #666666', cursor: 'pointer'}} onClick={this.checkvalues} className="but">Submit
						<i className="zmdi zmdi-arrow-right"></i>
					</div>

					<div id="payment-btns"  style={{display: 'none'}}>
						<PayPalButton onClick={this.spinner}
							amount="12"
							// shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
							onSuccess={ async(details, data) => {

								const config = {
									headers: {
										'content-type': 'application/json'
									}
								};
								
								var str = window.location.href;
								var parts = str.split(":");
								
								const url = parts[0]+':'+parts[1]+':4100/signup';
								
								//await axios.post("http://localhost:4100/login",JSON.stringify({username: this.state.username, password: this.state.password}),config)
								//await axios.post("http://45.79.55.117:4100/login",JSON.stringify({username: this.state.username, password: this.state.password}),config)
								await axios.post(url,JSON.stringify({username: this.state.username, email: this.state.email, password: this.state.password}),config)
								.then((response) => {
									console.log(response.data);

									if(localStorage.getItem('guest')){
										localStorage.removeItem('guest');
									}
									localStorage.setItem('usertoken', response.data.info);
									localStorage.setItem('username', response.data.username);
									if(localStorage.getItem('usertoken') && localStorage.getItem('username')){
										var str = window.location.href;
										var pieces = str.split("/");
										var base_url = pieces[0]+'//'+pieces[2];

										var load = document.getElementById('loading');
										load.style.display = 'none';

										window.location.replace(base_url);
									}
								}).catch((error) => {
									console.log(error);
								});

							// OPTIONAL: Call your server to save the transaction
							// return fetch("/paypal-transaction-complete", {
							// 	method: "post",
							// 	body: JSON.stringify({
							// 	orderId: data.orderID
							// 	})
							// });
							}}
							options={{
								clientId: "Aa3al6pj3obfP9FIoC9WyydbWIsQQPWFCUhL5UWNI4faIvWpjI0LElFTn-Y2GyMAN1jRoyBssX6Efo0M"
							}}
						/>
					</div>
				</form>
			</div>
		</div>
            </div>
        );
    }
}

export default signUp;