import React from 'react'
import { Glyphicon } from 'react-bootstrap'

import QuestionPreview from './QuestionPreview'

/**
 * The QuestionList component renders a list of questions.
 * It is used to display 'answered' and 'unanswered' questions on the home page.
 */
const QuestionList = (props) => {
  const { questions, answered } = props
  const questionsArray = Object.values(questions)
  const orderedQuestions = questionsArray.sort((a, b) => {
    return b.timestamp - a.timestamp // sort with newest questions first
  })

  return orderedQuestions.length > 0
    ? <div className="QuestionList">
        {orderedQuestions.map((question) => (
          <QuestionPreview
            key={question.id}
            question={question}
            answered={answered} />
        ))}
      </div>
    : <div className="center">
        <Glyphicon glyph="inbox" /> No questions. 
      </div>
}

export default QuestionList
