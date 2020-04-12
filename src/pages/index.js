import React, {useState, useEffect} from "react"
import { navigate } from 'gatsby'
import { Button, FormLabel, Input, FormGroup } from '@material-ui/core'

import Layout from "../components/layout"
import SEO from "../components/seo"
import login from "../services/login"

const IndexPage = () => {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username)
    }
  })

  const handleLogin = () => {
    // Placeholder for real login
    navigate('/chat');
  }

  return (
    <Layout>
      <SEO title="Login" />
      <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
       <FormGroup>
          <FormLabel htmlFor="#username">Username</FormLabel>
          <Input id="username" onChange={e => setUsername(e.target.value)}></Input>
          <Button type="submit">Ok</Button>
       </FormGroup>
      </form>
    </Layout>
  )
}

export default IndexPage
