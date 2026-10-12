import React, { Fragment, useEffect, useState } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const { name, email, password } = user;

  const loginSubmit = (event) => {
    event.preventDefault();
    dispatch(login(loginEmail.trim(), loginPassword));
  };

  const registerSubmit = (event) => {
    event.preventDefault();
    const form = new FormData();
    form.set("name", name);
    form.set("email", email);
    form.set("password", password);
    form.set("avatar", avatar);
    dispatch(register(form));
  };

  const registerDataChange = (event) => {
    if (event.target.name === "avatar") {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setUser((current) => ({ ...current, [event.target.name]: event.target.value }));
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) history.push(redirect);
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <main className="authPage">
          <section className="authCard" aria-label="Account access">
            <aside className="authWelcome">
              <Link className="authBrand" to="/" aria-label="Ecommerce home">
                <span className="authBrandMark">E</span>
                <span>EVERMART</span>
              </Link>
              <div className="authWelcomeCopy">
                <span className="authEyebrow">A better way to shop</span>
                <h1>Find the things that make life better.</h1>
                <p>Thoughtful picks, everyday essentials, and a little inspiration for what’s next.</p>
              </div>
              <div className="authWelcomeFooter">
                <span className="authDot" /> Curated for everyday living
              </div>
            </aside>

            <div className="authPanel">
              <div className="authMobileBrand">
                <span className="authBrandMark">E</span> EVERMART
              </div>
              <div className="authTabs" role="tablist" aria-label="Account options">
                <button className={activeTab === "login" ? "authTab isActive" : "authTab"} type="button" role="tab" aria-selected={activeTab === "login"} onClick={() => setActiveTab("login")}>Sign in</button>
                <button className={activeTab === "register" ? "authTab isActive" : "authTab"} type="button" role="tab" aria-selected={activeTab === "register"} onClick={() => setActiveTab("register")}>Create account</button>
              </div>

              {activeTab === "login" ? (
                <div className="authFormWrap" role="tabpanel">
                  <span className="authEyebrow">WELCOME BACK</span>
                  <h2>Sign in to your account</h2>
                  <p className="authIntro">Pick up where you left off.</p>
                  <form className="authForm" onSubmit={loginSubmit}>
                    <label className="authField">
                      <span>Email address</span>
                      <span className="authInputWrap"><MailOutlineIcon aria-hidden="true" /><input type="email" name="email" autoComplete="email" placeholder="you@example.com" required value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} /></span>
                    </label>
                    <label className="authField">
                      <span>Password</span>
                      <span className="authInputWrap"><LockOpenIcon aria-hidden="true" /><input type="password" name="password" autoComplete="current-password" placeholder="Enter your password" required value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} /></span>
                    </label>
                    <div className="authFormMeta"><span>Secure sign in</span><Link to="/password/forgot">Forgot password?</Link></div>
                    <button className="authSubmit" type="submit">Sign in <span aria-hidden="true">→</span></button>
                  </form>
                  <p className="authSwitchPrompt">New to Evermart? <button type="button" onClick={() => setActiveTab("register")}>Create an account</button></p>
                </div>
              ) : (
                <div className="authFormWrap registerPanel" role="tabpanel">
                  <span className="authEyebrow">GET STARTED</span>
                  <h2>Create your account</h2>
                  <p className="authIntro">Join us for a more personal shopping experience.</p>
                  <form className="authForm" encType="multipart/form-data" onSubmit={registerSubmit}>
                    <label className="authField"><span>Your name</span><span className="authInputWrap"><FaceIcon aria-hidden="true" /><input type="text" name="name" autoComplete="name" placeholder="Full name" required value={name} onChange={registerDataChange} /></span></label>
                    <label className="authField"><span>Email address</span><span className="authInputWrap"><MailOutlineIcon aria-hidden="true" /><input type="email" name="email" autoComplete="email" placeholder="you@example.com" required value={email} onChange={registerDataChange} /></span></label>
                    <label className="authField"><span>Password</span><span className="authInputWrap"><LockOpenIcon aria-hidden="true" /><input type="password" name="password" autoComplete="new-password" placeholder="Create a password" required value={password} onChange={registerDataChange} /></span></label>
                    <div className="authAvatarRow"><img src={avatarPreview} alt="Profile preview" /><label className="authAvatarUpload">Add a profile photo<input type="file" name="avatar" accept="image/*" onChange={registerDataChange} /></label></div>
                    <button className="authSubmit" type="submit">Create account <span aria-hidden="true">→</span></button>
                  </form>
                  <p className="authSwitchPrompt">Already have an account? <button type="button" onClick={() => setActiveTab("login")}>Sign in</button></p>
                </div>
              )}
              <p className="authLegal">By continuing, you agree to our <Link to="/about">Terms</Link> and <Link to="/about">Privacy Policy</Link>.</p>
            </div>
          </section>
        </main>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
