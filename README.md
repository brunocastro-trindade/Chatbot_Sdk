# 💬 Chatbot com OpenRouter

Um chatbot web simples construído com **Python + Flask** no backend e **HTML/CSS/JS puro** no frontend, integrado à API do [OpenRouter](https://openrouter.ai) — que dá acesso a centenas de modelos de linguagem (GPT-4o, Claude, Llama, etc.) com uma única chave.

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/chatbot.git
cd chatbot
```

### 2. Crie e ative o ambiente virtual

```bash
python -m venv venv
source venv/bin/activate        # Linux / macOS
# venv\Scripts\activate         # Windows
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` e coloque a sua chave do OpenRouter:

```
OPENROUTER_API_KEY=sk-or-v1-SUA_CHAVE_AQUI
```

> Crie sua chave gratuita em [openrouter.ai/keys](https://openrouter.ai/keys).

### 5. Inicie o servidor

```bash
python app.py
```

Acesse **http://localhost:5000** no navegador.

---

## 🔀 Trocando o modelo

No `.env`, altere `OPENAI_MODEL` para qualquer modelo disponível no OpenRouter:

| Modelo | Valor em `OPENAI_MODEL` |
|---|---|
| GPT-4o mini | `openai/gpt-4o-mini` |
| GPT-4o | `openai/gpt-4o` |
| Claude 3.5 Sonnet | `anthropic/claude-3.5-sonnet` |
| Llama 3.1 70B | `meta-llama/llama-3.1-70b-instruct` |

Veja todos os modelos em [openrouter.ai/models](https://openrouter.ai/models).

---

## 🛠️ Tecnologias utilizadas

### Backend
| Biblioteca | Versão | Função |
|---|---|---|
| **Python** | 3.10+ | Linguagem principal |
| **Flask** | 3.x | Framework web (rotas, sessões, templates) |
| **openai** | 3.x | SDK para chamadas à API compatível com OpenAI |
| **python-dotenv** | 1.x | Carregamento de variáveis do arquivo `.env` |

### Frontend
| Tecnologia | Função |
|---|---|
| **HTML5** | Estrutura da página |
| **CSS3** | Estilo e layout responsivo |
| **JavaScript** (Vanilla) | Lógica do chat, requisições `fetch`, indicador de digitação |

---

## 📁 Estrutura do projeto

```
chatbot/
├── app.py              # Servidor Flask e integração com OpenRouter
├── .env.example        # Template de variáveis de ambiente
├── requirements.txt    # Dependências Python
├── templates/
│   └── index.html      # Interface do chat
└── static/
    ├── css/style.css   # Estilos
    └── js/chat.js      # Lógica do frontend
```

---

## 📄 Licença

MIT — sinta-se livre para usar, modificar e distribuir.
