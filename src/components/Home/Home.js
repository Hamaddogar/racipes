import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './style.css';
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";


/**
* @author
* @class Home
**/

class Home extends Component {
	//state = {}
	base_url;

	constructor(props){
		super(props);
		
		var str = window.location.href;
		var pieces = str.split("/");
		this.base_url = pieces[0]+'//'+pieces[2];

		this.state = {
			catalogues: [],
			videos: null,
			base_url: this.base_url,
			username: null
		}

		
	}
	
	
	async componentDidMount(){
		
		// fetch('http://localhost:4100/testing')
		// .then(res => res.json())
		// .then(catalogues => this.setState({catalogues}))
		// .catch(err => console.log(err));

		//const url = 'http://45.79.55.117:4100/get_catalogue';

		var pieces = this.base_url.split(":");
		const url = pieces[0]+':'+pieces[1]+':4100/get_catalogue';
		const response = await fetch(url);
		const data = await response.json();
		this.setState({catalogues: data});
		document.getElementById('main').innerHTML = this.state.videos;
	}

	

	render() {
		// const catalogues_videos = this.state.catalogues.map((item) => <div key={item._id} className="col-md-3 col-sm-4 col-xs-12 single_portfolio_text">
		// 																<NavLink key={item._id} to={'/recipe-steps/'+item._id}>
		// 																	<video style={{width:'100%',paddingRight:'6px'}} autoPlay loop muted src={require('../../assets/videos/recipe-main/'+item.filename)} />
		// 																</NavLink>
		// 															</div>
		// );
		// if(!this.props.show) {
		// 	return null;
		//   }
		var str = window.location.href;
		var pieces = str.split("/");
		var base_url = pieces[0]+'//'+pieces[2];

		var videos = '';
		var vidsrc;
		var previous = 0;
		var num = 1;
		var last = 0;
		
		if(this.state.catalogues.length != 0){
			this.state.catalogues.map((item) => ccust(item));
		
			function ccust(item){
				var pieces = item.mimetype.split("/");
				var range = item.position - previous;
				range = range - 1;

				var ext = item.mimetype.split("/");

				
				if(item.position == num){
					if(ext[0] == 'image'){
						videos +='<div style="padding-right: 5px;" class="col-3 single_portfolio_text"><a href="/recipe-steps/'+item._id+'"><img class="home-front-media" style="height: 98%;" src="'+base_url+'/videos/recipe-main/'+item.filename+'.'+ext[1]+'"/></a></div>';
					}else{
						videos += '<div class="col-3 single_portfolio_text" style="padding-right: 5px;"><a href="/recipe-steps/'+item._id+'"><video class="home-front-media" style="width: 100%; paddingRight: 6px;" autoPlay loop muted preload poster="'+base_url+'/videos/loading.gif" src="'+base_url+'/videos/recipe-main/'+item.filename+'.'+pieces[1]+'"></video></a></div>';
					}
				}else{
					//vidsrc = require('../../../public/videos/recipe-main/'+item.filename);
					for(var i = 0; i< range; i++){
						videos += '<div style="padding-right: 5px;" class="col-3 single_portfolio_text"><img class="front-media" style="height: 98%;" src="'+base_url+'/videos/no-media.jpg"/></div>';
						previous++;
					}
					if(ext[0] == 'image'){
						videos +='<div style="padding-right: 5px;" class="col-3 single_portfolio_text"><a href="/recipe-steps/'+item._id+'"><img class="home-front-media" style="height: 98%;" src="'+base_url+'/videos/recipe-main/'+item.filename+'.'+ext[1]+'"/></a></div>';
					}else{
					videos += '<div style="padding-right: 5px;" class="col-3 single_portfolio_text"><a href="/recipe-steps/'+item._id+'"><video class="home-front-media" style="width: 100%; paddingRight: 6px;" autoPlay loop muted preload poster="'+base_url+'/videos/loading.gif" src="'+base_url+'/videos/recipe-main/'+item.filename+'.'+pieces[1]+'"></video></a></div>';
					}
				}
				num++;
				previous++;
				last = item.position;
			}

			if(this.state.catalogues[this.state.catalogues.length - 1].position < 12){
				var limit = 12 - this.state.catalogues[this.state.catalogues.length - 1].position;
				for(var j = 0; j<limit; j++){
					videos += '<div style="padding-right: 5px;" class="col-3 single_portfolio_text"><img style="height: 98%;" class="front-media" src="'+base_url+'/videos/no-media.jpg"/></div>';
				}
			}
			//console.log(last);
			// for(var j = 0; j < 12-last; j++){
			// 	console.log(j);
			// 	videos += '<div style="padding-right: 5px;" class="col-md-3 col-sm-4 col-xs-12 single_portfolio_text"><img style="height: 98%;" src="'+img_src+'"/></div>';
			// }
			this.state.videos = videos;
		}else{
			for(var i = 0; i< 12; i++){
				
				videos += '<div style="padding-right: 5px;" class="col-3 single_portfolio_text"><img style="height: 98%;" class="front-media" src="'+base_url+'/videos/no-media.jpg"/></div>';
			}
			this.state.videos = videos;
		}
		
		
  		return(
			
			<div style={{backgroundColor: '#000', display: 'inline-block',paddingBottom: '0px', paddingTop: '0px'}} className="container-fluid mobile-rules">
				<div></div>
				{localStorage.getItem('username')? <div className="row">
						<div className="col-md-10 col-sm-10"></div>
						<div className="col-md-2 col-sm-2">
							<div style={{color: 'white', float: 'left', margin: '20px 0px 20px 10px'}}>Hello, {localStorage.getItem('username')}</div>
							<NavLink to="/logout">
								<div style={{display: 'inline-block', backgroundColor: '#cccccc', padding: '5px 20px', borderRadius: '5px', margin: '20px 0px 20px 10px', color: '#555', fontFamily: 'sans-serif', fontSize: '14px'}}>Log out</div>
							</NavLink>
						</div>
					</div>:
					<div className="row">
						<div className="col-md-10 col-sm-10"></div>
						<div className="col-md-2 col-sm-2">
							<NavLink to="/signup">
								<div style={{display: 'inline-block', backgroundColor: '#E2574C', padding: '5px 20px', borderRadius: '5px', margin: '20px 0px 20px 0px', color: '#cbcbcb', fontFamily: 'sans-serif', fontSize: '14px'}}>Sign up</div>
							</NavLink>
							<NavLink to="/login">
								<div style={{display: 'inline-block', backgroundColor: '#cccccc', padding: '5px 20px', borderRadius: '5px', margin: '20px 0px 20px 10px', color: '#555', fontFamily: 'sans-serif', fontSize: '14px'}}>Log in</div>
							</NavLink>
						</div>
					</div>
				}
				

	 		<div style={{paddingLeft: '4px'}} id="main" className="row">
				
				</div>
			</div>
		)
	}
}


Home.propTypes = {}
export default Home