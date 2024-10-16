import { useState, useEffect } from "react";
import audio from "../assets/audio/callingsound.mp3";
import { WaitingCallType } from "../shared/types/tv";

export const useSoundNotify = () => {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  useEffect(() => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();
    utter.rate = 1.2;
    utter.volume = 1;
    utter.voice = synth.getVoices()[2];
    setUtterance(utter);

    console.log("utterance", utter);
    return () => {
      synth.cancel();
    };
  }, []);

  const speak = async (data: WaitingCallType | null) => {

    if (data && utterance) {
      utterance.text = `Applicant ${data.queue_code} please proceed to ${data.window_name}`;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playAudio = (data: WaitingCallType | null) => {
    const source = new Audio(audio);

    source.onended = () => {
      speak(data)
    }

    const promise = source.play();

    if (promise !== undefined) {
      promise.then(() => {
        console.log("Audio played");
      }).catch(error => {
        console.log("Audio error", error);

      });
    }

  };

  return { playAudio };
};
