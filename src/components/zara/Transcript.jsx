import Typewriter from 'typewriter-effect';
import React from 'react';

export default function Transcript({ transcript, isLoading, styles, index }) {
  return (
    <div className={`${styles["text-server"]} ${styles["transcript"]} ${isLoading ? styles['hidden'] : styles['visible']}  ${index === 1 ? styles['highlight'] : ''}`}>
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
