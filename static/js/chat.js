const messagesEl = document.getElementById("messages");
const inputEl    = document.getElementById("input");
const btnSend    = document.getElementById("btn-send");
const btnReset   = document.getElementById("btn-reset");

// ── Helpers ────────────────────────────────────────────────────────────────

function appendMessage(role, text) {
  const div = document.createElement("div");
  div.classList.add("message", role);
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

function appendTyping() {
  const div = document.createElement("div");
  div.classList.add("message", "assistant");
  div.id = "typing-indicator";
  div.innerHTML =
    '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

function removeTyping() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

// Auto-resize textarea
inputEl.addEventListener("input", () => {
  inputEl.style.height = "auto";
  inputEl.style.height = inputEl.scrollHeight + "px";
});

// ── Send ───────────────────────────────────────────────────────────────────

async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  inputEl.value = "";
  inputEl.style.height = "auto";
  btnSend.disabled = true;

  appendMessage("user", text);
  appendTyping();

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    removeTyping();

    if (!res.ok || data.error) {
      appendMessage("error", "Erro: " + (data.error || res.statusText));
    } else {
      appendMessage("assistant", data.reply);
    }
  } catch (err) {
    removeTyping();
    appendMessage("error", "Falha de conexão. Tente novamente.");
  } finally {
    btnSend.disabled = false;
    inputEl.focus();
  }
}

// ── Reset ──────────────────────────────────────────────────────────────────

async function resetChat() {
  await fetch("/reset", { method: "POST" });
  messagesEl.innerHTML = "";
  appendMessage("assistant", "Olá! Como posso te ajudar?");
  inputEl.focus();
}

// ── Events ─────────────────────────────────────────────────────────────────

btnSend.addEventListener("click", sendMessage);
btnReset.addEventListener("click", resetChat);

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// ── Init ───────────────────────────────────────────────────────────────────
appendMessage("assistant", "Olá! Como posso te ajudar?");
inputEl.focus();
