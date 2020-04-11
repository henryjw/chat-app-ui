import React from "react"
import { Button, FormLabel, FormControl, Input, FormGroup } from '@material-ui/core'

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Login" />
    <FormGroup>
      <FormLabel htmlFor="#username">Username</FormLabel>
      <Input id="username"></Input>
      <Button>Ok</Button>
    </FormGroup>
  </Layout>
)

export default IndexPage
