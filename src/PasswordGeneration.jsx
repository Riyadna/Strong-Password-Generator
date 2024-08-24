import React from "react";
import { useState } from "react";

export const PasswordGeneration = () => {
  const [length, setLength] = useState(8);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = () => {
    if (!uppercase && !lowercase && !number && !symbol) {
      setErrorMessage(
        "Please select at least one option to generate a password."
      );
      return;
    }

    const selectedTypesCount = [uppercase, lowercase, number, symbol].filter(
      Boolean
    ).length;
    if (length < selectedTypesCount) {
      setErrorMessage(
        `Password length must be at least ${selectedTypesCount} to include all selected character types.`
      );
      return;
    }

    setErrorMessage("");

    let charSet = "";
    let generatedPassword = "";

    if (uppercase) {
      charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      generatedPassword += charSet[Math.floor(Math.random() * 26)];
    }
    if (lowercase) {
      charSet += "abcdefghijklmnopqrstuvwxyz";
      generatedPassword += charSet[Math.floor(Math.random() * 26) + 26];
    }
    if (number) {
      charSet += "1234567890";
      generatedPassword += charSet[Math.floor(Math.random() * 10) + 52];
    }
    if (symbol) {
      charSet += "!$%^&*()_-=+:@#";
      generatedPassword += charSet[Math.floor(Math.random() * 14) + 62];
    }

    for (let i = generatedPassword.length; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndex];
    }

    setPassword(generatedPassword.split('').sort(() => 0.5 - Math.random()).join(''));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password Copied");
  };

  return (
    <div className="container">
      <h3>STRONG PASSWORD GENERATOR</h3>
      <div className="input-container">
        <div className="password">
          <p>Password Length:</p>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="errorMessage">{errorMessage}</div>
        <div className="condition">
          <div className="uppercase">
            <input
              type="checkbox"
              id="uppercase"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
            <label htmlFor="uppercase">Include UpperCase</label>
          </div>
          <div className="lowercase">
            <input
              type="checkbox"
              id="lowercase"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
            />
            <label htmlFor="lowercase">Include LowerCase</label>
          </div>
          <div className="number">
            <input
              type="checkbox"
              id="number"
              checked={number}
              onChange={(e) => setNumber(e.target.checked)}
            />
            <label htmlFor="number">Include Number</label>
          </div>
          <div className="symbol">
            <input
              type="checkbox"
              id="symbol"
              checked={symbol}
              onChange={(e) => setSymbol(e.target.checked)}
            />
            <label htmlFor="symbol">Include Symbol</label>
          </div>
        </div>
        <button onClick={generatePassword}>Generagte Password</button>
        <div className="result">
          <input type="text" readOnly value={password} />
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      </div>
    </div>
  );
};
