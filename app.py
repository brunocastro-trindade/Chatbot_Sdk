import os
from flask import Flask, render_template, request, jsonify, session
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "dev-secret-key-change-in-production")

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)

SYSTEM_PROMPT = os.getenv(
    "SYSTEM_PROMPT",
    "Você é um assistente útil e amigável. Responda sempre em português."
)


@app.route("/")
def index():
    session.setdefault("history", [])
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(force=True)
    user_message = (data.get("message") or "").strip()

    if not user_message:
        return jsonify({"error": "Mensagem vazia"}), 400

    history = session.get("history", [])
    history.append({"role": "user", "content": user_message})

    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + history

    try:
        response = client.chat.completions.create(
            model=os.getenv("OPENAI_MODEL", "openai/gpt-4o-mini"),
            messages=messages,
        )
        assistant_message = response.choices[0].message.content
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    history.append({"role": "assistant", "content": assistant_message})
    session["history"] = history[-40:]  # keep last 20 turns

    return jsonify({"reply": assistant_message})


@app.route("/reset", methods=["POST"])
def reset():
    session["history"] = []
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=os.getenv("FLASK_DEBUG", "false").lower() == "true", port=5000)
