import React from 'react'
import Layout from '../../components/Layout'
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap'
import Input from '../../components/UI/Input'

/**
* @author
* @function Signin
**/

export const Signin = (props) => {
  return(
   <Layout>
     <Container>
       <Row className="justify-content-center">
         <Col md={6}>
           <Card className="mt-5">
             <Card.Body>
               <Card.Title className="text-center mb-4">Sign In</Card.Title>
               <Form>
                 <Input 
                   controlId="formBasicEmail"
                   label="Email address"
                   type="email"
                   placeholder="Enter email"
                   errorMessage="We'll never share your email with anyone else."
                 />

                 <Input 
                   controlId="formBasicPassword"
                   label="Password"
                   type="password"
                   placeholder="Password"
                 />

                 <div className="d-grid">
                   <Button variant="primary" type="submit">
                     Sign In
                   </Button>
                 </div>
               </Form>
             </Card.Body>
           </Card>
         </Col>
       </Row>
     </Container>
   </Layout>
   )

 }