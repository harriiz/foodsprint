import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { authApiSlice } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";
import { Input } from "@mantine/core";
//import { IconLock, IconAt } from "@tabler/icons-react";
import { Checkbox } from "@mantine/core";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();

      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/main");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  localStorage.setItem("username", JSON.stringify(username));

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <p>Loading...</p>;

  const content = (
    <section>
      <div className="loginPage">
        <div className="loginLijevo">
          <img
            src={require("../../components/componentsHero/slike/foodsprint-logov6.png")}
            className="logo"
          />
          <h1 className="loginNaslov">Prijava</h1>
          <p>Dobro došli nazad na FoodSprint!</p>
          <div className="errorMsg">
            <p ref={errRef} className={errClass} aria-live="assertive">
              {errMsg}
            </p>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="inputs">
              <Input
                //   icon={<IconAt />}
                placeholder="Korisničko ime"
                radius="md"
                size="xl"
                type="text"
                id="username"
                ref={userRef}
                value={username}
                onChange={handleUserInput}
                autoComplete="off"
                required
                className="input"
              />
              <Input
                //      icon={<IconLock />}
                placeholder="Šifra"
                radius="md"
                size="xl"
                id="password"
                type="password"
                onChange={handlePwdInput}
                value={password}
                required
                className="input"
              />

              <Checkbox
                label="Zapamti me"
                color="green"
                size="lg"
                type="checkbox"
                className="zapamtiMe"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
            </div>
            <div className="submitForm">
              <button className="submitBtn">Prijava</button>
            </div>
            <Link className="povratak" to="/">
              Nazad na Početak
            </Link>
          </form>
        </div>
        <div className="loginDesno">
          {/* <img src={require("./slike/login.svg").default} /> */}
        </div>
      </div>
    </section>
  );

  return content;
};
export default Login;
