import { Link } from 'react-router-dom';
import './logout.css'
import Header from '../../components/header/Header';


const Logout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')

    return (
        <div className='logout'>
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="title text-center mt-5"><h1>Has Cerrado Sesión correctamente</h1></div>

                {/* *****Buttons***** */}
                <div className="container buttonsLogout">
                    <div className=' row justify-content-around '>
                        <div className="col-auto">
                            <Link className="btn btn-primary" type="button" to="/login">Login</Link>
                        </div>
                        <div className="col-auto">
                            <Link className="btn btn-primary" type="button" to="/">Volver</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Logout;