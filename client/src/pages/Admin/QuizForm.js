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
  Button,
  Container,
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';

const QuizForm = () => {
  const dispatch = useDispatch();

  const QuizSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
    options: Yup.array().of(Yup.string()).required('Option is required'),
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
      console.log(values);
      resetForm();
    },
  });

  const { errors, touched, values, resetForm, handleSubmit, getFieldProps } =
    formik;

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
              <TextField fullWidth label="Choice 1" />
              <TextField fullWidth label="Choice 2" />
              <TextField fullWidth label="Choice 3" />
              <TextField fullWidth label="Choice 4" />
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
