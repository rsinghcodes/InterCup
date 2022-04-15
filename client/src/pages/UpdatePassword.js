import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';

import Notification from '../components/Notification';

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'success',
  });

  const UpdateSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please Re-Enter password'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: UpdateSchema,
    onSubmit: () => {
      console.log(values);
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Typography variant="h5" fontWeight="600" component="h5" my={2}>
        Update Password
      </Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
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
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
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
            <TextField
              fullWidth
              label="Confirm Password"
              {...getFieldProps('confirmPassword')}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
          </Stack>
          <Box display="flex" justifyContent="flex-end" my={3}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              disableRipple
              type="submit"
              sx={{
                px: { xs: 3, lg: 6 },
                py: { xs: 1, lg: 1 },
                fontSize: { xs: '0.8rem', lg: '1rem' },
                textTransform: 'none',
                borderRadius: '5px',
              }}
            >
              Update Password
            </Button>
          </Box>
        </Form>
      </FormikProvider>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default UpdatePassword;
