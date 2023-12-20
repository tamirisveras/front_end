import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MyNavbar() {

  const checkLogin = () =>{
    let token = localStorage.getItem('accessToken')
    return token ? true : false
  }

  const logout = ()=> {
    localStorage.clear()
  }

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#e7b8e7' }}>
      <Container>
        <Navbar.Brand href="/">Sabão das Duas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create-user">Cadastro</Nav.Link>
           
              <Nav.Link href="/admin">Administração</Nav.Link>
              
            
            {
              checkLogin() ? 
              
                <Nav.Link href="/" onClick={logout}>Sair</Nav.Link> 
                : <Nav.Link href="/login-user">Login</Nav.Link>
            }
          
          </Nav>
          {
              checkLogin() ?
                <Nav.Link href="/user-page">Meu perfil</Nav.Link> 
                : <Nav.Item></Nav.Item>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar