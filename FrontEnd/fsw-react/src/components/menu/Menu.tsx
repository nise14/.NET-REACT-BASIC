import { NavLink } from 'react-router-dom';
import CSS from './Menu.module.css';
import Authentication from '../authentication/Authentication';
import { logout } from '../../utils/Token';
import { useContext } from 'react';
import AuthorizationContext from '../authentication/AuthorizationContext';

export default function Menu() {
    const {updateUserInformations} = useContext(AuthorizationContext);

    return (
        <nav>
            <div className={CSS["option-container"]}>
                <div className={CSS["option"]}>
                    <NavLink to='/'>Inicio</NavLink>
                </div>
                <div className={CSS['separator']}></div>
                <Authentication
                    authenticated={
                        <div className={CSS["option"]}>
                            <div onClick={()=>{
                                logout();
                                updateUserInformations([]);  
                            }}>Salir</div>
                        </div>
                    }
                    noAuthenticated={
                        <>
                            <div className={CSS["option"]}>
                                <NavLink to='/identificate'>Identicate</NavLink>
                            </div>
                            <div className={CSS["option"]}>
                                <NavLink to='/registrate'>Registrate</NavLink>
                            </div>
                        </>
                    } />

            </div>
        </nav>
    );
}