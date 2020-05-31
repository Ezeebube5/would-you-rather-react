import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Row, Col, Panel, Button,
  FormGroup, FormControl, Glyphicon, Image } from 'react-bootstrap'

class Login extends Component {

  state = {
    imgSrc: '/avatars/avatar3.png',
    userToLogin: null,
    disabled: true
  }

  handleChange = (e) => {
    const { [e.target.value]: selectedUser } = this.props.users
    this.setState({
      imgSrc: selectedUser.avatarURL,
      userToLogin: selectedUser.id
    }, () => {
      if (this.state.userToLogin) {
        this.setState({
          disabled: false
        })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(this.state.userToLogin))
  }

  renderForm = () => (
    <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="formControlsSelect">
        <FormControl componentClass="select" onChange={this.handleChange}>
          <option hidden value="default">Select a user...</option>
          {(Object.values(this.props.users)).map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </FormControl>
      </FormGroup>
      <Button
        disabled={this.state.disabled}
        type="submit" bsStyle="success" block>
        Login
      </Button>
    </form>
  )

  render() {
    return (
      <Row>
        <Col xs={8} xsOffset={2}>
        <Panel bsStyle="success">
          <Panel.Heading>
            <Panel.Title componentClass="h3">
              <Glyphicon glyph="user" />
              Login
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body className="Login">
            <Image src={this.state.imgSrc} thumbnail/>
            {this.renderForm()}
          </Panel.Body>
        </Panel>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps ({ users }) {
  return { users }
}

export default connect(mapStateToProps)(Login)
