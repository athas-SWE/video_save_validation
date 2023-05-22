import { useState } from "react";

async function readFile(file) {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

async function getData(file) {
  let data = await readFile(file);
  let videoElem = document.createElement("video");
  let source = document.createElement("source");
  source.setAttribute("src", data);

  videoElem.appendChild(source);

  videoElem.onload = function () {
    console.log(videoElem);
    window.URL.revokeObjectURL(videoElem.src);
    //   let duration = videoElem.duration;
    console.log(data);
  };

  console.log(videoElem);

  document.getElementsByTagName("body")[0].appendChild(videoElem);
}

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      setSelectedFile(file);

      getData(file);
    }
  };

  const validateSelectedFile = () => {
    const MIN_FILE_SIZE = 5120; // 5MB
    //const MAX_FILE_SIZE = 15360; // 15MB

    if (!selectedFile) {
      setErrorMsg("Please choose a file");
      setIsSuccess(false);
      return;
    }

    const fileSizeKiloBytes = selectedFile.size / 1024;

    if (fileSizeKiloBytes < MIN_FILE_SIZE) {
      setErrorMsg("File size is less than minimum limit");
      setIsSuccess(false);
      return;
    }
    // if (fileSizeKiloBytes > MAX_FILE_SIZE) {
    //   setErrorMsg("File size is greater than maximum limit");
    //   setIsSuccess(false);
    //   return;
    // }

    setErrorMsg("");
    setIsSuccess(true);
  };

  return (
    <div className="App-container">
      <div className="card">
        <div className="card-header">
          <h4 className="title">Upload your video </h4>
        </div>

        <div className="card-body">
          <p className="label">Choose File</p>
          <input type="file" name="file" onChange={handleFileChange} />

          <div className="space-between">
            <p className="info-message">Min size: 5MB</p>
            <p className="info-message">Max size: 15MB</p>
            <p className="info-message">video duration 30Sec</p>
          </div>
          {isSuccess ? (
            <p className="success-message">Validation successful</p>
          ) : null}
          <p className="error-message">{errorMsg}</p>

          <button className="btn" onClick={validateSelectedFile}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
