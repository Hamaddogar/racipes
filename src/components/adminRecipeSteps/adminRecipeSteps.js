import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';


/**
* @author
* @class adminRecipeSteps
**/

class adminRecipeSteps extends Component {

    counter;

 constructor(props, context){
    super(props, context);

    this.counter = 0;

    var str = window.location.href;
    var pieces = str.split("/");
    var main_id = pieces[pieces.length - 1];

    var str = window.location.href;
    var pieces = str.split("/");
    var base_url = pieces[0]+'//'+pieces[2];
    
    this.state={
        number: 0,
        mainid: main_id,
        fun: null,
        videos: [],
        base_url: base_url,
        type: null,
        active_video: null
    };
    
    this.addVideo = this.addVideo.bind(this);
    this.addStep = this.addStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.junaid = this.junaid.bind(this);
    this.rmv = this.rmv.bind(this);
    this.player = this.player.bind(this);
    this.changeevent = this.changeevent.bind(this);
 }

 async componentDidMount(){
    var pieces = this.state.base_url.split(":");
    const addr = pieces[0]+':'+pieces[1]+':4100/get_main_single/'+this.state.mainid;
    const main_response = await fetch(addr);
    const main_data = await main_response.json();
    var mextention = main_data[0].mimetype.split("/");
    var mfullname = main_data[0].filename+"."+mextention[1];
    this.setState({type: mextention[0]});
    this.setState({active_video: this.state.base_url+'/videos/recipe-main/'+mfullname});

    

    


    var pieces = this.state.base_url.split(":");
	const url = pieces[0]+':'+pieces[1]+':4100/get_video_steps/'+this.state.mainid;
    //const url = 'http://localhost:4100/get_video_steps/'+this.state.mainid;
    //const url = 'http://45.79.55.117:4100/get_video_steps/'+this.state.mainid;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({videos: data});
    console.log(this.state.videos);
    if(data.length){
        this.setState({number: data[data.length - 1].position});
    }
    
    //this.setState({number: data[data.length - 1].position});
    
    document.addEventListener("change", this.junaid);
    document.addEventListener("click", this.rmv);
    document.addEventListener("click", this.player);
    document.addEventListener("click", this.changeevent);

    // var elem = document.getElementById('initial');
    // elem.parentNode.removeChild(elem);

    var str = window.location.href;
    var pieces = str.split("/");
    var base_url = pieces[0]+'//'+pieces[2];

    var videos = '';
    var vidsrc;
    var previous = 0;
    var num = 2;
    var last = 0;
    var first = true;

    if(this.state.videos.length != 0){
        document.getElementById('steps-box').innerHTML = '';
        this.state.videos.map((item) => ccust(item));

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
                div.className ="col-4 single_portfolio_text";
                //div.setAttribute("id", last);
                /* --------------------- */

                /* Creating span element */
                var span = document.createElement('span');
                span.className = "hiddenFileInput";
                span.setAttribute('id', last);
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
                input.setAttribute("id", "inp"+last);
                //input.addEventListener('change', () => this.addVideo, false);
                /* --------------------- */

                span.appendChild(img);
                span.appendChild(progressbar);
                span.appendChild(input);
                div.appendChild(span);

                const bd = document.getElementById('steps-box');
                bd.appendChild(div);
                previous++;
            }
            if(item.position){
                //videos += '<div class="col-md-4 col-sm-4 col-xs-4 single_portfolio_text"><span class="hiddenFileInput"><img src="./videos/minus.png" class="minus-img"><input type="file" name="'+item.position+'" onchange= "addVideo()" accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png,.gif"/></span></div>';
                // first = false;
            
                /* Creating div element */
                var div = document.createElement('div');
                div.className ="col-4 single_portfolio_text";
                //div.setAttribute("id", item.position);
                /* --------------------- */

                /* Creating span element */
                var span = document.createElement('span');
                span.className = "hiddenFileInput";
                span.setAttribute("id",item.position);
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
                input.setAttribute("id", "inp"+item.position);
                //input.addEventListener('change', () => this.addVideo, false);
                /* --------------------- */

                span.appendChild(img);
                span.appendChild(progressbar);
                span.appendChild(input);
                div.appendChild(span);

                const bd = document.getElementById('steps-box');
                bd.appendChild(div);
            }
            previous++;
            last = item.position;
        }
        // <div className="col-md-4 col-sm-4 col-xs-4 single_portfolio_text">
        //     <span className="hiddenFileInput img-center">
        //         <img onClick={this.addStep} className="plus-img" src={base_url+"/videos/plus.png"}/>
        //     </span>
        // </div>
        /* Creating div element */
        var div = document.createElement('div');
        div.className ="col-4 single_portfolio_text";
        //div.setAttribute("id", item.position);
        /* --------------------- */

