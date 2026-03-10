document.body.onload = () => {

document.getElementById("sound").play()

}

function send(){

let input=document.getElementById("msg")

let text=input.value

let chat=document.getElementById("chat")

chat.innerHTML+=`<div class="user">${text}</div>`

input.value=""

let reply="انا ABDO DEMON AI... ما الذي تريده؟"

chat.innerHTML+=`<div class="ai">${reply}</div>`

chat.scrollTop=chat.scrollHeight

}
