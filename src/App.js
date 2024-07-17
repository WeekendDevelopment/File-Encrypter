import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [decryptedFile, setDecryptedFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEncrypt = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const encrypted = CryptoJS.AES.encrypt(reader.result, 'secret-key').toString();
        const blob = new Blob([encrypted], { type: 'text/plain' });
        setEncryptedFile(URL.createObjectURL(blob));
      };
      reader.readAsText(file);
    }
  };

  const handleDecrypt = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const bytes = CryptoJS.AES.decrypt(reader.result, 'secret-key');
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        const blob = new Blob([decrypted], { type: 'text/plain' });
        setDecryptedFile(URL.createObjectURL(blob));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <h1>File Encryption/Decryption Tool</h1>
      <input type="file" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      <br /><br />
      {encryptedFile && <a href={encryptedFile} download="encrypted.txt">Download Encrypted File</a>}
      <br /><br />
      {decryptedFile && <a href={decryptedFile} download="decrypted.txt">Download Decrypted File</a>}
    </div>
  );
}

export default App;