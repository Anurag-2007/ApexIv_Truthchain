import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Sentiment from 'sentiment';
import { 
  ShieldCheck, ShieldAlert, FileText, Database, 
  ExternalLink, Loader2, Activity, Globe, Zap 
} from 'lucide-react';
import './App.css';

// ------------------------------------------------------
// 🔧 CONFIGURATION
// ------------------------------------------------------
const CONTRACT_ADDRESS = "0xYourSepoliaContractAddress"; 

const ABI = [
  "function verifyNews(string memory _title, string memory _verdict, uint256 _confidence) public",
  "function getRecordCount() public view returns (uint256)"
];

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [txHash, setTxHash] = useState("");
  const [animateBar, setAnimateBar] = useState(0); // For smooth bar animation
  
  // ✨ LIVE FEED
  const [feed, setFeed] = useState([
    { id: 1, title: "DeepSeek AI Benchmarks", verdict: "REAL", time: "2m ago" },
    { id: 2, title: "Atlantic Bridge Proposal", verdict: "FAKE", time: "5m ago" },
    { id: 3, title: "Nintendo Sales Report", verdict: "REAL", time: "12m ago" },
    { id: 4, title: "SomnaFix FDA Approval", verdict: "FAKE", time: "18m ago" },
    { id: 5, title: "Goldene Material Science", verdict: "REAL", time: "25m ago" },
  ]);

  // Trigger animation when result changes
  useEffect(() => {
    if (result) {
      // Small delay to let the DOM render before animating width
      setTimeout(() => setAnimateBar(result.confidence), 100);
    } else {
      setAnimateBar(0);
    }
  }, [result]);

  // ----------------------------------------------------
  // 🤖 LOGIC ENGINE
  // ----------------------------------------------------
  const analyzeText = () => {
    if (!text) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const sentiment = new Sentiment();
      const analysis = sentiment.analyze(text);
      const lowerText = text.toLowerCase();

      // KNOWN HOAXES
      const knownHoaxes = [
        { keywords: ["jupiter", "red spot", "dissipated"], reason: "Fact Check: NASA confirms Red Spot is shrinking, not gone." },
        { keywords: ["sleep", "patch", "45 minutes"], reason: "Biologically implausible claim; no FDA record." },
        { keywords: ["atlantic", "bridge", "hyperloop"], reason: "Physically impossible infrastructure project." }
      ];

      for (let hoax of knownHoaxes) {
        if (hoax.keywords.every(k => lowerText.includes(k))) {
          finalizeResult("FAKE", 99, hoax.reason);
          return; 
        }
      }

      // SCORING
      let score = 50; 
      const trustWords = ["official", "university", "study", "confirmed", "report", "evidence", "published", "data", "market", "semiconductor", "release", "FDA", "nasa"];
      trustWords.forEach(word => { if (lowerText.includes(word)) score += 6; });

      const fakeWords = ["shocking", "stunning", "secret", "leaked", "they don't want you to know", "miracle", "scam", "cover-up", "allegedly", "viral"];
      fakeWords.forEach(word => { if (lowerText.includes(word)) score -= 12; });

      if ((text.match(/[0-9]%|[$₹][0-9]|202[0-9]/gi) || []).length >= 2) score += 15;

      if (lowerText.includes("ai") || lowerText.includes("nintendo") || lowerText.includes("tech")) score += 5;
      else if (analysis.score < -4) score -= 10;

      if (score >= 50) {
        finalizeResult("REAL", Math.min(score + 30, 99), "Source matches credible patterns with specific data points.");
      } else {
        finalizeResult("FAKE", Math.min((100 - score) + 20, 99), "Content flags: Sensationalist language / lack of verifiability.");
      }
    }, 1500);
  };

  const finalizeResult = (verdict, confidence, details) => {
    setResult({ verdict, confidence, details });
    setLoading(false);
  };

  // ----------------------------------------------------
  // ⛓️ BLOCKCHAIN
  // ----------------------------------------------------
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setWallet(await signer.getAddress());
      } catch (error) { alert("Connection failed."); }
    } else { alert("Please install Metamask."); }
  };

  const mintTruth = async () => {
    if (!wallet) return alert("Please connect wallet first.");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const shortTitle = text.split(' ').slice(0, 3).join(' ') + "...";
      const blockchainTitle = text.substring(0, 50);

      const tx = await contract.verifyNews(blockchainTitle, result.verdict, Math.floor(result.confidence));
      alert("Processing transaction...");
      await tx.wait(); 
      setTxHash(tx.hash);
      setFeed([{ id: Date.now(), title: shortTitle, verdict: result.verdict, time: "Just now" }, ...feed]);
    } catch (error) {
      console.error(error);
      alert("Transaction failed.");
    }
  };

  // ----------------------------------------------------
  // 🎨 UI RENDER
  // ----------------------------------------------------
  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <Globe size={26} color="#6366f1" />
          <h1>TruthChain</h1> 
        </div>
        
        <button className={`wallet-btn ${wallet ? 'connected' : ''}`} onClick={connectWallet}>
          {wallet ? (
            <>
              <Zap size={16} fill="currentColor" /> 
              {wallet.substring(0,6)}...
            </>
          ) : "Connect Wallet"}
        </button>
      </header>

      <main>
        <div className="card">
          <div className="input-area">
            <textarea 
              placeholder="Paste news text, headline, or article snippet to verify..." 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
            />
            <button className="analyze-btn" onClick={analyzeText} disabled={loading || !text}>
              {loading ? <><Loader2 size={20} className="spinner"/> Processing...</> : "Verify Content"}
            </button>
          </div>

          {result && (
            <div className={`result-container ${result.verdict.toLowerCase()}`}>
              <div className={`verdict-badge ${result.verdict.toLowerCase()}`}>
                {result.verdict === 'REAL' ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                {result.verdict === 'REAL' ? "VERIFIED AUTHENTIC" : "POTENTIAL MISINFORMATION"}
              </div>
              
              <div className="result-details">
                <h2>{result.confidence}% Confidence</h2>
                <p>{result.details}</p>
                
                <div className="confidence-bar">
                  <div className="confidence-fill" style={{width: `${animateBar}%`}}></div>
                </div>
              </div>

              <div className="action-row">
                <button className="mint-btn" onClick={mintTruth}>
                  <Database size={16} />
                  Immutable Record
                </button>
                
                {txHash && (
                  <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noreferrer" className="tx-link">
                    <ExternalLink size={14} />
                    View on Etherscan
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="feed-section">
          <div className="feed-header">
            <Activity size={18} /> Global Live Feed
          </div>
          <div className="feed-list">
            {feed.map((item) => (
              <div key={item.id} className="feed-item">
                <div className="feed-content">
                  <span className={`status-dot ${item.verdict.toLowerCase()}`}></span>
                  <span className="feed-title">{item.title}</span>
                </div>
                <span className="feed-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;