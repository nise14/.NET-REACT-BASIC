import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './assets/logo.png';
import user from './assets/usuarios.png';
import Menu from './components/menu/Menu';
import Inicio from './components/pages/inicio/Inicio';
import Registrate from './components/pages/registrate/Registrate';
import Identificate from './components/pages/identificate/Identificate';
import Info from './components/pages/info/Info';
import AuthorizationContext, { UserInformation } from './components/authentication/AuthorizationContext';
import { useCallback, useEffect, useState } from 'react';
import { getUserInformation, readToken } from './utils/Token';

function App() {
  const [userInformations, setUserInformations] = useState<UserInformation[]>([]);

  function updateUserInformations(userInformations: UserInformation[]) {
    setUserInformations(userInformations);
  }

  useEffect(() => {
    setUserInformations(getUserInformation());
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <AuthorizationContext.Provider value={{ userInformations, updateUserInformations }}>
          <div className="header">
            <div className="logo">
              <img src={logo} alt='' width={100} height={100} />
            </div>
            <div className="title">WEB APP</div>
            <div className="user">
              <img src={user} alt='' width={60} height={60} />
              <div>
                {(userInformations && userInformations.length > 0) ? <>{readToken("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")}</> : <>Invitado</>}
              </div>
            </div>
          </div>
          <div className="navbar"><Menu /></div>
          <div className="main">
            <Routes>
              <Route path='/' element={<Inicio />} />
              <Route path='/info' element={<Info />} />
              <Route path='/identificate' element={<Identificate />} />
              <Route path='/registrate' element={<Registrate />} />
            </Routes>
          </div>
          <div className="footer">@nick, Todos los derechos reservados</div>
        </AuthorizationContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
