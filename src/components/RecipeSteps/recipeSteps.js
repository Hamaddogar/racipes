import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';
//import Page from 'react-page-loading';
import Modal from 'react-responsive-modal';
import axios from 'axios';

/**
* @author
* @class recipeSteps
**/

class recipeSteps extends Component {
 //state = {}

//  cat_id;
//  data;
state = {
  open:true,
};

onOpenModal = () => {
  if(localStorage.getItem('guest') || localStorage.getItem('usertoken') || localStorage.getItem('token')){
    this.setState({ open: false });
  }else{
    this.setState({ open: true });
  }
};

onCloseModal = () => {
  this.setState({ open: false });
};
activeVideo;
base_url;
 constructor(props){
    super(props);


    var str = window.location.href;
    var pieces = str.split("/");
    this.base_url = pieces[0]+'//'+pieces[2];

    this.state = {
        currentVideo: [],
        allVideos: [],
        available: false,
        videos: [],
        mainid: props.match.params.id,
        base_url: this.base_url,
        active_video: null,
        type: null,
        open:false
    }

    if(localStorage.getItem('guest')){
      window.location.replace(this.base_url+'/login');
    }

    if(localStorage.getItem('usertoken') || localStorage.getItem('token')){

    }else{
      localStorage.setItem('guest', 'guest user');
      this.state.open = true;
    }

    this.changeVideo = this.changeVideo.bind(this);
    this.player = this.player.bind(this);
 }

 player(event){
  if(event.target.id.match(/media/g)){
    var pieces = event.target.id.split('media');
    var extention = pieces[2].split("/");
    var fullname = pieces[1]+"."+extention[1];
    this.setState({type: extention[0]});
    this.changeVideo(fullname);
  }
 }

 async emailcapture(){
    var email = document.getElementById('email').value;
    var str = window.location.href;
    var pieces = str.split("/");
    var base_url = pieces[0]+'//'+pieces[2];
    var pieces = base_url.split(":");
    const url = pieces[0]+':'+pieces[1]+':4100/emailcapture';
    
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };
    await axios.post(url,JSON.stringify({email: email}),config)
    .then((response) => {
        console.log(response.data);
        var popcontent = document.getElementById('popcontent');
        popcontent.style.display = 'none';
        var thanks = document.getElementById('thankyou');
        thanks.style.display = 'block';
    }).catch((error) => {
        console.log(error);
    });
 }

 async componentDidMount(){
  var str = window.location.href;
  var pieces = str.split("/");
  var base_url = pieces[0]+'//'+pieces[2];

  var pieces = base_url.split(":");
  const addr = pieces[0]+':'+pieces[1]+':4100/get_main_single/'+this.state.mainid;
  const main_response = await fetch(addr);
  const main_data = await main_response.json();
  var mextention = main_data[0].mimetype.split("/");
  var mfullname = main_data[0].filename+"."+mextention[1];
  this.setState({type: mextention[0]});
  this.setState({active_video: this.state.base_url+'/videos/recipe-main/'+mfullname});



  var pieces = base_url.split(":");
	const url = pieces[0]+':'+pieces[1]+':4100/get_video_steps/'+this.state.mainid;
  //const url = 'http://localhost:4100/get_video_steps/'+this.state.mainid;
  //const url = 'http://45.79.55.117:4100/get_video_steps/'+this.state.mainid;
  const response = await fetch(url);
  const data = await response.json();
  this.setState({videos: data});

  

  if(data.length){
    var ext = data[0].mimetype.split('/');
    this.setState({active_video: base_url+'/videos/recipe-steps/'+data[0].filename+'.'+ext[1]});
    this.setState({type: ext[0]});
  }
  
  

  document.addEventListener("click", this.player);

  var videos = '';
  var vidsrc;
  var previous = 0;
  var num = 2;
  var last = 0;
  var first = true;
  
  

    if(this.state.videos.length != 0){
      this.setState({available: true});
      this.state.videos.map((item) => ccust(item));

      function ccust(item){
          //var pieces = item.mimetype.split("/");
          var range = item.position - previous;
          range = range - 1;

          for(var i = 0; i< range; i++){
            last++;
              
            /* Creating div element */
            var div = document.createElement('div');
            div.className ="col-4 single_portfolio_text";
            div.setAttribute("id", item.position);
            /* --------------------- */

            /* Creating Image element */
            var img = document.createElement('img');
            img.src = base_url+'/videos/no-media.jpg';
            img.style.width = '100%';
            img.style.height = '98%';
            /* ---------------------- */
            
            div.appendChild(img);

            const bd = document.getElementById('steps');
            bd.appendChild(div);

            previous++;
          }
          if(item.position){
            
            var extention = item.mimetype;
            var pieces = extention.split("/");


            /* Creating div element */
            var div = document.createElement('div');
            div.className ="col-4 single_portfolio_text";
            div.setAttribute("id", item.position);
            /* --------------------- */

            var type = item.mimetype.split("/");
            if(type[0] == 'image'){
              /* Creating Image element */
              var img = document.createElement('img');
              img.src = base_url+'/videos/recipe-steps/'+item.filename+'.'+type[1];
              img.setAttribute("id", "media"+item.filename+"media"+item.mimetype);
              img.className = "front-media";
              img.style.width = '100%';
              img.style.height = '100%';
              /* ---------------------- */
              div.appendChild(img);
            }else{
              /* Creating Video element */
              var vid = document.createElement("VIDEO");
              vid.setAttribute("autoplay", "autoplay");
              vid.setAttribute("loop", "loop");
              //vid.addEventListener('click', () => this.changeVideo(), false);
              vid.setAttribute("src",base_url+"/videos/recipe-steps/"+item.filename+"."+pieces[1]);
              vid.setAttribute("id", "media"+item.filename+"media"+item.mimetype);
              vid.className = "front-media";
              vid.muted = true;
              vid.setAttribute("preload","preload");
              vid.setAttribute("poster",base_url+'/videos/loading.gif')
              vid.style.width = '100%';
              vid.style.objectFit = 'fill';
              vid.style.minHeight = '33.33vh';
              vid.style.maxHeight = '33.33vh';
              vid.style.paddingLeft = '5px';
              /* ---------------------- */
              div.appendChild(vid);
            }
            
            

            const bd = document.getElementById('steps');
            bd.appendChild(div);
            
          }
          previous++;
          last = item.position;
      }
      
  }

}

