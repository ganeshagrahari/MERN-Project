import React from 'react'
import { Card } from 'react-bootstrap'
import Layout from '../../components/Layout'

/**
* @author
* @function Home
**/

export const Home = (props) => {
  return(
    <Layout>
      <Card style = {{margin:'5rem' , background:'white'}} className="text-center p-4 bg-light">
        <Card.Body>
          <h1>Welcome to Admin Dashboard</h1>
          <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
          </p>
        </Card.Body>
      </Card>
    </Layout>
   )

 }