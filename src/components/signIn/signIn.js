import React, { Component } from 'react';
import'./style.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class signIn extends Component {
    constructor(props){
        super(props);
        var str = window.location.href;
        var pieces = str.split("/");
        var base_url = pieces[0]+'//'+pieces[2];
        this.state = {
            email: null,
            password: null,
            signedin: false,
            base_url: base_url
        }
        this.frmSubmit = this.frmSubmit.bind(this);
        if(localStorage.getItem('token')){
            //this.setState({signedin: true});
            this.state.signedin = true;
            window.history.back();
        }
    }


    async frmSubmit(){
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if(email == '' || password == ''){
            document.getElementById('fields').style.display = 'block';
            document.getElementById('incorrectemail').style.display = 'none';
            document.getElementById('incorrect').style.display = 'none';
            return;
        }else{
            document.getElementById('fields').style.display = 'none';
        }
        if(email != '' && password != ''){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  			if(!re.test(email)){
                document.getElementById('incorrectemail').style.display = 'block';
                document.getElementById('fields').style.display = 'none';
                document.getElementById('incorrect').style.display = 'none';
			}else{
				document.getElementById('incorrectemail').style.display = 'none';
			}
		}else{
			
		}
        

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        
        var pieces = this.state.base_url.split(":");
	    const url = pieces[0]+':'+pieces[1]+':4100/login';

        //await axios.post("http://localhost:4100/login",JSON.stringify({username: this.state.username, password: this.state.password}),config)
        //await axios.post("http://45.79.55.117:4100/login",JSON.stringify({username: this.state.username, password: this.state.password}),config)
        await axios.post(url,JSON.stringify({email: this.state.email, password: this.state.password}),config)
        .then((response) => {
            
            if(response.data.msg){
                document.getElementById('incorrect').style.display = 'block';
                document.getElementById('incorrectemail').style.display = 'none';
                return;
            }else{
                document.getElementById('incorrect').style.display = 'none';
                document.getElementById('incorrectemail').style.display = 'none';
                document.getElementById('fields').style.display = 'none';
            }
            if(response.data.info.user_type == 'admin'){
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.info.username);
                localStorage.removeItem('guest');
                if(localStorage.getItem('guest')){
                    localStorage.removeItem('guest');
                }
                if(localStorage.getItem('token')){
                    var str = window.location.href;
                    var pieces = str.split("/");
                    var base_url = pieces[0]+'//'+pieces[2];
                    window.location.replace(base_url+'/admin-main');
                }
            }
            if(response.data.info.user_type == 'user'){
                if(localStorage.getItem('guest')){
                    localStorage.removeItem('guest');
                }
                localStorage.setItem('usertoken', response.data.token);
                localStorage.setItem('username', response.data.info.username);
                if(localStorage.getItem('usertoken')){
                    var str = window.location.href;
                    var pieces = str.split("/");
                    var base_url = pieces[0]+'//'+pieces[2];
                    window.location.replace(base_url);
                }
            }
            

        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        
        return (
             
            // <div>
            //     {this.state.signedin? <div></div>:
            
            //     }
            // </div>   
            <div>
                {this.state.signedin? <div></div>:
                <div className="wrapper" data-spy="scroll">
			<div className="inner">
				
					<h5 className="head">Log In</h5>
                    <div id="fields" style={{color: 'red', border: '2px solid red', marginTop: '10px', display: 'none'}}>
                        <p style={{padding: '0px', margin: '0px'}}>All Fields are Required!</p>
                    </div>
                    <div id="incorrect" style={{color: 'red', border: '2px solid red', marginTop: '10px', display: 'none'}}>
                        <p style={{padding: '0px', margin: '0px'}}>Email or Password Incorrect!</p>
                    </div>
                    <div id="incorrectemail" style={{color: 'red', border: '2px solid red', marginTop: '10px', display: 'none'}}>
                        <p style={{padding: '0px', margin: '0px'}}>Incorrect Email!</p>
                    </div>
					<label className="form-group">
						<input type="text" id="email" style={{margin: '0px', width: '100%'}} onChange={ (e) => {this.setState({email: e.target.value})}} className="form-control"  required />
						<span className="paaas">Email</span>
						<span className="border"></span>
					</label>
					<label className="form-group">
						<input type="password" style={{color: '#666666 !important'}} id="password" onChange={ (e) => {this.setState({password: e.target.value})}} className="form-control"  required />
						<span className="paas" >Password</span>
						<span className="border"></span>
					</label>
                   
					<button onClick={this.frmSubmit} className="but">Sign In
						<i className="zmdi zmdi-arrow-right"></i>
					</button>
                    <p id="signed">Do not have account !</p>
                    <NavLink to="/signup">
                    <button onClick={this.frmSubmit} className="btun">Sign up
						<i className="zmdi zmdi-arrow-right"></i>
					</button>
                    </NavLink>
				
				
			</div>
		</div>
    }
            </div> 

        );
    }
}

export default signIn;