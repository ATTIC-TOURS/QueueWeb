import { useState, useEffect } from "react";
import audio from "../assets/audio/callingsound.mp3";
import { WaitingCallType } from "../shared/types/tv";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../shared/stores/app";
import { setModalStatus } from "../shared/stores/modal";

export const useSoundNotify = () => {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();
    utter.rate = 1.2;
    utter.volume = 1;
    utter.voice = synth.getVoices()[2];
    setUtterance(utter);

    return () => {
      synth.cancel();
    };
  }, []);

  const speak = (data: WaitingCallType | null) => {
    if (data && utterance) {
      utterance.text = `Applicant ${data.queue_code} please proceed to ${data.window_name}`;
      window.speechSynthesis.speak(utterance);

      utterance.onend = () => {
        dispatch(setModalStatus({ active: false, modalFor: "in-progress" }));
      };
    }
  };

  const playAudio = (data: WaitingCallType | null) => {
    const source = new Audio(audio);

    source.onended = () => {
      speak(data);
    };

    source.play();

  };

  return { playAudio };
};
