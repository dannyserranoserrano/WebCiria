import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import './login.css'
import axios from 'axios';
import Header from '../../components/header/Header';


const Login = () => {

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:5000/api/login',
                { ...userLogin })
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("role", response.data.role)
            localStorage.setItem("name", response.data.name)
            setSuccessMessage(response.data.message)

            setTimeout(() => {
                navigate('/')
            }, 2000)


        } catch (error) {
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
                window.location.href = "/login"
            }, 2000)
        }
    };

    return (
        <div className='login'>
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="title text-center mt-5"><h1>LOGUEATE</h1></div>
                <form onSubmit={handleSubmit} className="g-3 mt-5">
                    <div className='row justify-content-around'>

                        <div className="col-lg-3">
                            <label className="form-label">Email</label>
                            <div className="input-group">
                                <span className="input-group-text" id="inputGroupPrepend2">@</span>
                                <input type="email" name="email" className="form-control" id="validationDefaultUsername"
                                    aria-describedby="inputGroupPrepend2" onChange={handleChange} placeholder="Introduce Tu Email" required />
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text" id="inputGroupPrepend2">***</span>
                                <input type="password" name="password" className="form-control" id="validationDefaultPassword"
                                    aria-describedby="inputGroupPrepend2" onChange={handleChange} placeholder="Escribe Un Password" required />
                            </div>
                        </div>

                        {/* *****AVISOS DE ERRORES***** */}
                        <div className="message_ok shadow-lg p-3 bg-body rounded border" style={{ display: successMessage ? "block" : "none" }}>
                            {successMessage}
                        </div>
                        <div className="message_nok shadow-lg p-3  bg-body rounded border" style={{ display: errorMessage ? "block" : "none" }}>
                            {errorMessage}
                        </div>

                        {/* *****Buttons***** */}
                        <div className="container buttons1">
                            <div className=' row justify-content-around '>
                                <div className="col-auto">
                                    <button className="btn btn-primary" type="submit" onChange={handleChange}
                                        disabled={!userLogin.email.length || !userLogin.password.length}>Login</button>
                                </div>
                                <div className="col-auto">
                                    <Link className="btn btn-primary" type="button" to="/">Volver</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div >
    )
};

export default Login;