import './App.css';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import { Navbar, Nav, Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Logo from './img/logo.png'
import LogoPreto from './img/logo_preto.png'
import LoginScreen from './screens/Login.js' 

export default function Header() {
  const [modalLogin, setModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleClose = () => setModal(false);
  const handleShow = (tipo) => {
    tipo === "login" ? setLogin(true) : setLogin(false);
    setModal(true)
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(localStorage.getItem("email"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null);
    navigate('/');
  };

  return (
    <div className="App">
      <Navbar className="me-auto py-4 Header">
        <Navbar.Brand href="/">
          <img alt="Logo" src={Logo}/>
        </Navbar.Brand>
        <Navbar.Toggle className="mx-2" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="me-auto justify-content-end">
        <Nav className="mr-auto mx-4">
            {user ? (
              <>
                <Nav.Link className="mx-2">Olá, {user}</Nav.Link>
                <Button onClick={handleLogout} className="mx-2" variant="outline-danger">Logout</Button>
              </>
            ) : (
              <>
                <Nav.Link className="mx-2" onClick={() => handleShow("singIn")}>Inscreva-se</Nav.Link>
                <Button onClick={() => handleShow("login")} className="mx-2" variant="outline-success">Login</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={modalLogin} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
            <img alt="Logo" className='Modal-logo' src={LogoPreto}/>
            <div className='Menu-choose'>
              <button className={login === true ? "Chosen" : "NotChosen"} onClick={() => handleShow("login")}>Acessar</button>
              <button className={login === false ? "Chosen" : "NotChosen"} onClick={() => handleShow("singIn")}>Inscrever</button>
            </div>
        </Modal.Header>
        <Modal.Body>
          <LoginScreen tipo={login} setUser={setUser} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <Outlet/>
    </div>
  );
}