import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { useAuth } from '../context/authContext';

function QandA() {
  const [auth, setAuth] = useAuth();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showAnswers, setShowAnswers] = useState({});
  const [showAnswerTextarea, setShowAnswerTextarea] = useState({});
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editedAnswerText, setEditedAnswerText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/events/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/events/questions', { question: newQuestion, user: auth.user.name })
      .then(res => {
        setQuestions([...questions, res.data]);
        setNewQuestion('');
      })
      .catch(err => console.error(err));
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (selectedQuestionId && newAnswer) {
      axios.post(`http://localhost:8080/events/${selectedQuestionId}/answer`, { 
        answer: newAnswer, 
        user: auth.user.name
      })
        .then(res => {
          const updatedQuestions = questions.map((q) =>
            q._id === selectedQuestionId ? { 
              ...q, 
              answers: [...q.answers, res.data]
            } : q
          );
          setQuestions(updatedQuestions);
          setNewAnswer('');
          setShowAnswerTextarea((prevState) => ({ ...prevState, [selectedQuestionId]: false }));
        window.location.reload();
        })
        .catch((err) => console.error(err));
    }
  };

  const toggleAnswers = (questionId) => {
    setShowAnswers((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
    setShowAnswerTextarea((prevState) => ({
      ...prevState,
      [questionId]: false,
    }));
  };

  const showAnswerTextareaFunc = (questionId) => {
    setShowAnswerTextarea((prevState) => ({
      ...prevState,
      [questionId]: true,
    }));
    setSelectedQuestionId(questionId);
  };

  // Thumbs Up (Upvote)
  const handleThumbsUp = (answerId, questionId) => {
    axios.post(`http://localhost:8080/events/${questionId}/answer/${answerId}/upvote`)
      .then(res => {
        const updatedQuestions = questions.map((q) => {
          if (q._id === questionId) {
            const updatedAnswers = q.answers.map((a) =>
              a._id === answerId ? { ...a, votes: a.votes + 1 } : a
            );
            return { ...q, answers: updatedAnswers };
          }
          return q;
        });
        setQuestions(updatedQuestions);
      })
      .catch(err => console.error(err));
  };

  // Thumbs Down (Downvote)
  const handleThumbsDown = (answerId, questionId) => {
    axios.post(`http://localhost:8080/events/${questionId}/answer/${answerId}/downvote`)
      .then(res => {
        const updatedQuestions = questions.map((q) => {
          if (q._id === questionId) {
            const updatedAnswers = q.answers.map((a) =>
              a._id === answerId ? { ...a, votes: a.votes - 1 } : a
            );
            return { ...q, answers: updatedAnswers };
          }
          return q;
        });
        setQuestions(updatedQuestions);
      })
      .catch(err => console.error(err));
  };

  const handleEditAnswer = (answerId, questionId, currentText) => {
    setEditingAnswerId(answerId);
    setEditedAnswerText(currentText);
  };

  const handleSaveEdit = (answerId, questionId) => {
    axios.put(`http://localhost:8080/events/${questionId}/answer/${answerId}`, { answer: editedAnswerText })
      .then(res => {
        const updatedQuestions = questions.map((q) => {
          if (q._id === questionId) {
            const updatedAnswers = q.answers.map((a) =>
              a._id === answerId ? { ...a, answer: editedAnswerText } : a
            );
            return { ...q, answers: updatedAnswers };
          }
          return q;
        });
        setQuestions(updatedQuestions);
        setEditingAnswerId(null);
        setEditedAnswerText('');
      })
      .catch(err => console.error(err));
  };

  const handleDeleteAnswer = (answerId, questionId) => {
    axios.delete(`http://localhost:8080/events/${questionId}/answer/${answerId}`)
      .then(res => {
        const updatedQuestions = questions.map((q) => {
          if (q._id === questionId) {
            const updatedAnswers = q.answers.filter((a) => a._id !== answerId);
            return { ...q, answers: updatedAnswers };
          }
          return q;
        });
        setQuestions(updatedQuestions);
      })
      .catch(err => console.error(err));
  };

  return (
    <Layout>
      <div className="app-container">
        <h1 className="section-title">Q&A Page</h1>

        <div className="question-section">
          <h3>Questions :</h3>
          {questions.map((question) => (
            <div key={question._id} className="question-item">
              <h4 className='question-by'>{question.user}</h4>
              <p className="question-text">{question.question}</p>

              <button className="answer-button" onClick={() => showAnswerTextareaFunc(question._id)}>
                Give Your Answer
              </button>
              <button className="answer-button" onClick={() => toggleAnswers(question._id)}>
                {showAnswers[question._id] ? 'Hide Answers' : 'Show All Answers'}
              </button>

              {showAnswerTextarea[question._id] && (
                <div className='ask-question-sections'>
                  <textarea
                    className="custom-textarea"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Write your answer here..."
                  />
                  <button className="custom-button" onClick={handleAnswerSubmit}>
                    <i className="fa-solid fa-circle-right"></i>
                  </button>
                </div>
              )}

              {showAnswers[question._id] && question.answers.length > 0 && (
                <div className="answer-section">
                  <h3>Answers</h3>
                  {question.answers.map((answer) => (
  <div key={answer._id} className="answer-item">
    <div className="answer-content">
      <p className="em">
        <h5 className="hh6">{answer.user} :</h5> {answer.answer}
      </p>

      {/* Thumbs up and down buttons with the count */}
      <div className="vote-buttons">
        <button onClick={() => handleThumbsUp(answer._id, question._id)}>
          <i className="fas fa-thumbs-up"></i>
        </button>
        <span className="vote-count">{answer.votes}</span>
        <button onClick={() => handleThumbsDown(answer._id, question._id)}>
          <i className="fas fa-thumbs-down"></i>
        </button>
      </div>
    </div>

    {/* Edit and Delete buttons */}
    {answer.user === auth.user.name && (
      <div className="answer-actions">
        {editingAnswerId === answer._id ? (
          <div>
            <textarea
              value={editedAnswerText}
              onChange={(e) => setEditedAnswerText(e.target.value)}
            />
            <button onClick={() => handleSaveEdit(answer._id, question._id)}>Save</button>
          </div>
        ) : (
          <button onClick={() => handleEditAnswer(answer._id, question._id, answer.answer)}>
            Edit
          </button>
        )}
        <button onClick={() => handleDeleteAnswer(answer._id, question._id)}>Delete</button>
      </div>
    )}
  </div>
))}

                </div>
              )}
            </div>
          ))}
        </div>

        <div className="ask-question-section">
          <textarea
            className="ask-question-textarea"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask your question here..."
          />
          <button className="ask-question-btn" onClick={handleQuestionSubmit}>
            <i className="fa-solid fa-circle-up"></i>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default QandA;