        /* Creating span element */
        var span = document.createElement('span');
        span.className = "hiddenFileInput img-center";
        /* --------------------- */

        /* Creating minus image element */
        var img = document.createElement('img');
        img.src = base_url+'/videos/plus.png';
        //img.setAttribute("id", "rmv"+item.position);
        img.addEventListener('click', () => this.addStep(), false);
        img.className = "plus-img";
        /* --------------------- */

        span.appendChild(img);
        div.appendChild(span);
        const bd = document.getElementById('steps-box');
        bd.appendChild(div);
    }


    if(this.state.videos[0]){
        //console.log(this.state.catalogues);
        this.state.videos.map((item) => ccust(item));
        
        
		
        function ccust(item){
            var str = window.location.href;
            var pieces = str.split("/");
            var base_url = pieces[0]+'//'+pieces[2];
            
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
                // var anchor = document.createElement("A");
                // anchor.setAttribute("href",base_url+"/admin-recipe-steps/"+item._id);

                var vid = document.createElement("VIDEO");
                vid.setAttribute("autoplay", "autoplay");
                vid.setAttribute("loop", "loop");
                //vid.addEventListener('click', () => this.changeVideo(), false);
                vid.setAttribute("src",base_url+"/videos/recipe-steps/"+item.filename+"."+media[1]);
                vid.setAttribute("id", "media"+item.filename+"media"+item.mimetype);
                vid.className = "front-media";
                vid.muted = true;
                vid.setAttribute("preload","preload");
                vid.setAttribute("poster",base_url+'/videos/loading.gif')
                vid.style.minHeight = "88%";
                vid.style.objectFit = 'fill';
                vid.style.width = "100%";
                // anchor.appendChild(vid);
                elem.appendChild(vid);
            }
            if(media[0] == 'image'){
                // var anchor = document.createElement("A");
                // anchor.setAttribute("href",base_url+"/admin-recipe-steps/"+item._id);
                
                var img = document.createElement("img");
                img.setAttribute("src",base_url+"/videos/recipe-steps/"+item.filename+"."+media[1]);
                img.setAttribute("id", "media"+item.filename+"media"+item.mimetype);
                img.className = "front-media";
                img.style.minHeight = "88%";
                img.style.width = "100%";
                // anchor.appendChild(img);
                elem.appendChild(img);
            }
        }
    } 

    
}



 rmv(event){
    if(event.target.id.match(/rmv/g)){
        var pieces = event.target.id.split('rmv');
        this.removeStep(pieces[1]);
    }
 }

 junaid(event){
     console.log(event);
     console.log(this.counter);
    if(event.target.id.match(/inp/g)){
       //console.log(event.target.name);
       //console.log(event.target.files[0]);
       this.addVideo(event);
    }
 }

 player(event){
    if(event.target.id.match(/media/g)){
      var pieces = event.target.id.split('media');
      var extention = pieces[2].split("/");
      var fullname = pieces[1]+"."+extention[1];
        this.setState({type: extention[0]});
        this.setState({active_video: this.state.base_url+'/videos/recipe-steps/'+fullname});
    //   this.state.type = extention[0];
    //   this.state.active_video = this.state.base_url+'/videos/recipe-steps/'+fullname;
    }
   }

 changeevent(event){
    
    if(event.target.id.match(/change/g)){
    console.log(event.target.id);
    var num = event.target.id.split('change');
    document.getElementById('inp'+num[1]).click();
    }
}

async addVideo(event){
    
    event.preventDefault();

    this.counter = this.counter + 1;
     if(this.counter < 2){

    var position = event.target.name;
    
    var formData = new FormData();
    formData.append('myImage',event.target.files[0]);
    formData.append('position',event.target.name);
    formData.append('mainvideoid',this.state.mainid);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        },
        onUploadProgress: function (event) {
            var pid = 'progressbar'+position;
            document.getElementById(pid).style.display = 'block';
            var percent = (event.loaded / event.total) * 100;
            document.getElementById(pid).value = Math.round(percent);

            if(percent == 100){
                document.getElementById(pid).style.display = 'none';
            }
        }
    };

    var pieces = this.state.base_url.split(":");
	const url = pieces[0]+':'+pieces[1]+':4100/recipestepupload';

    //await axios.post("http://45.79.55.117:4100/recipestepupload",formData,config)
    await axios.post(url,formData,config)
    .then((response) => {
        console.log(response.data);
        window.location.reload();
    }).catch((error) => {
        console.log(error);
    });
    this.counter = this.counter - 1;
    }
 }



