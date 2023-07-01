import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Slider from "./slider";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [data, setData] = useState([]);
  let user = JSON.parse(window.localStorage.getItem('user'))

  const navigate=useNavigate()
  const logout=()=>{
    localStorage.clear();
    navigate('/')
  }


  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => {
        console.log("res", res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("dataaaa", data);
  return (
    <Container fluid >

      <Navbar bg="dark" data-bs-theme="dark">
        <Container >
          <Navbar.Brand>Movies Finder App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className=" ">
              {
                user ?
                <Nav.Link onClick={()=>{logout()}}>LogOut</Nav.Link>
                :
              <Nav.Link href="/signin">Signin</Nav.Link>

            }
              {
                user ?
               ''
                :
                <Nav.Link href="/signup">Signup</Nav.Link>


            }
            {/* <Nav.Link href="/admin">Adimn</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container >
      </Navbar>
      <div>
        <Slider SlideData={data} />
      </div>
     {
      user ? <Button
      href="/dash"
     variant='dark'
      className="d-grid gap-2"
      size="lg"
    >
      Dashboard
    </Button>  :
    ''
     }
   
      </Container>

  );
};

export default Home;
