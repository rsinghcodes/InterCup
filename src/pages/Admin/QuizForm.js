import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  Stack,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Container,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
// Redux
import { useDispatch } from 'react-redux';
import { createQuiz } from '../../redux/reducers/quizSlice';

const QuizForm = () => {
  const dispatch = useDispatch();
  let [answers, setAnswers] = useState([]);

  const QuizSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
  });

  const formik = useFormik({
    initialValues: {
      topic: '',
      question: '',
      answer: '',
      options: [],
    },
    validationSchema: QuizSchema,
    onSubmit: () => {
      dispatch(createQuiz({ ...values, options: answers }));
      resetForm();
      setAnswers([]);
    },
  });

  const { errors, touched, values, resetForm, handleSubmit, getFieldProps } =
    formik;

  let handleQuestion = (e, num) => {
    let mutable = [...answers];
    mutable[num] = e.target.value;
    setAnswers(mutable);
  };

  let removeChoice = (num) => {
    let mutable = [...answers];
    mutable.splice(num, 1);
    setAnswers(mutable);
  };

  let addChoice = () => {
    setAnswers([...answers, '']);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      my={3}
      minHeight="80vh"
    >
      <Container maxWidth="sm">
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Topic</InputLabel>
                <Select label="Topic" {...getFieldProps('topic')}>
                  <MenuItem value="javascript">JavaScript</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                  <MenuItem value="c-plus-plus">C++</MenuItem>
                  <MenuItem value="reactjs">Reactjs</MenuItem>
                  <MenuItem value="nodejs">Nodejs</MenuItem>
                </Select>
                <FormHelperText error={Boolean(touched.topic && errors.topic)}>
                  {touched.topic && errors.topic}
                </FormHelperText>
              </FormControl>
              <TextField
                fullWidth
                label="Question"
                {...getFieldProps('question')}
                error={Boolean(touched.question && errors.question)}
                helperText={touched.question && errors.question}
              />
              <TextField
                fullWidth
                label="Answer"
                {...getFieldProps('answer')}
                error={Boolean(touched.answer && errors.answer)}
                helperText={touched.answer && errors.answer}
              />

              <Button
                fullWidth
                size="large"
                variant="contained"
                disableElevation
                sx={{
                  mt: 4,
                  fontSize: { xs: '0.8rem', lg: '1rem' },
                  textTransform: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',
                }}
                onClick={addChoice}
              >
                Add Choice
              </Button>

              {answers.map((answer, index) => (
                <TextField
                  key={'Choice ' + (index + 1)}
                  fullWidth
                  label={'Choice ' + (index + 1)}
                  value={answer}
                  onChange={(e) => handleQuestion(e, index)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => removeChoice(index)}
                          edge="end"
                        >
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disableElevation
              sx={{
                mt: 4,
                fontSize: { xs: '0.8rem', lg: '1rem' },
                textTransform: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',
              }}
            >
              Save
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Container>
    </Box>
  );
};

export default QuizForm;
