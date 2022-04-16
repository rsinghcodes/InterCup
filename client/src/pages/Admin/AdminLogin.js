import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, loginAdmin } from '../../redux/reducers/authSlice';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isAuthenticated, error } =
    useSelector(authSelector);
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      dispatch(loginAdmin(values));
    },
  });

  const { errors, setErrors, touched, values, handleSubmit, getFieldProps } =
    formik;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (isError) {
      setErrors(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, error]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      my={3}
      minHeight="80vh"
    >
      <Container maxWidth="sm">
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Sign in to your account
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Admin Login</Typography>
        </Stack>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Email address"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

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
              Login
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Container>
    </Box>
  );
};

export default AdminLogin;
