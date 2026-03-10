// استيراد محرك WebLLM (نموذج AI مفتوح المصدر)
import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// إنشاء المحرك
const engine = await CreateMLCEngine("gemma-2b-it-q4f32_1"); 

// تحميل المحادثات السابقة من localStorage
let history = JSON.parse(localStorage.getItem("chat_history") || "[]");

// عرض المحادثات السابقة عند فتح الموقع
const chat = document.getElementById("chat");
history.forEach(msg => {
    let div = document.createElement("div");
    div.className = msg.role === "user" ? "user" : "ai";
    div.innerText = msg.content;
    chat.appendChild(div);
});
chat.scrollTop = chat.scrollHeight;

// دالة إرسال الرسائل
async function send() {
    const input = document.getElementById("msg");
    const text = input.value.trim();
    if (!text) return;

    // عرض رسالة المستخدم
    const userDiv = document.createElement("div");
    userDiv.className = "user";
    userDiv.innerText = text;
    chat.appendChild(userDiv);
    chat.scrollTop = chat.scrollHeight;

    // إضافة للمحادثة في الذاكرة
    history.push({ role: "user", content: text });
    localStorage.setItem("chat_history", JSON.stringify(history));

    input.value = "";

    // استدعاء الذكاء الاصطناعي للحصول على الرد
    const reply = await engine.chat.completions.create({
        messages: history.map(h => ({ role: h.role, content: h.content }))
    });

    const answer = reply.choices[0].message.content;

    // عرض رد الذكاء الاصطناعي
    const aiDiv = document.createElement("div");
    aiDiv.className = "ai";
    aiDiv.innerText = answer;
    chat.appendChild(aiDiv);
    chat.scrollTop = chat.scrollHeight;

    // حفظ الرد في الذاكرة
    history.push({ role: "ai", content: answer });
    localStorage.setItem("chat_history", JSON.stringify(history));
}

// ربط زر الإرسال
document.querySelector("button").addEventListener("click", send);

// إرسال عند الضغط على Enter
document.getElementById("msg").addEventListener("keypress", e => {
    if (e.key === "Enter") send();
});
