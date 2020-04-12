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
      <FormGroup>
        <FormLabel htmlFor="#username">Username</FormLabel>
        <Input id="username" onChange={e => setUsername(e.target.value)}></Input>
        <Button onClick={handleLogin}>Ok</Button>
      </FormGroup>
    </Layout>
  )
}

export default IndexPage
