import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Panel, Image, Well,
  ListGroup, ListGroupItem, Badge } from 'react-bootstrap'

class Leaderboard extends Component {

  showLeaderBoard = (leader, index) => (
    <Panel key={leader.id} bsStyle="success">
      <Panel.Heading>
        <Panel.Title componentClass="h3">
          <Badge className="leader-badge">{index + 1} </Badge>
          {leader.name}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={3}>
            <Image circle className="avatar" src={leader.avatarURL} />
          </Col>
          <Col xs={5}>
            <ListGroup className="leaderboard-stat">
              <ListGroupItem>
                <span>{(Object.keys(leader.answers)).length}</span>
                Answered Questions
              </ListGroupItem>
              <ListGroupItem>
                <span>{leader.questions.length}</span>
                Created Questions
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs={4}>
            <Panel className="score">
              <Panel.Heading className="scoreHeader">Score</Panel.Heading>
              <Panel.Body>
                <p>
                  {(Object.keys(leader.answers)).length + leader.questions.length}
                </p>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  )

  render() {
    return (
      <Well>
        {this.props.leaderBoard.map((leader, index) => (
          this.showLeaderBoard(leader, index)
        ))}
      </Well>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  const sortedLeaderBoard = (Object.values(users)).sort((a, b) => {
    const aTotal = Object.keys(a.answers).length + a.questions.length
    const bTotal = Object.keys(b.answers).length + b.questions.length
    return bTotal - aTotal
  })
  return {
    authedUser,
    leaderBoard: sortedLeaderBoard
  }
}

export default connect(mapStateToProps)(Leaderboard)
