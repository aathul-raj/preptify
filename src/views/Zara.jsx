import { useState } from "react";
import Title from "../components/Title";
import Subheading from "../components/Subheading";
import Transcript from "../components/Transcript";
import MicButton from "../components/MicButton";
import AIImage from "../img/preptify-ai.png";
import "../styles/App.css";

function Zara() {
  // This is the transcript state
  const [transcript, setTranscript] = useState("");

  return (
    <>
      <main>
        <div className="container">
          <div className="heading">
            <Title />
            <Subheading />
          </div>
          <img className="ai-img" src={AIImage} />
          <Transcript transcript={transcript}/>
        </div>
        <MicButton setTranscript={setTranscript} className="mic-img"/>
      </main>
    </>
  );
}

export default Zara;
