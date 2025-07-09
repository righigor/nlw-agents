import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

type RoomParams = {
  roomId: string;}

export function RecordRoomAudio() {
  const { roomId } = useParams<RoomParams>();
  if (!roomId) {
    return <Navigate to="/" replace />;
  }
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);

  async function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
      console.log("Gravação parada");
    }
  }

  async function uploadAudio(blob: Blob) {
    const formData = new FormData();

    formData.append("file", blob, "audio.webm");

    const response = await fetch(`/api/rooms/${roomId}/audio`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Resposta do servidor:", result);
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("Gravação de áudio não é suportada neste navegador.");
      return;
    }
    setIsRecording(!isRecording);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });

    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        console.log("Dados de áudio gravados:", event.data);
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("Gravação iniciada");
    };
    recorder.current.onstop = () => {
      console.log("Gravação parada");
      setIsRecording(false);
    };

    recorder.current.start();
  }

  return (
    <div className="h-screen flex items-center justify-center gap-3 flex-col">
      {isRecording ? (
        <Button onClick={stopRecording}>Parar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Iniciar gravação</Button>
      )}

      {isRecording && (
        <p className="mt-4 text-green-500">
          Gravação iniciada! Pressione o botão novamente para parar.
        </p>
      )}
      {!isRecording && (
        <p className="mt-4 text-red-500">
          Gravação parada. Pressione o botão para iniciar novamente.
        </p>
      )}
    </div>
  );
}
