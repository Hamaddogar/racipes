import React, { Component } from 'react';
import axios from 'axios';
import {NavLink, Redirect} from 'react-router-dom';
import './style.css';
import PropTypes from 'prop-types'

/**
* @author
* @class adminMain
**/

class adminMain extends Component {
 base_url;
 counter;

 constructor(props){
    super(props);

    this.counter = 0;

    var str = window.location.href;
    var pieces = str.split("/");
    var base_url = pieces[0]+'//'+pieces[2];
    this.base_url = base_url;

    this.state ={
        file: null,
        position: null,
        response: null,
        base_url: base_url,
        videos: [],
        number: 12,
        upload_completed: false,
        catalogues: []
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.junaid = this.junaid.bind(this);
    this.rmv = this.rmv.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.addStep = this.addStep.bind(this);
    this.changeevent = this.changeevent.bind(this);
 }

 async componentDidMount(){
    document.addEventListener("change", this.junaid);
    document.addEventListener("click", this.rmv);
    document.addEventListener("click", this.changeevent);

    var pieces = this.state.base_url.split(":");
	const url = pieces[0]+':'+pieces[1]+':4100/get_mainvideos_greater_than_default';
    
    const response = await fetch(url);
    const data = await response.json();
    this.setState({videos: data});
    if(data.length){
        var total = data.length;
        total = data[total - 1].position;
        this.state.number = total;
    }
    
    

    var str = window.location.href;
    var pieces = str.split("/");
    var base_url = pieces[0]+'//'+pieces[2];

    var previous = 12;
    var last = 12;


    if(this.state.videos.length != 0){
        document.getElementById('box').innerHTML = '';
        this.state.videos.map((item) => ccust(item));

        function ccust(item){
            var range = item.position - previous;
            range = range - 1;

            

            for(var i = 0; i< range; i++){
                last++;
        
                /* Creating div element */
                var div = document.createElement('div');
                div.className ="col-3 single_portfolio_text";
                //div.setAttribute("id", last);
                /* --------------------- */

                /* Creating span element */
                var span = document.createElement('span');
                span.className = "hiddenFileInput";
                span.setAttribute("id", last);
                /* --------------------- */

                /* Creating minus image element */
                var img = document.createElement('img');
                img.src = base_url+'/videos/minus.png';
                img.setAttribute("id", "rmv"+last);
                //img.addEventListener('click', () => this.removeStep(last), false);
                img.className = "minus-img";
                /* --------------------- */

                /* Creating progressbar element */
                var progressbar = document.createElement('progress');
                progressbar.value = 0;
                progressbar.max = 100;
                progressbar.style.display = 'none';
                progressbar.style.position = 'absolute';
                progressbar.style.top = '45%';
                progressbar.style.left = '26%';
                progressbar.style.width = '50%';
                progressbar.setAttribute("id", "progressbar"+last);
                /* ----------------------------- */
                
                /* Creating input element */
                var input=document.createElement('input');
                input.type="file";
                input.accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png,.gif";
                input.name = last;
                input.setAttribute("id", 'inp'+last);
                //input.addEventListener('change', () => this.addVideo, false);
                /* --------------------- */

                span.appendChild(img);
                span.appendChild(progressbar);
                span.appendChild(input);
                div.appendChild(span);

                const bd = document.getElementById('box');
                bd.appendChild(div);
                previous++;
            }
            if(item.position){
            
                /* Creating div element */
                var div = document.createElement('div');
                div.className ="col-3 single_portfolio_text";
                //div.setAttribute("id", item.position);
                /* --------------------- */

                /* Creating span element */
                var span = document.createElement('span');
                span.className = "hiddenFileInput";
                span.setAttribute("id", item.position);
                /* --------------------- */

                /* Creating minus image element */
                var img = document.createElement('img');
                img.src = base_url+'/videos/minus.png';
                img.setAttribute("id", "rmv"+item.position);
                //img.addEventListener('click', () => this.removeStep(item.position), false);
                img.className = "minus-img";
                /* --------------------- */

                /* Creating progressbar element */
                var progressbar = document.createElement('progress');
                progressbar.value = 0;
                progressbar.max = 100;
                progressbar.style.display = 'none';
                progressbar.style.position = 'absolute';
                progressbar.style.top = '45%';
                progressbar.style.left = '26%';
                progressbar.style.width = '50%';
                progressbar.setAttribute("id", "progressbar"+item.position);
                /* ----------------------------- */
                
                /* Creating input element */
                var input=document.createElement('input');
                input.type="file";
                input.accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png,.gif";
                input.name = item.position;
                input.setAttribute("id", 'inp'+item.position);
                //input.addEventListener('change', () => this.addVideo, false);
                /* --------------------- */

                span.appendChild(img);
                span.appendChild(progressbar);
                span.appendChild(input);
                div.appendChild(span);

                const bd = document.getElementById('box');
                bd.appendChild(div);
            }
            previous++;
            last = item.position;
        }
        
    }




    var pieces = base_url.split(":");
    var urli = pieces[0]+':'+pieces[1]+':4100/get_catalogue';
    const responsee = await fetch(urli);
    const dataa = await responsee.json();
    this.setState({catalogues: dataa});
    
 }

 rmv(event){
    if(event.target.id.match(/rmv/g)){
        var pieces = event.target.id.split('rmv');
        this.removeStep(pieces[1]);
    }
 }

 junaid(event){
    if(event.target.id.match(/inp/g)){
       this.onChange(event);
    }
 }

changeevent(event){
    if(event.target.id.match(/change/g)){
    var num = event.target.id.split('change');
    document.getElementById('inp'+num[1]).click();
    }
}

 async removeStep(num){
    //this.state.number = this.state.number - 1;
    
    var dat_length;
    var total;
    var vids;
    const formData = {
        position: num
    }

    var pieces = this.state.base_url.split(":");
    
    await axios({
        method: 'post',
        url: pieces[0]+':'+pieces[1]+':4100/remove_main_video',
        //url: 'http://45.79.55.117:4100/remove_main_video',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        total = response.data.length;
        total = response.data[total - 1].position;
        vids = response.data;
        //this.setState({videos: response.data});
        //console.log(this.state.number);
        console.log(response.data);
        console.log(response.data.length);
        dat_length = response.data.length;
        //alert(response.data[response.data.length - 1].position);
        
    })
    .catch(function (error) {
        console.log(error);
    });
    this.setState({number: total});

    var str = window.location.href;
    var pieces = str.split("/");
    var base_url = pieces[0]+'//'+pieces[2];

    var videos = '';
    var vidsrc;
    var previous = 12;
    var num = 1;
    var last = 12;
    var first = true;

    // if(dat_length == 0){
    //     document.getElementById('steps-box').innerHTML = '';
    //     /* Creating div element */
    //     var div = document.createElement('div');
    //     div.className ="col-md-4 col-sm-4 col-xs-4 single_portfolio_text";
    //     //div.setAttribute("id", item.position);
    //     /* --------------------- */

    //     /* Creating span element */
    //     var span = document.createElement('span');
    //     span.className = "hiddenFileInput img-center";
    //     /* --------------------- */

    //     /* Creating minus image element */
    //     var img = document.createElement('img');
    //     img.src = base_url+'/videos/plus.png';
    //     //img.setAttribute("id", "rmv"+item.position);
    //     img.addEventListener('click', () => this.addStep(), false);
    //     img.className = "plus-img";
    //     /* --------------------- */

    //     span.appendChild(img);
    //     div.appendChild(span);
    //     const bd = document.getElementById('box');
    //     bd.appendChild(div);
    //     this.state.number = 0;
    // }
    
    
    if(typeof dat_length === 'undefined'){
        document.getElementById('box').innerHTML = '';
        this.state.number = 12;
    }else{
        document.getElementById('box').innerHTML = '';
        vids.map((item) => ccust(item));

        function ccust(item){
            //var pieces = item.mimetype.split("/");
            var range = item.position - previous;
            range = range - 1;

            

            for(var i = 0; i< range; i++){
                last++;
                //videos += '<div class="col-md-4 col-sm-4 col-xs-4 single_portfolio_text"><span class="hiddenFileInput"><img src="./videos/minus.png" class="minus-img"><input type="file" name="'+last+'" onchange= "addVideo()" accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png,.gif"/></span></div>';
                //first = false;
        
                /* Creating div element */
                var div = document.createElement('div');
                div.className ="col-3 single_portfolio_text";
                //div.setAttribute("id", last);
                /* --------------------- */

                /* Creating span element */
                var span = document.createElement('span');
                span.className = "hiddenFileInput";
                span.setAttribute("id", last);
                /* --------------------- */

                /* Creating minus image element */
                var img = document.createElement('img');
                img.src = base_url+'/videos/minus.png';
                img.setAttribute("id", "rmv"+last);
                img.addEventListener('click', () => this.removeStep(last), false);
                img.className = "minus-img";
                /* --------------------- */

                /* Creating progressbar element */
                var progressbar = document.createElement('progress');
                progressbar.value = 0;
                progressbar.max = 100;
                progressbar.style.display = 'none';
                progressbar.style.position = 'absolute';
                progressbar.style.top = '45%';
                progressbar.style.left = '26%';
                progressbar.style.width = '50%';
                progressbar.setAttribute("id", "progressbar"+last);
                /* ----------------------------- */
                
                /* Creating input element */
                var input=document.createElement('input');
                input.type="file";
                input.accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png,.gif";
                input.name = last;
                input.setAttribute("id", 'inp'+last);
                //input.addEventListener('change', () => this.addVideo, false);
                /* --------------------- */

                span.appendChild(img);
                span.appendChild(progressbar);
                span.appendChild(input);
                div.appendChild(span);

                const bd = document.getElementById('box');
                bd.appendChild(div);
                previous++;
            }
            if(item.position){
                //videos += '<div class="col-md-4 col-sm-4 col-xs-4 single_portfolio_text"><span class="hiddenFileInput"><img src="./videos/minus.png" class="minus-img"><input type="file" name="'+item.position+'" onchange= "addVideo()" accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png,.gif"/></span></div>';
                // first = false;
            
                /* Creating div element */
                var div = document.createElement('div');
                div.className ="col-3 single_portfolio_text";
                //div.setAttribute("id", item.position);
                /* --------------------- */

                /* Creating span element */
                var span = document.createElement('span');
                span.className = "hiddenFileInput";
                span.setAttribute("id", item.position);
                /* --------------------- */

                /* Creating minus image element */
                var img = document.createElement('img');
                img.src = base_url+'/videos/minus.png';
                img.setAttribute("id", "rmv"+item.position);
                img.addEventListener('click', () => this.removeStep(item.position), false);
                img.className = "minus-img";
                /* --------------------- */

                /* Creating progressbar element */
                var progressbar = document.createElement('progress');
                progressbar.value = 0;
                progressbar.max = 100;
                progressbar.style.display = 'none';
                progressbar.style.position = 'absolute';
                progressbar.style.top = '45%';
                progressbar.style.left = '26%';
                progressbar.style.width = '50%';
                progressbar.setAttribute("id", "progressbar"+item.position);
                /* ----------------------------- */
                
                /* Creating input element */
                var input=document.createElement('input');
                input.type="file";
                input.accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png,.gif";
                input.name = item.position;
                input.setAttribute("id", 'inp'+item.position);
                //input.addEventListener('change', () => this.addVideo, false);
                /* --------------------- */

                span.appendChild(img);
                span.appendChild(progressbar);
                span.appendChild(input);
                div.appendChild(span);

                const bd = document.getElementById('box');
                bd.appendChild(div);
            }
            previous++;
            last = item.position;
        }
    }
    
    window.location.reload();
    
 }

 addStep(){
    
    var str = window.location.href;
    var pieces = str.split("/");
    var base_url = pieces[0]+'//'+pieces[2];
    
    this.state.number = this.state.number + 1;


    /* Creating input element */
    var input=document.createElement('input');
    input.type="file";
    input.accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png,.gif";
    // input.name = this.state.number + 1;
    input.name = this.state.number;
    input.setAttribute("id", this.state.number);
    input.addEventListener('change', this.onChange, false);
    /* --------------------- */

    /* Creating progressbar element */
    var progressbar = document.createElement('progress');
    progressbar.value = 0;
    progressbar.max = 100;
    progressbar.style.display = 'none';
    progressbar.style.position = 'absolute';
    progressbar.style.top = '45%';
    progressbar.style.left = '26%';
    progressbar.style.width = '50%';
    progressbar.setAttribute("id", "progressbar"+this.state.number);
    /* ----------------------------- */

    /* Creating span element */
    var span = document.createElement('span');
    span.className = "hiddenFileInput";
    span.setAttribute("id", this.state.number);
    /* --------------------- */

    var number = this.state.number;

    /* Creating minus image element */
    var img = document.createElement('img');
    img.src = base_url+'/videos/minus.png';
    img.addEventListener('click', () => this.removeStep(number), false);
    img.className = "minus-img";
    /* --------------------- */

    /* Creating div element */
    var div = document.createElement('div');
    div.className ="col-3 single_portfolio_text";
    //div.setAttribute("id", this.state.number);
    /* --------------------- */

    span.appendChild(img);
    span.appendChild(progressbar);
    span.appendChild(input);
    div.appendChild(span);

    // if(document.getElementById('steps')){
    //     const bd = document.getElementById('steps-box');
    //     bd.insertBefore(div,bd.childNodes[this.state.number + 1]);
    //     //this.state.number = this.state.number + 1;
    // }else{
    //     const bd = document.getElementById('steps-box');
    //     bd.insertBefore(div,bd.childNodes[this.state.number - 1]);
    // }
    const bd = document.getElementById('box');
    bd.appendChild(div, bd);
 }

 async onFormSubmit(img,position){
     this.counter = this.counter + 1;
     if(this.counter < 2){

     
    var inputs = document.getElementsByTagName("INPUT");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'file') {
            inputs[i].disabled = true;
        }
    }
    

    var formData = new FormData();
    formData.append('myImage',img);
    formData.append('position',position);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        },
        onUploadProgress: function (event) {
            
            var pid = 'progressbar'+position;
            document.getElementById(pid).style.display = 'block';
            var percent = (event.loaded / event.total) * 100;
            document.getElementById(pid).value = Math.round(percent);
            console.log(percent);
            if(percent == 100){
                //document.getElementById(pid).style.display = 'none';
                
                var inputs = document.getElementsByTagName("INPUT");
                for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].type === 'file') {
                        inputs[i].disabled = false;
                    }
                }
            }
        }
    };

    var pieces = this.state.base_url.split(":");
	var url = pieces[0]+':'+pieces[1]+':4100/upload';
    
    await axios.post(url,formData,config)
        .then((response) => {
            // var str = window.location.href;
            // var res = str.replace(/admin-main/gi, "");
            // res = res+'admin-recipe-steps/'+response.data._id;
            // window.location.replace(res);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    this.counter = this.counter - 1;
    }
}

