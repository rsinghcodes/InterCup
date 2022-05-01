import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';

export default function UserForm({ addOrEditUser, recordForEdit }) {
  const [showPassword, setShowPassword] = useState(false);

  const UserRegisterSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Full name is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      profession: '',
      college: '',
    },
    validationSchema: UserRegisterSchema,
    onSubmit: () => {
      addOrEditUser(values, resetForm);
    },
  });

  const {
    errors,
    touched,
    values,
    setValues,
    resetForm,
    handleSubmit,
    isSubmitting,
    getFieldProps,
  } = formik;

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordForEdit]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Full name"
                {...getFieldProps('fullname')}
                error={Boolean(touched.fullname && errors.fullname)}
                helperText={touched.fullname && errors.fullname}
              />
              <TextField
                fullWidth
                type="email"
                label="Email address"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              {values._id == null && (
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          <Box
                            component={Icon}
                            icon={
                              showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              )}
              <TextField
                fullWidth
                label="Profession"
                {...getFieldProps('profession')}
                error={Boolean(touched.profession && errors.profession)}
                helperText={touched.profession && errors.profession}
              />
              <TextField
                fullWidth
                label="College"
                {...getFieldProps('college')}
                error={Boolean(touched.college && errors.college)}
                helperText={touched.college && errors.college}
              />

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disableElevation
                sx={{
                  fontSize: { xs: '0.8rem', lg: '1rem' },
                  textTransform: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',
                }}
              >
                Save User
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
