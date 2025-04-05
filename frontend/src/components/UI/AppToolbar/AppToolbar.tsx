import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AppToolbar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark" className="mb-5">
      <Container>
        <NavLink to="/" className="navbar-brand">
          News
        </NavLink>
      </Container>
    </Navbar>
  );
};

export default AppToolbar;
