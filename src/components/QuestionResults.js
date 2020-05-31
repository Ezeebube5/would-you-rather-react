import React from 'react'
import { Row, Col, Panel, Image, ListGroup,
  ListGroupItem, ProgressBar, Badge, Glyphicon, Label } from 'react-bootstrap'

const QuestionResults = (props) => {
  const { author } = props
  return (
    <Panel bsStyle="success" className="QuestionContainer">
      <Panel.Heading>
        <Panel.Title componentClass="h3">
          Asked by {author.name}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={3} className="test">
            <Image circle className="avatar" src={author.avatarURL} />
          </Col>
          <Col xs={9}>{resultsListGroup(props)}</Col>
        </Row>
      </Panel.Body>
    </Panel>
  )
}

const resultsListGroup = (props) => {
  const { question, optionOne, optionTwo } = props
  const optionOneVotes = question.optionOne.votes.length
  const optionTwoVotes = question.optionTwo.votes.length
  const totalVotes = optionOneVotes + optionTwoVotes
  const optionOnePercentage = (optionOneVotes / totalVotes) * 100
  const optionTwoPercentage = (optionTwoVotes / totalVotes) * 100
  return (
    <ListGroup>
      <ListGroupItem bsStyle={optionOne ? 'success' : null}>
        {optionOne ? <Badge><Glyphicon glyph="star" /> You Voted</Badge> : null}
        <p>Would you rather {question.optionOne.text}</p>
        <ProgressBar now={optionOnePercentage} />
        <div className="vote-summary">
        <Label bsStyle="success">{optionOneVotes} out of {totalVotes} votes</Label>
        </div>
      </ListGroupItem>
      <ListGroupItem bsStyle={optionTwo ? 'success' : null}>
        {optionTwo ? <Badge><Glyphicon glyph="heart" /> You Voted</Badge> : null}
        <p>Would you rather {question.optionTwo.text}</p>
        <ProgressBar now={optionTwoPercentage} />
        <div className="vote-summary">
        <Label bsStyle="success">{optionTwoVotes} out of {totalVotes} votes</Label>
        </div>
      </ListGroupItem>
    </ListGroup>
  )
}

export default QuestionResults
