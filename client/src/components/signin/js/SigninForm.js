import { useState } from 'react';
import '../css/signinForm.scss';
import FormInput from '../../sign/js/FormInput';
import FormButtonYellow from '../../sign/js/FormButtonYellow';
import FormButtonBlue from '../../sign/js/FormButtonBlue';
import kakaoIcon from '../../../assets/img/kakaoIcon.png';
import googleIcon from '../../../assets/img/googleIcon.png';
import { Link } from 'react-router-dom';
import FormInputError from '../../sign/js/FormInputError';
// import { kakaoLogin } from '../../../util/api/oauthKakao';
// import { googleLogin } from '../../../util/api/oauthGoogle';
import {
  submitForm,
  guestLogin,
  sellerLogin,
  userLogout,
} from '../../../util/api/loginForm';
import { tossPay } from '../../../util/api/payment';

export default function SigninForm() {
  const [data, setDate] = useState({});

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const formSubmit = (e) => {
    e.preventDefault();
    let error = false;

    if (data.Email === undefined) {
      setEmailError(true);
      error = true;
    }
    if (data.Password === undefined) {
      setPasswordError(true);
      error = true;
    }
    if (!error) {
      window.alert('제출');
      submitForm({
        email: data.Email,
        password: data.Password,
      });
    }
  };

  const onChangeInput = (e) => {
    setDate({ ...data, [e.target.name]: e.target.value });

    if (data.Email !== undefined) {
      setEmailError(false);
    }
    if (data.Password !== undefined) {
      setPasswordError(false);
    }
  };

  // const handleOAuthKakao = () => {
  //   kakaoLogin();
  // };
  // const handleOAuthGoogle = () => {
  //   googleLogin();
  // };
  return (
    <>
      <div className="signinTitle">
        <h1>Log in</h1>
      </div>
      <form
        className="signinForm"
        action="#"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormInput
          labelName="Email"
          inputId="Text"
          inputType="text"
          name="Email"
          onChangeInput={onChangeInput}
          placeholder="Please enter your Email"
        />
        {emailError && <FormInputError text="Email cannot be empty." />}

        <FormInput
          labelName="Password"
          inputId="Password"
          inputType="Password"
          name="Password"
          onChangeInput={onChangeInput}
          placeholder="Please enter your password"
        />
        {passwordError && <FormInputError text="Password cannot be empty." />}

        <FormButtonYellow formSubmit={formSubmit} btnContent="Log in" />
        <div className="signupLink">
          Don’t have an account?
          <Link to={'/signup'}>Sign in</Link>
        </div>
        <div className="flexBox">
          <a href="https://api.taekgil.xyz/oauth2/authorization/kakao">
            <img src={kakaoIcon} alt="kakaoAuth" />
          </a>
          <a href="https://api.taekgil.xyz/oauth2/authorization/google">
            <img src={googleIcon} alt="googleAuth" />
          </a>
        </div>
        <FormButtonBlue btnContent="Guest" formSubmit={guestLogin} />
        <FormButtonBlue btnContent="Seller" formSubmit={sellerLogin} />
        <FormButtonBlue btnContent="Logout" formSubmit={userLogout} />
        <FormButtonBlue btnContent="payment" formSubmit={tossPay} />
        {/* <FormButtonYellow formSubmit={formSubmit} btnContent="Signup" /> */}
      </form>
    </>
  );
}