onChange(e) {
    //console.log(e.target.files[0]);
    this.setState({file:e.target.files[0]});
    this.setState({position:e.target.name});
    this.onFormSubmit(e.target.files[0], e.target.name);
}



//  addVideo(event){
//     event.preventDefault();
//     var file = event.target.files[0];
//     this.setState({
//         selectedFile: event.target.files[0],
//         loaded: 0,
//     });
//     //entries(this.state.selectedFile);
//     const data = new FormData();
//     data.append('file', file);

//     fetch('http://localhost:4100/mainvideoadd',{
//         method: "POST",
//         headers:{
            
//         },
//         body: JSON.stringify({
//             "file": file
//         })
//     })
//     .then(res => res.json())
//     .catch(err => console.log(err));
    
//     // axios.post("http://localhost:4100/upload", data, { 
//     //   // receive two    parameter endpoint url ,form data
//     // })
//     // .then(res => { // then print response status
//     //     console.log(res.statusText)
//     // })
// }

 state = {}
 render() {
     if(this.state.catalogues[0]){
        //console.log(this.state.catalogues);
        this.state.catalogues.map((item) => ccust(item));
        
        
		
        function ccust(item){
            var str = window.location.href;
            var pieces = str.split("/");
            var base_url = pieces[0]+'//'+pieces[2];
            console.log(item);
            var elem = document.getElementById(item.position);
            var media = item.mimetype.split("/");
            var elementhide = document.getElementById('inp'+item.position);
            elementhide.style.display = 'none';

            var div = document.createElement('div');
            div.setAttribute("class", "change-btn");
            div.setAttribute("id", "change"+item.position);
            div.appendChild(document.createTextNode("Change"));
            div.style.cursor = 'pointer';
            //div.addEventListener('click', () => this.havefun(item.position), false);

            elem.appendChild(div);

            if(media[0] == 'video'){
                var anchor = document.createElement("A");
                anchor.setAttribute("href",base_url+"/admin-recipe-steps/"+item._id);

                var vid = document.createElement("VIDEO");
                vid.setAttribute("autoplay", "autoplay");
                vid.setAttribute("loop", "loop");
                //vid.addEventListener('click', () => this.changeVideo(), false);
                vid.setAttribute("src",base_url+"/videos/recipe-main/"+item.filename+"."+media[1]);
                //vid.setAttribute("id", "media"+item.filename+"media"+item.mimetype);
                vid.className = "front-media";
                vid.muted = true;
                vid.setAttribute("preload","preload");
                vid.setAttribute("poster",base_url+'/videos/loading.gif')
                vid.style.minHeight = "88%";
                vid.style.objectFit = 'fill';
                vid.style.width = "100%";
                anchor.appendChild(vid);
                elem.appendChild(anchor);
            }
            if(media[0] == 'image'){
                var anchor = document.createElement("A");
                anchor.setAttribute("href",base_url+"/admin-recipe-steps/"+item._id);
                
                var img = document.createElement("img");
                img.setAttribute("src",base_url+"/videos/recipe-main/"+item.filename+"."+media[1]);
                //vid.setAttribute("id", "media"+item.filename+"media"+item.mimetype);
                img.className = "front-media";
                img.style.minHeight = "88%";
                img.style.width = "100%";
                anchor.appendChild(img);
                elem.appendChild(anchor);
            }
        }
     }
  return(
	<div style={{backgroundColor: '#000', display: 'inline-block',paddingTop:'0px',paddingBottom:'0px'}} className="container-fluid mobile-rules">
        <div className="row">
        {/* <video className="sticky-top" style={{width:'100%'}} autoPlay loop muted src={require('../../assets/videos/recipe-main/ffaee27768c27dfd61e351d84373e646')} /> */}
                    <div className="col-3 single_portfolio_text">
                        <span id="1" className="hiddenFileInput">
                            <progress id="progressbar1" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '26%', width: '50%'}}></progress>
                            <input id="inp1" type="file" name="1" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                        {/* <NavLink to="/Adminview">
                            <div style={{minHeight:'300px',maxHeight:'400px',backgroundColor:'darkgray',border:'1px solid black'}}>
                            </div>
                        </NavLink>    */}
                    </div>
                    <div className="col-3 single_portfolio_text">
                        <span id="2" className="hiddenFileInput">
                            <progress id="progressbar2" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '26%', width: '50%'}}></progress>
                            {/* <div onClick={() => this.havefun('2')}>change</div> */}
                            {/* <video style={{minHeight: '88%', width: '100%'}} className="front-media" autoPlay loop muted preload="true" poster="./videos/loading.gif" src="./videos/recipe-main/2d6cee98ae40fca31b8158aeb91b1da3.mp4"></video> */}
                            <input type="file" id="inp2" name="2" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                    </div>
                    <div className="col-3 single_portfolio_text">
                        <span id="3" className="hiddenFileInput">
                            <progress id="progressbar3" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '26%', width: '50%'}}></progress>
                            <input id="inp3" type="file" name="3" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                    </div>
                    <div className="col-3 single_portfolio_text" >
                        <span id="4" className="hiddenFileInput">
                            <progress id="progressbar4" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '26%', width: '50%'}}></progress>
                            <input id="inp4" type="file" name="4" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                    </div>
                    <div className="col-3 single_portfolio_text">
                        <span id="5" className="hiddenFileInput">
                            <progress id="progressbar5" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '26%', width: '50%'}}></progress>
                            <input id="inp5" type="file" name="5" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                    </div>
                    <div className="col-3 single_portfolio_text">
                        <span id="6" className="hiddenFileInput">
                            <progress id="progressbar6" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '26%', width: '50%'}}></progress>
                            <input id="inp6" type="file" name="6" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                    </div>

                    <div className="col-3 single_portfolio_text">
                        <span id="7" className="hiddenFileInput">
                            <progress id="progressbar7" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '26%', width: '50%'}}></progress>
                            <input id="inp7" type="file" name="7" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                    </div>

                    <div className="col-3 single_portfolio_text">
                        <span id="8" className="hiddenFileInput">
                            <progress id="progressbar8" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '26%', width: '50%'}}></progress>
                            <input id="inp8" type="file" name="8" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                    </div>
                    <div className="col-3 single_portfolio_text">
                        <span id="9" className="hiddenFileInput">
                            <progress id="progressbar9" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '30%'}}></progress>
                            <input id="inp9" type="file" name="9" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                    </div>
                    <div className="col-3 single_portfolio_text">
                        <span id="10" className="hiddenFileInput">
                            <progress id="progressbar10" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '26%', width: '50%'}}></progress>
                            <input id="inp10" type="file" name="10" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                    </div>
                    <div className="col-3 single_portfolio_text">
                        <span id="11" className="hiddenFileInput">
                            <progress id="progressbar11" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '26%', width: '50%'}}></progress>
                            <input id="inp11" type="file" name="11" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                    </div>
                    <div className="col-3 single_portfolio_text">
                        <span id="12" className="hiddenFileInput">
                            <progress id="progressbar12" value="0" max="100" style={{display: 'none', position: 'absolute', top: '45%', left: '26%', width: '50%'}}></progress>
                            <input id="inp12" type="file" name="12" onChange= {this.onChange} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png"/>
                        </span>
                    </div>
                    <div id="box" style={{display: 'contents'}}>

                    </div>
                    <div className="col-3 single_portfolio_text">
                        <span className="hiddenFileInput img-center">
                            <img onClick={this.addStep} className="plus-img" src={this.state.base_url+"/videos/plus.png"}/>
                        </span>
                    </div>
                
            
        </div>
    </div>
	)
   }
 }


adminMain.propTypes = {}
export default adminMain