import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizzes, quizSelector } from '../redux/reducers/quizSlice';

const Quiz = () => {
  const { topicname } = useParams();
  const dispatch = useDispatch();
  const { quizzes, isLoading } = useSelector(quizSelector);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleRadioChange = (event) => {
    setCurrentAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentAnswer && currentAnswer === quizzes[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizzes.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    dispatch(fetchQuizzes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="1.5rem"
      flexDirection="column"
    >
      <Typography variant="h5" component="h5" fontWeight="600">
        {topicname.charAt(0).toUpperCase() + topicname.slice(1)} Quiz
      </Typography>
      <Divider />
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Chip label={`Score: ${score}`} />
      </Box>
      {isLoading ? (
        <Typography variant="subtitle1" component="p">
          Please wait..., Questions loading...
        </Typography>
      ) : (
        <Box
          boxShadow={showScore ? 0 : 5}
          sx={{ my: 3, p: 4 }}
          width="100%"
          component="form"
          onSubmit={handleSubmit}
        >
          {showScore ? (
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src="/assets/images/quiz-completed.jpg"
                  alt="Quiz completed"
                  width={250}
                />
              </Box>
              <Typography
                variant="h5"
                component="h5"
                textAlign="center"
                fontWeight="600"
                color="primary"
                mb={2}
              >
                You have completed the quiz!
              </Typography>
              <Typography
                variant="subtitle1"
                component="h6"
                textAlign="center"
                my={2}
              >
                You scored {score} out of {quizzes.length}
              </Typography>
              <Typography variant="subtitle1" component="h6" textAlign="center">
                Thank You!!
              </Typography>
            </>
          ) : (
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <Typography variant="subtitle1" component="p">
                Q.{currentQuestion + 1}. {quizzes[currentQuestion].question}
              </Typography>
              <RadioGroup
                name="quiz"
                value={currentAnswer}
                onChange={handleRadioChange}
              >
                {quizzes[currentQuestion].options.map((answerOption, i) => (
                  <FormControlLabel
                    key={i}
                    value={answerOption}
                    control={<Radio />}
                    label={answerOption}
                  />
                ))}
              </RadioGroup>
              <Button fullWidth type="submit" variant="outlined" sx={{ mt: 2 }}>
                Next Question
              </Button>
            </FormControl>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Quiz;
