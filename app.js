async function sendMessage() {
    const input = document.getElementById("userInput").value;
    if (!input.trim()) return;

    const chatBox = document.getElementById("chat-box");

    const userDiv = document.createElement("div");
    userDiv.className = "user-msg";
    userDiv.textContent = "أنت: " + input;
    chatBox.appendChild(userDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    const res = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
    });
    const data = await res.json();

    const aiDiv = document.createElement("div");
    aiDiv.className = "ai-msg";
    aiDiv.textContent = "ABDO DEMON Ai: " + data.reply;
    chatBox.appendChild(aiDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    document.getElementById("userInput").value = "";
}
