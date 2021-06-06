let video = document.querySelector("video");
      let vidbtn=document.querySelector('button#record')
      let capbtn=document.querySelector('button#capture')
      
      let constraints = {
        video: true, ////////yha audio b true kar skte basically capability btayga
        audio:true
      };
      
      let body=document.querySelector('body')
      
      let filters=document.querySelectorAll('.filters');
      
      
      let mediaRecorder;
      let isRecording=false;
      let chunks=[]
      
      let filter=""  //////canvas par use kar paye image par colour dalne k lia
      for(let i=0;i<filters.length;i++){
          filters[i].addEventListener('click',(e)=>{
            filter=e.currentTarget.style.backgroundColor;
            removeFilter();
            addFilter(filter);
          })
      }
      
      
      
      vidbtn.addEventListener('click',()=>{
        let innerbtn=vidbtn.querySelector('div')
        if(isRecording){
          mediaRecorder.stop()
          isRecording=false;
          innerbtn.classList.remove('record-animation') 
    
        }else{
          filter=""
          removeFilter()
          mediaRecorder.start()
          isRecording=true;
          innerbtn.classList.add('record-animation')
     
        }
      })
      
      
      capbtn.addEventListener('click',()=>{
      
        let innerbtn=capbtn.querySelector('div')
        innerbtn.classList.add('capture-animation')
        
        setTimeout(function(){
          innerbtn.classList.remove('capture-animation')
        },500)
        capture()
      })
      
      //navigator b ek object hai
      navigator.mediaDevices // mediadevice naviagator ka child object hai jo humko access deta hai video bnane ka
      
        .getUserMedia(constraints) ////////function hai jo promise dega arr constrainsts se hum ye bta pare hai ki vo vala device chaia jisse video mil jaye
        .then(function (mediaStream) {
          video.srcObject = mediaStream; // yha video k src mai mediastram daldia jo media stream ek url dega
          let options = { mimeType: "video/webm; codecs=vp9" };
          
          mediaRecorder=new MediaRecorder(mediaStream,options)
        
          mediaRecorder.addEventListener('dataavailable',function(e){
         
            chunks.push(e.data)
          
          })
          
          mediaRecorder.addEventListener('stop',function(e){
         
            let blob=new Blob(chunks,{type:"video/mp4"}) /// large raw data 
            chunks=[]
            
            let url=URL.createObjectURL(blob)
            console.log(url)
            let a=document.createElement('a')
            a.href=url
            a.download='video.mp4'
            a.click()
            a.remove()
          })
        
        
        }); 
        
        
        
        
        function capture(){
        
            let c=document.createElement('canvas')
            
            c.width=video.videoWidth
            c.height=video.videoHeight
            
            let ctx=c.getContext('2d')
            
            ctx.drawImage(video,0,0)
            if(filter!=""){
              ctx.fillStyle=filter;
              ctx.fillRect(0,0,c.width,c.height)
            }
            
            
            ///download karne k lia
            let a=document.createElement('a')
            a.download='image.png'
            a.href=c.toDataURL()
            a.click()
            a.remove()
        
        }
        
        
        
        function addFilter(filter){
          let filterDiv=document.createElement('div');
          filterDiv.classList.add('filter-div');
          filterDiv.style.backgroundColor=filter
          body.appendChild(filterDiv)
        }
        
        
        function removeFilter(){
          
          let filterDiv=document.querySelector('.filter-div');
          if(filterDiv!=null)
          filterDiv.remove();
        }