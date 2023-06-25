import { useState, useEffect } from "react";
import Title from "./Title";
import Subheading from "./Subheading";
import Transcript from "./Transcript";
import MicButton from "./MicButton";
import AIImage from "../img/preloader.gif";
import "../styles/Zara.css";
import Preloader from "./Preloader";
import axios from 'axios';
import { useLocation } from "react-router-dom";

function Zara( {setIsDone, setFeedback} ) {
  // This is the transcript state
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  let location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const role = queryParam.get('role')
  // const industry = queryParam.get('industry')
  // const difficulty = queryParam.get('difficulty')
  const questions = queryParam.get('questions')

  useEffect(() => {
    axios.post('http://localhost:5001/api/start-interview', {
      role: role,
      questions: questions
    })
      .then(response => {
        console.log(response.data.response)
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
        <MicButton className={`mic-img ${isLoading ? 'hidden' : 'visible'}`} setTranscript={setTranscript} isLoading={isLoading} setIsDone={setIsDone} setFeedback={setFeedback}/>
        </main>
    </>
  );
}

export default Zara;
