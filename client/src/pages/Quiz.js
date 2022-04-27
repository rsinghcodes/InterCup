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
  const { quizzes } = useSelector(quizSelector);
  const [value, setValue] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value && value === quizzes[currentQuestion].answer) {
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
      <Box
        boxShadow={6}
        sx={{ my: 3, p: 4 }}
        width="100%"
        component="form"
        onSubmit={handleSubmit}
      >
        {showScore ? (
          <Typography
            variant="h5"
            component="h5"
            textAlign="center"
            fontWeight="600"
          >
            {`You scored ${score} out of ${quizzes.length}`}
          </Typography>
        ) : (
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <Typography variant="subtitle1" component="p">
              {`Q.${currentQuestion + 1}. ${quizzes[currentQuestion].question}`}
            </Typography>
            <RadioGroup name="quiz" value={value} onChange={handleRadioChange}>
              {quizzes[currentQuestion].option.map((answerOption, i) => (
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
    </Box>
  );
};

export default Quiz;
