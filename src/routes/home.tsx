import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const LogOut = () => {
    auth.signOut();
    navigate("/login");
  }

  return <h1><button onClick={LogOut}>Log Out</button></h1>;
}
