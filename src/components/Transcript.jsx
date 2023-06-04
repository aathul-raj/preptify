import Typewriter from 'typewriter-effect';
import React from 'react';

export default function Transcript({ transcript, isLoading }) {
  return (
    <div className={`text-server transcript ${isLoading ? 'hidden' : 'visible'}`}>
      {transcript && 
        <Typewriter
          key={transcript}
          onInit={(typewriter) => {
            typewriter
              .typeString(transcript)
              .start();
          }}
          options={{
            autoStart: true,
            loop: false,
            cursor: "|",
            delay: 35,
          }}
        />
      }
    </div>
  );
}
