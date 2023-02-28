import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 onClick={() => navigate("/")}>NotFound</h1>
    </div>
  );
}
