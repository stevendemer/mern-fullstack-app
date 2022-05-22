import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        } 
        if (isSuccess || user) {
            navigate('/'); // to dashboard
        }
        dispatch(reset());

    }, [user, message, navigate, dispatch, isSuccess, isError]);


    const { email, password} = formData;

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email, 
            password
        };

        dispatch(login(userData));

       if (isLoading) {
            return <Spinner />
        }
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