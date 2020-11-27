const numberInp=document.getElementById('number');
const textInp=document.getElementById('msg');
const button=document.getElementById('button');
const response=document.querySelector('.response');
button.addEventListener('click',send);
const socket=io();
socket.on('smsStatus',function(data){
    response.innerHTML='<h5>Text messaage sent to '+data.number+'</h5>';
})
function send(){
    const number=numberInp.value;
    const text=textInp.value;
    fetch('/',{
        method:'post',
        headers :{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            number:number,
            text:text
        })
    }).then(function(res){
        console.log(res);
    }).catch(function(err){
        console.log(err);
    })
}