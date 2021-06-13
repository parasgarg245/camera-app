//database create/open (camera)
//database objectstore --gallery
//photo capture/video record,=>gallery (obs) store
//formaat
// data={
//     mid:123445432,
//     type:'img/vid',
//     media:actual apka content (img->c.todataurl), video-blob
// }

console.log('hello paras ')
let dbAccess;
let request=indexedDB.open('Camera',1)

request.addEventListener('success',()=>{

     dbAccess=request.result
    
})
   



request.addEventListener('upgradeneeded',()=>{
   
    let db=request.result  
    db.createObjectStore('gallery',{keyPath:'mId'})
})


request.addEventListener('error',()=>{
    alert('some error occured')
})



function addMedia(type,media){

    let tx=dbAccess.transaction('gallery','readwrite')
    let galleryobjectstore=tx.objectStore('gallery')
    let data={
        mId:Date.now(),
        type,
        media,
    }
    galleryobjectstore.add(data);
}



