import { useState } from "react";
import baseurl from "../baseurl";
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Login = (props) => {
    const cookies = new Cookies();
    const userInfo = cookies.get('userInfo')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const signIn = (e) => {
        e.preventDefault();
        fetch(`${baseurl}/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                data.status === 200 ? navigate("/data-collection") : alert(data.message ? data.message : "Something went wrong");
                if (data.status === 200) { cookies.set('userInfo', data.email) }
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
                            <form onSubmit={signIn}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control  input"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control input"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-primary">
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
export default Login;
