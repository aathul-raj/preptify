import Typewriter from 'typewriter-effect';
import React from 'react';

export default function Transcript({ transcript }) {
  return (
    <div className="text-server transcript">
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
