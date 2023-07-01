import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Slider from "./slider";
import {
  Navbar,
  Container,
  Nav,
  Card,
  CardGroup,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Rings } from "react-loader-spinner";

const Dashboard = (props) => {
  console.log("Dash", props);
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
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
        setSearchInput(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/genres")
      .then((res) => {
        console.log("res", res.data);
        setGenres(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  console.log("dash", data);

  //search============

  const handleSearch = (e) => {
    const searchinp = e.target.value;
    console.log(searchinp);
    setSearchInput(
      data.filter(
        (item) => item.title && item.title.toLowerCase().includes(searchinp)
      )
    );

    if (e.target.value === "") setSearchInput([]);
    if (!searchInput) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  return (
    <Container fluid>
      <Row >
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Dashboard</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav className=" ">
                <Nav.Link href="/">Back</Nav.Link>
                <Nav.Link onClick={()=>{logout()}}>LogOut</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      {loading ? (
        <div className="loader-container">
          <Rings type="Puff" color="#00BFFF" height={300} width={300} />
        </div>
      ) : (
        <>
          <Container fluid>
            <Row >
              <Col sm={2}>
                <h3> Movies genres</h3>
               
                {genres.map((item, index) => {
                  return (
                    <div key={index}>
                      <Link
                        to="/gen"
                        onClick={() => {props.comedyHandler(item)}}
                      >
                        {item}
                      </Link>
                    </div>
                  );
                })}
              </Col>

              <Col sm={10} >
                <Row  >
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={handleSearch}
                    />
                  </Form>
                </Row>
                {search && (
                  <Row >
                    <CardGroup>
                      {searchInput?.length !== 0 &&
                        searchInput?.map((item, index) => {
                          return (
                            <div key={index}>
                              <Card style={{ maxWidth: "200px" }}>
                                <Card.Img variant="top" src={item.posterUrl} />
                                <Card.Body>
                                  <Card.Title>{item.title}</Card.Title>
                                  <Card.Text>
                                    {item.director}
                                    {item.actors}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </div>
                          );
                        })}
                    </CardGroup>
                  </Row>
                )}

                <Row >
                  <div>
                    <Slider SlideData={data} />
                  </div>
                </Row>
                <Row >
                  <CardGroup>
                    {data?.length !== 0 &&
                      data?.map((item, index) => {
                        return (
                          <div key={index}>
                            <Card
                              className="ms-2"
                              style={{ maxWidth: "150px" }}
                            >
                              <Card.Img variant="top" src={item.posterUrl} />
                              <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                  {item.director}
                                  {item.actors}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        );
                      })}
                  </CardGroup>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
