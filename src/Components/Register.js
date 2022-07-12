import { useState } from "react";
import baseurl from "../baseurl";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Register = (props) => {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUp = (e) => {
    e.preventDefault();
    fetch(`${baseurl}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        data.status === 200
          ? navigate("/login")
          : alert(data.message ? data.message : "Something went wrong");
      });
  };
  if (userInfo) {
    window.location.replace("/data-collection");
  }
  return (
    <div className="container min-vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-body  text-white">
              <h1>Register</h1>
              <br />
              <form onSubmit={signUp}>
                <div className="form-group text-start">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control  input"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control input mb-2"
                    id="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>
                    If already a user, Please{" "}
                    <a
                      href="/login"
                      className="text-decoration-none text-warning"
                    >
                      <strong>Login</strong>
                    </a>
                  </label>
                  <br />
                  <button type="submit" className="btn btn-primary mt-5">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
