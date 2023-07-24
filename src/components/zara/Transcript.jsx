import Typewriter from 'typewriter-effect';
import React from 'react';

export default function Transcript({ transcript, isLoading, styles }) {
  return (
    <div className={`${styles["text-server"]} ${styles["transcript"]} ${isLoading ? styles['hidden'] : styles['visible']}`}>
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
            delay: 20,
          }}
        />
      }
    </div>
  );
}
