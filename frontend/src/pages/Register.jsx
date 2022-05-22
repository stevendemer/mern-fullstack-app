import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

  return (
      <>
        <section className="heading">
            <h1>
                <FaUser />Register
            </h1>
            <p>Please create an account</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" id="name" name="name" value={name} placeholder='Enter your name' className="form-control" onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="email" id="email" name="email" value={email} placeholder='Enter your email' className="form-control" onChange={onChange} />
                </div>
                 <div className="form-group">
                    <input type="password" id="password" name="password" value={password} placeholder='Enter your password' className="form-control" onChange={onChange} />
                </div>
                 <div className="form-group">
                    <input type="password" id="password" name="password" value={password} placeholder='Confirm password' className="form-control" onChange={onChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
      </>
  );
}

export default Register