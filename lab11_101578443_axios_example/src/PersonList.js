
import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Container } from "react-bootstrap";

class PersonList extends Component {
  // Define state default values
  state = {
    persons: []
  };

  // Component Lifecycle Callback
  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((res) => {
        console.log(res.data);

        const persons = res.data.results;
        this.setState({ persons });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  render() {
    return (
      <Container>
        <h2 className="text-center bg-success text-white p-3">
          User List
        </h2>

        {this.state.persons.map((person) => (
          <Card
            key={person.login.uuid}
            className="mb-3 bg-info"
          >
            <Card.Body>
              <div className="d-flex align-items-center gap-4">
                <div className="text-center">
                  <img
                    src={person.picture.large}
                    alt={person.name.first}
                    className="rounded-circle mb-3"
                    width="120"
                    height="120"
                  />

                  <Button variant="primary" size="sm">
                    Details
                  </Button>
                </div>

                <div>
                  <p><strong>Name:</strong> {person.name.first} {person.name.last}</p>
                  <p><strong>Username:</strong> {person.login.username}</p>
                  <p><strong>Gender:</strong> {person.gender}</p>
                  <p><strong>Email:</strong> {person.email}</p>
                  <p><strong>Phone:</strong> {person.phone}</p>
                  <p><strong>Cell:</strong> {person.cell}</p>
                  <p><strong>City:</strong> {person.location.city}</p>
                  <p><strong>Country:</strong> {person.location.country}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    );
  }
}

export default PersonList;
