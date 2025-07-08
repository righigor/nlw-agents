import { Navigate, useParams } from "react-router-dom";

export function Room() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <h1>Room</h1>
      <p>This is the room page.</p>
    </div>
  );
}