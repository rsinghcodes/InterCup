import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Redux
import { questionSelector } from '../../redux/reducers/questionSlice';
import { useSelector } from 'react-redux';

export default function QuizPopUpForm({ addOrEditQuestion, recordForEdit }) {
  const { isLoading } = useSelector(questionSelector);

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
      options: [],
    },
    validationSchema: QuestionSchema,
    onSubmit: () => {
      addOrEditQuestion(values, resetForm);
    },
  });

  const {
    errors,
    touched,
    values,
    resetForm,
    setValues,
    handleSubmit,
    getFieldProps,
  } = formik;

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({ ...recordForEdit });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordForEdit]);

  return (
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
          {values.options?.map((option, index) => (
            <TextField
              key={'Choice ' + (index + 1)}
              fullWidth
              label={'Choice ' + (index + 1)}
              {...getFieldProps(`options[${index}]`)}
            />
          ))}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disableElevation
          loading={isLoading}
          sx={{
            mt: 4,
            fontSize: { xs: '0.8rem', lg: '1rem' },
            textTransform: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',
          }}
        >
          Save Quiz
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
