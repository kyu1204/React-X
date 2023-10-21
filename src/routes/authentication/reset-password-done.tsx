import { Link, } from "react-router-dom";
import { Title, Wrapper } from "../../components/auth-components";
import styled from "styled-components";

const ResetPasswordContent = styled.span`
  margin-top: 25px;
  font-size: 16px;
`;

const GoBack = styled.span`
  margin-top: 10px;
  a {
    color: #1d9bf0;
    font-size: 16px;
  }
`;

export default function ResetPasswordDone() {
  return (
    <Wrapper>
      <Title>Reset Password</Title>
      <ResetPasswordContent>
        Send Email to reset password, then check your email.
      </ResetPasswordContent>
      <GoBack>
        <Link to="/login">Go back to Login</Link>
      </GoBack>
    </Wrapper>
  );
}
