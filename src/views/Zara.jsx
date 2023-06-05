import { useState, useEffect } from "react";
import Title from "../components/Title";
import Subheading from "../components/Subheading";
import Transcript from "../components/Transcript";
import MicButton from "../components/MicButton";
import AIImage from "../img/preloader.gif";
import "../styles/Zara.css";
import Preloader from "../components/Preloader";
import axios from 'axios';

function Zara() {
  // This is the transcript state
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    axios.post('http://localhost:5001/api/start-interview', {
      role: 'fe-react'
    })
      .then(response => {
        setTranscript(response.data.response);
        setIsLoading(false); // Set loading to false once data is received
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <>   
        <main>
        <div className="container">
          <div className={`heading ${isLoading ? 'hidden' : 'visible'}`}>
            <Title />
            <Subheading />
          </div>
          {isLoading ? <Preloader/> : <img className={`ai-img ${isLoading ? 'hidden' : 'visible'}`} src={AIImage} />}
          <Transcript className={isLoading ? 'hidden' : 'visible'} transcript={transcript} isLoading={isLoading}/>
        </div>
        <MicButton className={`mic-img ${isLoading ? 'hidden' : 'visible'}`} setTranscript={setTranscript} isLoading={isLoading}/>
        </main>
    </>
  );
}

export default Zara;