changeVideo = (name) => {
  this.setState({active_video: this.base_url+'/videos/recipe-steps/'+name});

  console.log(this.state.active_video);
};

 render() {
  // const stepVideos = this.state.allVideos.map(item => <div key={item.id} className="col-md-4 col-sm-4 col-xs-4 single_portfolio_text">
  //                                                       <video onClick={() => this.changeVideo(item.id)} key={item.id} style={{width:'100%', paddingLeft: '5px'}} autoPlay loop muted  src={"./videos/"+item.path} />
  //                                                     </div>);
  
  // if(this.state.available == true){
  //   var extention = this.state.videos[0].mimetype;
  //   var pieces = extention.split("/");
  //   this.activeVideo = this.state.videos[0].filename+"."+pieces[1];
  // }else{
  //   this.activeVideo = '';
  // }
  const { open } = this.state;
  
  var str = window.location.href;
  var pieces = str.split("/");
  var base_url = pieces[0]+'//'+pieces[2];

  


  return(
    <div>
    <div className="row steps-content" style={{width: '100%', backgroundColor: '#000'}}>
        
        <div style={{padding: '5px 0px 5px 5px'}} className="col-5">
          
        <a className="bck-btn" style={{padding: '0px', border: 'none'}} href={base_url}><img src={base_url+'/videos/close.png'}/></a>
          {this.state.type == 'image'? <img src={this.state.active_video} className="steps-vid-player" style={{maxHeight: '98vh'}}/> : <video className="steps-vid-player" style={{width:'100%', maxHeight: '98vh', objectFit: 'fill', position: 'sticky'}} autoPlay loop preload poster = {this.base_url+'/videos/loading.gif'} src={this.state.active_video} />}
            
        </div>
        <div className="col-7 single_portfolio_text mobile-rules" style={{backgroundColor: '#000'}}>
            <div className="row" style={{margin: '0px', paddingTop: '5px', paddingRight: '5px'}}>
              <div id="steps" style={{display: 'contents'}}>
                
              </div>
            </div>
        </div>
	</div>
  {/* <Page loader={"bar"} size={1}> */}
                
        <Modal open={this.state.open}  onClose={this.onCloseModal} center>
            <div style={{backgroundColor:'white',height:'160px',width:'400px'}}>
              <div id="popcontent">
                <h6 id="heads">WHERE SHOULD WE SEND THE COOKBOOK?</h6>
                <input type="text" id="email" placeholder="E-mail" style={{color: '#000000 !important'}}/>
                <button onClick={this.emailcapture} id="load" value="">SEND ME THE COOKBOOK</button>
                <p style={{color:'grey',fontSize:'12px',textAlign:'center',marginRight:'13px'}}>Privacy Policy: We hate spam and promise your email address is safe.</p>
              </div>
              <div id="thankyou" style={{display: 'none'}}>
                <h1 style={{color: '#333333'}}>Thank You!</h1>
              </div>
            </div>
        </Modal>
                {/* </Page> */}
  </div>
    )
   }
 }


recipeSteps.propTypes = {}
export default recipeSteps