import { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../../components/auth-components";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = e;
    if (name === "email") {
      setEmail(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      navigate("/reset-password/done");
    }
    catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Reset Password</Title>
      <Form onSubmit={onSubmit} >
        <Input onChange={onChange} value={email} name="email" placeholder="Email" type="email" required />
        <Input type="submit" value={isLoading ? "Loading..." : "Send Email"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
