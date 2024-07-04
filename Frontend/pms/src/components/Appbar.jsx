import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "./image/logo.jpg"
function Appbar() {
    
    const navigate = useNavigate()
    const onlogoutHandle = () => {
        localStorage.clear()
        navigate("/sign-in")

    }
    return (
        <Navbar expand="lg" className="navbar sticky-top">
            <Container>
                <Navbar.Brand href="#home">
                    <img src={logo} alt="" className='h-16' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* <NavLink className="nav-link text-white " to="/">PROJECT</NavLink> */}
                        <NavLink className="nav-link text-white" to="/">STUDENTS</NavLink>
                        <NavLink className="nav-link text-white" to="/course" >COURSE</NavLink>
                        <NavLink className="nav-link text-white" to="/incomplete" >INCOMPLETE PROJECT</NavLink>
                    </Nav>
                    <button className='nav-butt text-white rounded px-6 py-2 ms-4' onClick={onlogoutHandle}>Logout</button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Appbar;