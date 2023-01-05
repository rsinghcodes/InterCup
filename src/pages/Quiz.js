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
import { fetchQuizzesByTopic, quizSelector } from '../redux/reducers/quizSlice';
// components
import Spinner from '../components/Spinner';
import Score from '../components/Score';

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
    dispatch(fetchQuizzesByTopic(topicname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
          <Spinner />
        ) : (
          <Box
            boxShadow={0}
            sx={{ my: 3, p: 4 }}
            width="100%"
            component="form"
            onSubmit={handleSubmit}
          >
            {showScore ? (
              <Score score={score} quizzes={quizzes} />
            ) : (
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <Typography variant="subtitle1" component="p">
                  Q.{currentQuestion + 1}. {quizzes[currentQuestion]?.question}
                </Typography>
                <RadioGroup
                  name="quiz"
                  value={currentAnswer}
                  onChange={handleRadioChange}
                >
                  {quizzes[currentQuestion]?.options.map((answerOption, i) => (
                    <FormControlLabel
                      key={i}
                      value={answerOption}
                      control={<Radio />}
                      label={answerOption}
                    />
                  ))}
                </RadioGroup>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ mt: 2, textTransform: 'none' }}
                  >
                    Next Question
                  </Button>
                </Box>
              </FormControl>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Quiz;
