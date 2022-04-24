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
  InputAdornment,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';

const QuizForm = () => {
  const dispatch = useDispatch();
  let [options, setOptions] = useState([]);

  const addChoice = () => {
    setOptions([...options, '']);
  };

  const removeChoice = (num) => {
    let mutable = [...options];
    mutable.splice(num, 1);
    setOptions(mutable);
  };

  const QuizSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
    options: Yup.mixed()
      .when('isArray', {
        is: Array.isArray,
        then: Yup.array().of(Yup.string()),
        otherwise: Yup.string(),
      })
      .required('Option is required'),
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
                  <MenuItem value="JavaScript">JavaScript</MenuItem>
                  <MenuItem value="Python">Python</MenuItem>
                  <MenuItem value="Java">Java</MenuItem>
                  <MenuItem value="C++">C++</MenuItem>
                  <MenuItem value="Reactjs">Reactjs</MenuItem>
                  <MenuItem value="Nodejs">Nodejs</MenuItem>
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
              {options.map((option, index) => (
                <TextField
                  key={'Choice ' + (index + 1)}
                  fullWidth
                  label={'Choice ' + (index + 1)}
                  {...getFieldProps(`options[${index}]`)}
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
                  error={Boolean(touched.options && errors.options)}
                  helperText={touched.options && errors.options}
                />
              ))}
            </Stack>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              disableRipple
              sx={{
                px: 6,
                py: 1,
                mt: 3,
                fontSize: { xs: '0.8rem', lg: '1rem' },
                textTransform: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',
              }}
              onClick={addChoice}
            >
              Add Choice
            </Button>

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
