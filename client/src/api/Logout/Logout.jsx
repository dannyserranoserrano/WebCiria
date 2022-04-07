import {Link} from 'react-router-dom';
import './logout.css'
import Header from '../../components/header/Header';


const Logout = () => {

    // *****Confirmación*****
    let option = window.confirm("Seguro que quieres Salir???")
    if (option === true) {

        // *****Nos Deslogueamos*****
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('name')
    };
    return (
        <div className='logout'>
            <div className="header">
                <Header />
            </div>
            <div className="container bodyLogout">
                <div className='centerLogout'>
                    <div className="logoutTitle text-center"><p>Sesión Cerrada Correctamente</p></div>
                    <div className='row justify-content-center'><img src="../../images/logo.png" alt="Castillo" className="logoLogout col-auto" /></div>
                </div>
                {/* *****Buttons***** */}
                <div className="container buttonsLogout">
                    <div className=' row justify-content-between'>
                        <div className="col-auto">
                            <Link className="btn btn-primary" type="button" to="/">Volver</Link>
                        </div>
                        <div className="col-auto">
                            <Link className="btn btn-success" type="button" to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Logout;