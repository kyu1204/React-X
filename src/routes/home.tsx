import { auth } from "../firebase";

export default function Home() {
  const LogOut = () => {
    auth.signOut();
  }

  return <h1><button onClick={LogOut}>Log Out</button></h1>;
}
