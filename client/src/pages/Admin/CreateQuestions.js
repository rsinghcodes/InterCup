import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  createQuestion,
  questionSelector,
} from '../../redux/reducers/questionSlice';
import Notification from '../../components/Notification';

const CreateQuestions = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } =
    useSelector(questionSelector);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'success',
  });

  const QuestionSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
  });

  const formik = useFormik({
    initialValues: {
      topic: '',
      question: '',
      answer: '',
    },
    validationSchema: QuestionSchema,
    onSubmit: () => {
      dispatch(createQuestion(values));
    },
  });

  const { errors, setErrors, touched, values, handleSubmit, getFieldProps } =
    formik;

  useEffect(() => {
    if (isSuccess) {
      setNotify({
        isOpen: true,
        message: 'Question added successfully',
        type: 'success',
      });
    }
    if (isError) {
      setErrors(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return (
    <>
      <Notification notify={notify} setNotify={setNotify} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={3}
        minHeight="80vh"
      >
        <Container maxWidth="md">
          <Stack sx={{ mb: 3 }}>
            <Typography variant="h5" fontWeight="600" component="h5">
              Add Question
            </Typography>
          </Stack>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <FormControl fullWidth>
                  <InputLabel>Topic</InputLabel>
                  <Select label="Topic" {...getFieldProps('topic')}>
                    <MenuItem value="JavaScript">JavaScript</MenuItem>
                    <MenuItem value="Python">Python</MenuItem>
                    <MenuItem value="Java">Java</MenuItem>
                    <MenuItem value="C++">C++</MenuItem>
                    <MenuItem value="Reactjs">Reactjs</MenuItem>
                    <MenuItem value="Nodejs">Nodejs</MenuItem>
                  </Select>
                  <FormHelperText
                    error={Boolean(touched.topic && errors.topic)}
                  >
                    {touched.topic && errors.topic}
                  </FormHelperText>
                </FormControl>
                <TextField
                  fullWidth
                  type="email"
                  label="Question"
                  {...getFieldProps('question')}
                  error={Boolean(touched.question && errors.question)}
                  helperText={touched.question && errors.question}
                />
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  label="Answer"
                  multiline
                  rows={5}
                  {...getFieldProps('answer')}
                  error={Boolean(touched.password && errors.answer)}
                  helperText={touched.answer && errors.answer}
                />
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disableElevation
                loading={isLoading}
                sx={{ mt: 4 }}
              >
                Save
              </LoadingButton>
            </Form>
          </FormikProvider>
        </Container>
      </Box>
    </>
  );
};

export default CreateQuestions;
