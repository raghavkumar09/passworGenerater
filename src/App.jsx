import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharaterAllowed] = useState(false);
  const [length, setLength] = useState(8);

  const ref = useRef(null);

  const passwordGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      console.log(pass);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyToClipboard = () => {
    ref.current.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerater();
  }, [passwordGenerater]);

  return (
    <>
      <div className="w-full text-white m-auto bg-slate-800 p-10 rounded-lg text-center shadow-2xl">
        <h1 className="text-3xl mb-3 font-bold">Password Generater</h1>

        <div className="flex justify-center items-center gap-2 mb-4 shadow-2xl border border-slate-700">
          <input
            type="text"
            className="bg-slate-700 px-3 py-1 rounded-lg w-1/2"
            readOnly
            ref={ref}
            value={password}
          />
          <button
            className="bg-slate-700 px-3 py-1 rounded-lg cursor-pointer hover:bg-slate-600"
            onClick={copyToClipboard}
          >
            copy
          </button>
        </div>

        <div className="flex justify-center items-center gap-2 shadow-2xl border border-slate-700 p-3 flex-wrap">
          <input
            type="range"
            min="6"
            max="100"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          Length: {length}
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
          Number
          <input
            type="checkbox"
            checked={characterAllowed}
            onChange={(e) => setCharaterAllowed(e.target.checked)}
          />
          Character
        </div>
      </div>
    </>
  );
}

export default App;
