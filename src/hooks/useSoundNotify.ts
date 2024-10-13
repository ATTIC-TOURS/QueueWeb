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

    console.log("data", data);
    if (data && utterance) {
        console.log("data~~~~~~~", data);
      utterance.text = `${data.service} with ticket no ${data.queue_no} please proceed to ${data.window}`;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playAudio = () => {
    const source = new Audio(audio);

    source.play();
  };

  return { playAudio, speak };
};
