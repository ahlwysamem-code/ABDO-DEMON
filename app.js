import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

const engine = await CreateMLCEngine("gemma-2b-it-q4f32_1"); // نموذج يعمل محلياً

let history = JSON.parse(localStorage.getItem("chat_history") || "[]");
const chat = document.getElementById("chat");

history.forEach(msg => {
    const div = document.createElement("div");
    div.className = msg.role === "user" ? "user" : "ai";
    div.innerText = msg.content;
    chat.appendChild(div);
});
chat.scrollTop = chat.scrollHeight;

async function send(){
    const input = document.getElementById("msg");
    const text = input.value.trim();
    if(!text) return;

    chat.innerHTML += `<div class="user">${text}</div>`;
    history.push({role:"user", content:text});
    localStorage.setItem("chat_history", JSON.stringify(history));
    input.value = "";

    const reply = await engine.chat.completions.create({
        messages: history.map(h => ({role:h.role, content:h.content}))
    });
    const answer = reply.choices[0].message.content;

    chat.innerHTML += `<div class="ai">${answer}</div>`;
    history.push({role:"ai", content:answer});
    localStorage.setItem("chat_history", JSON.stringify(history));
    chat.scrollTop = chat.scrollHeight;
}

document.querySelector("button").addEventListener("click", send);
document.getElementById("msg").addEventListener("keypress", e=>{
    if(e.key === "Enter") send();
});
