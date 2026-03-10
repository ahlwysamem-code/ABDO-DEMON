import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm"

const engine = await CreateMLCEngine("gemma-2b-it-q4f32_1")

async function send(){

let input=document.getElementById("msg")
let text=input.value

let chat=document.getElementById("chat")

chat.innerHTML+=`<div class="user">${text}</div>`

input.value=""

const reply=await engine.chat.completions.create({
messages:[{role:"user",content:text}]
})

let answer=reply.choices[0].message.content

chat.innerHTML+=`<div class="ai">${answer}</div>`

chat.scrollTop=chat.scrollHeight

}
