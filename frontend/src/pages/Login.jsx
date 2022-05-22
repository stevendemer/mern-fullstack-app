import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password} = formData;

    const onSubmit = (e) => {

    }

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev, 
            [e.target.name]: e.target.value
        }));
    }

  return (
      <>
        <section className="heading">
            <h1>
                <FaSignInAlt />Login
            </h1>
            <p>Login and start setting goals</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" id="email" name="email" value={email} placeholder='Enter your email' className="form-control" onChange={onChange} />
                </div>
                 <div className="form-group">
                    <input type="password" id="password" name="password" value={password} placeholder='Enter your password' className="form-control" onChange={onChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">Login</button>
                </div>
            </form>
        </section>
      </>
  );
}

export default Login