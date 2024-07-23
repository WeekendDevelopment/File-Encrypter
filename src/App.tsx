import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState<File>();
  const [encryptedFile, setEncryptedFile] = useState<string>();
  const [decryptedFile, setDecryptedFile] = useState<string>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleEncrypt = () => {
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result && typeof event.target.result === "string") {
          const result: string = event.target.result;
          const encrypted = CryptoJS.AES.encrypt(result, "secret-key").toString();
          const blob = new Blob([encrypted], { type: "text/plain" });
          setEncryptedFile(URL.createObjectURL(blob));
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDecrypt = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result && typeof event.target.result === "string") {
          const result: string = event.target.result;
          const bytes = CryptoJS.AES.decrypt(result, "secret-key");
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);
          const blob = new Blob([decrypted], { type: "text/plain" });
          setDecryptedFile(URL.createObjectURL(blob));
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <h1>File Encryption/Decryption Tool</h1>
      <input type="file" onChange={handleFileChange} />
      <br />
      <br />
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      <br />
      <br />
      {encryptedFile && (
        <a href={encryptedFile} download="encrypted.txt">
          Download Encrypted File
        </a>
      )}
      <br />
      <br />
      {decryptedFile && (
        <a href={decryptedFile} download="decrypted.txt">
          Download Decrypted File
        </a>
      )}
    </div>
  );
}

export default App;
