import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 onClick={() => navigate("/lksdgfwyrg")}>Main</h1>
    </div>
  );
}