async removeStep(num){
    //this.state.number = this.state.number - 1;
    
    var dat_length;
    var total;
    var vids;
    const formData = {
        position: num,
        mainvideoid: this.state.mainid
    }

    var pieces = this.state.base_url.split(":");
	const url = pieces[0]+':'+pieces[1]+':4100/removestep';
    
    await axios({
        method: 'post',
        url: url,
        //url: 'http://45.79.55.117:4100/removestep',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        // total = response.data.length;
        // total = response.data[total - 1].position;
        vids = response.data;
        console.log(vids);
        //this.setState({videos: response.data});
        // console.log(this.state.number);
        // console.log(response.data);
        // console.log(response.data.length);
        if(typeof response.data.length === 'undefined'){
            
            dat_length = 0;
        }else{
            dat_length = vids.length;
        }
        
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
    var previous = 0;
    var num = 1;
    var last = 0;
    var first = true;

    if(dat_length == 0){
        document.getElementById('steps-box').innerHTML = '';
        /* Creating div element */
        var div = document.createElement('div');
        div.className ="col-4 single_portfolio_text";
        //div.setAttribute("id", item.position);
        /* --------------------- */

        /* Creating span element */
        var span = document.createElement('span');
        span.className = "hiddenFileInput img-center";
        /* --------------------- */

        /* Creating minus image element */
        var img = document.createElement('img');
        img.src = base_url+'/videos/plus.png';
        //img.setAttribute("id", "rmv"+item.position);
        img.addEventListener('click', () => this.addStep(), false);
        img.className = "plus-img";
        /* --------------------- */

        span.appendChild(img);
        div.appendChild(span);
        const bd = document.getElementById('steps-box');
        bd.appendChild(div);
        this.state.number = 0;
    }

    if(dat_length){
        document.getElementById('steps-box').innerHTML = '';
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
                div.className ="col-4 single_portfolio_text";
                div.setAttribute("id", last);
                /* --------------------- */

                /* Creating span element */
                var span = document.createElement('span');
                span.className = "hiddenFileInput";
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
                input.setAttribute("id", 'inp');
                //input.addEventListener('change', () => this.addVideo, false);
                /* --------------------- */

                span.appendChild(img);
                span.appendChild(progressbar);
                span.appendChild(input);
                div.appendChild(span);

                const bd = document.getElementById('steps-box');
                bd.appendChild(div);
                previous++;
            }
            if(item.position){
                //videos += '<div class="col-md-4 col-sm-4 col-xs-4 single_portfolio_text"><span class="hiddenFileInput"><img src="./videos/minus.png" class="minus-img"><input type="file" name="'+item.position+'" onchange= "addVideo()" accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png,.gif"/></span></div>';
                // first = false;
            
                /* Creating div element */
                var div = document.createElement('div');
                div.className ="col-4 single_portfolio_text";
                div.setAttribute("id", item.position);
                /* --------------------- */

                /* Creating span element */
                var span = document.createElement('span');
                span.className = "hiddenFileInput";
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
                input.setAttribute("id", 'inp');
                //input.addEventListener('change', () => this.addVideo, false);
                /* --------------------- */

                span.appendChild(img);
                span.appendChild(progressbar);
                span.appendChild(input);
                div.appendChild(span);

                const bd = document.getElementById('steps-box');
                bd.appendChild(div);
            }
            previous++;
            last = item.position;
        }
        // <div className="col-md-4 col-sm-4 col-xs-4 single_portfolio_text">
        //     <span className="hiddenFileInput img-center">
        //         <img onClick={this.addStep} className="plus-img" src={base_url+"/videos/plus.png"}/>
        //     </span>
        // </div>
        /* Creating div element */
        var div = document.createElement('div');
        div.className ="col-4 single_portfolio_text";
        //div.setAttribute("id", item.position);
        /* --------------------- */

        /* Creating span element */
        var span = document.createElement('span');
        span.className = "hiddenFileInput img-center";
        /* --------------------- */

        /* Creating minus image element */
        var img = document.createElement('img');
        img.src = base_url+'/videos/plus.png';
        //img.setAttribute("id", "rmv"+item.position);
        img.addEventListener('click', () => this.addStep(), false);
        img.className = "plus-img";
        /* --------------------- */

        span.appendChild(img);
        div.appendChild(span);
        const bd = document.getElementById('steps-box');
        bd.appendChild(div);
    }
    
    window.location.reload();    
    
}



 addStep(){
    
    var str = window.location.href;
    var pieces = str.split("/");
    var base_url = pieces[0]+'//'+pieces[2];
    
    this.state.number = this.state.number + 1;

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

    /* Creating input element */
    var input=document.createElement('input');
    input.type="file";
    input.accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png,.gif";
    // input.name = this.state.number + 1;
    input.name = this.state.number;
    input.addEventListener('change', this.addVideo, false);
    /* --------------------- */

    /* Creating span element */
    var span = document.createElement('span');
    span.className = "hiddenFileInput";
    /* --------------------- */

    var number = this.state.number + 1;

    /* Creating minus image element */
    var img = document.createElement('img');
    img.src = base_url+'/videos/minus.png';
    img.addEventListener('click', () => this.removeStep(number), false);
    img.className = "minus-img";
    /* --------------------- */

    /* Creating div element */
    var div = document.createElement('div');
    div.className ="col-4 single_portfolio_text";
    div.setAttribute("id", this.state.number);
    /* --------------------- */

    span.appendChild(img);
    span.appendChild(progressbar);
    span.appendChild(input);
    div.appendChild(span);

    if(document.getElementById('steps')){
        const bd = document.getElementById('steps-box');
        bd.insertBefore(div,bd.childNodes[this.state.number + 1]);
        //this.state.number = this.state.number + 1;
    }else{
        const bd = document.getElementById('steps-box');
        bd.insertBefore(div,bd.childNodes[this.state.number - 1]);
    }

    

    // var el = document.createElement("div");
    // el.addEventListener('click', this.addVideo, false);
    // var textnode = document.createTextNode("Water");
    // el.appendChild(textnode);
    // const bd = document.getElementById('steps-box');
    // bd.appendChild(el);
    //alert('Get outta here!');
    
    
    //ReactDOM.render(this.state.element, document.getElementById('steps-box'));
    //ReactDOM.createPortal(this.state.element, colorNode);
    
    
    //const bd = document.getElementById('steps-box');
    // var el = document.createElement('div');
    // el.className = "col-md-4 col-sm-4 col-xs-4 single_portfolio_text";
    //bd.appendChild(step);
 }
 
 render() {

    


    var str = window.location.href;
    var pieces = str.split("/");
    var base_url = pieces[0]+'//'+pieces[2];   

  return(
    <div style={{width: '100%'}} className="mobile-rules">
        <div className="row steps-content" style={{height: '100vh', width: '100%', backgroundColor: '#000'}}>
            <div style={{padding: '5px 0px 5px 5px'}} className="col-5">
                
                <div className="sticky-top" style={{backgroundColor:'darkgray',border:'1px solid black'}}>
                    <a className="bck-btn" style={{padding: '0px', border: 'none'}} href={base_url+'/admin-main'}><img src={base_url+'/videos/close.png'}/></a>
                    {this.state.type == 'image'? <img src={this.state.active_video} className="" style={{maxHeight: '98vh'}}/> : <video className="" style={{width:'100%', maxHeight: '98vh',position:'sticky'}} autoPlay loop preload poster = {this.base_url+'/videos/loading.gif'} src={this.state.active_video} />}
                </div>
            </div>
            <div className="col-7 single_portfolio_text" style={{backgroundColor: '#000'}}>
                <div id="steps-box" className="row" style={{margin: '0px', paddingTop: '5px', paddingRight: '5px'}}>
                    {/* <div className="col-md-4 col-sm-4 col-xs-4 single_portfolio_text" id="initial">
                        <span className="hiddenFileInput">
                            <input type="file" name="1" onChange= {this.addVideo} accept=".mp4,.3gp,.wmv.mkv,.flv,.avi,.jpg,.png,.gif"/>
                        </span>
                    </div> */}

                    {/* <div id="steps" style={{display: 'contents'}}>
                        
                    
                    </div> */}
                    <div className="col-4 single_portfolio_text">
                        <span className="hiddenFileInput img-center">
                            <img onClick={this.addStep} className="plus-img" src={base_url+"/videos/plus.png"}/>
                        </span>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    )
   }
 }

export default adminRecipeSteps