import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Stack, TextField, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
// Redux
import { useDispatch } from 'react-redux';
import { getProfile } from '../redux/reducers/userSlice';

const Profile = () => {
  const dispatch = useDispatch();

  const UpdateUserSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Full name is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
    },
    validationSchema: UpdateUserSchema,
    onSubmit: () => {
      console.log(values);
    },
  });

  useEffect(() => {
    dispatch(getProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Typography variant="h5" fontWeight="600" component="h5" my={2}>
        Profile
      </Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="fullname"
              label="Full Name"
              {...getFieldProps('fullname')}
              error={Boolean(touched.fullname && errors.fullname)}
              helperText={touched.fullname && errors.fullname}
            />
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
};

export default Profile;
