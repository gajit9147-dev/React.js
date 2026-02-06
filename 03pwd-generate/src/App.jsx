/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllowed) str += "0123456789";
    if (isCharAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, isNumberAllowed, isCharAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  const copyPassword = () => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      
      <div className="w-full max-w-lg mx-auto p-8 rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          🔐 Password Generator
        </h1>

        {/* Password field */}
        <div className="flex rounded-xl overflow-hidden shadow-lg mb-6">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="w-full px-4 py-3 text-lg outline-none"
            placeholder="Generated password"
          />
          <button
            onClick={copyPassword}
            className="px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-5">

          {/* Length */}
          <div className="bg-white/20 p-4 rounded-xl">
            <div className="flex justify-between mb-2 text-white">
              <span>Password Length</span>
              <span className="font-bold">{length}</span>
            </div>

            <input
              type="range"
              min={12}
              max={50}
              value={length}
              className="w-full cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          {/* Options */}
          <div className="flex gap-4">

            <label className="flex items-center gap-2 bg-white/20 px-4 py-3 rounded-xl text-white cursor-pointer">
              <input
                type="checkbox"
                checked={isNumberAllowed}
                onChange={() => setIsNumberAllowed((prev) => !prev)}
              />
              Numbers
            </label>

            <label className="flex items-center gap-2 bg-white/20 px-4 py-3 rounded-xl text-white cursor-pointer">
              <input
                type="checkbox"
                checked={isCharAllowed}
                onChange={() => setIsCharAllowed((prev) => !prev)}
              />
              Symbols
            </label>

          </div>

          {/* Generate Button */}
          <button
            onClick={passwordGenerator}
            className="w-full py-3 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg hover:scale-[1.02] transition"
          >
            Generate New Password
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
