import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { db } from "./firebase";
const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const initialStateValues = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleControlChange = (e) => {
    const { name, value } = e.target
    // console.log(name, value);
    setValues({ ...values,
       [name]: value
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   props.addData(values);
   setValues({...initialStateValues})

   };

  const loadUserInForm = async (id) => {
  const busquedaUser = props.users.find( user => id == user.id)
    //console.log(result.data())
    setValues({email: busquedaUser.email, password:busquedaUser.password})
  }
  useEffect(()=>{
  //  console.log(props.currentId)
    if (props.currentId ===""){
      setValues({...initialStateValues});
    } else {
    //  console.log("Editando Link")
    loadUserInForm(props.currentId);
    }
  },[props.currentId]);

  return (
    <>
      <Card>
        <Card.Body>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                ref={emailRef}
                placeholder="Enter email"
                onChange={handleControlChange}
                value={values.email}
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                ref={passwordRef}
                placeholder="Password"
                onChange={handleControlChange}
                 value={values.password}
              />
            </Form.Group>
            <Button variant="primary" size="lg" block type="submit"> {props.currentId ==="" ? "Guardar": "Actualizar"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
export default Login;