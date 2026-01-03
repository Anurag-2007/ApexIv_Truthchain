# 🛡️ TruthChain
> **"Truth. Verified. Immutable."**

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)
![Ethereum](https://img.shields.io/badge/Blockchain-Ethereum_Sepolia-3C3C3D?logo=ethereum&logoColor=white)
![Python](https://img.shields.io/badge/AI_Engine-Python_NLP-3776AB?logo=python&logoColor=white)
![HuggingFace](https://img.shields.io/badge/Model-Transformers-FFD21E?logo=huggingface&logoColor=black)

## 📖 Overview

**TruthChain** is a next-generation truth-detection platform that merges **Semantic AI** with **Web3 Immutability**.

In an era of deepfakes, clickbait, and silent retroactive editing, the "truth" is becoming increasingly malleable. TruthChain solves this by creating a two-step verification layer:
1.  **The Brain (AI):** A Semantic NLP engine analyzes incoming news for stance, bias, and consistency.
2.  **The Vault (Blockchain):** The content and its "Truth Score" are minted to the Ethereum blockchain, making them permanently unchangeable and censorship-resistant.

---

## 💡 The Dual-Layer Solution

| Problem (Web2) | TruthChain Solution (AI + Web3) |
| :--- | :--- |
| **Fake News & Clickbait** | **Semantic NLP Analysis:** We use Transformer models (BERT/RoBERTa) to detect sensationalism and verify if headlines match the content. |
| **Silent Retro-Editing** | **Immutable Ledger:** Once published, the news entry is locked in a Smart Contract. It cannot be deleted or edited by anyone. |
| **Centralized Censorship** | **Decentralized Storage:** The data lives on the distributed ledger, not on a corporate server that can be wiped. |

---

## ⚙️ Tech Stack

### 🧠 The AI Engine (Semantic NLP)
* **Language:** Python
* **Libraries:** Hugging Face Transformers, PyTorch, NLTK
* **Models:** Fine-tuned **BERT** for Fake News Classification & Stance Detection.
* **API:** Flask/FastAPI (Serving the model to the frontend).

### ⛓️ The Blockchain Layer
* **Network:** Ethereum (Sepolia Testnet)
* **Smart Contract:** Solidity (v0.8+)
* **Interaction:** Ethers.js

### 💻 The Client
* **Framework:** React.js (Vite)
* **Styling:** CSS3 / Tailwind (optional)
* **Auth:** MetaMask (Wallet Connect)

---

## 🚀 Key Features

* **🤖 AI Stance Detection:** Automatically flags articles where the headline contradicts the body text (Clickbait detection).
* **⚖️ Bias Scoring:** The NLP engine assigns a "Neutrality Score" to potential news pieces before they are published.
* **🔒 Tamper-Proof History:** Every article gets a cryptographic hash and timestamp. History is preserved exactly as it was written.
* **💸 Crypto-Economic Incentives:** (Roadmap) Users pay gas fees to publish, reducing spam, while fact-checkers earn tokens for verifying complex stories.
---
live link https://apex-iv-truthchain.vercel.app/
---

## 🛠️ Installation & Setup

### Prerequisites
* Node.js & npm
* Python 3.8+
* MetaMask Extension

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/truthchain.git](https://github.com/YOUR_USERNAME/truthchain.git)
cd truthchain


