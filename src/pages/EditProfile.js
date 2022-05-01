import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, userSelector } from '../redux/reducers/userSlice';
import { useFormik, Form, FormikProvider } from 'formik';
// components
import Iconify from '../components/Iconify';
import Spinner from '../components/Spinner';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(userSelector);

  const EditProfileSchema = Yup.object().shape({
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
      profession: '',
      college: '',
    },
    validationSchema: EditProfileSchema,
    onSubmit: () => {
      dispatch(updateUserProfile(values));
    },
  });

  const { errors, touched, values, setValues, handleSubmit, getFieldProps } =
    formik;

  useEffect(() => {
    if (user != null) {
      setValues({ ...user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Typography variant="h5" fontWeight="600" component="h5" my={2}>
        Edit Profile
      </Typography>
      {isLoading ? (
        <Spinner />
      ) : (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              my={2}
            >
              <Card variant="outlined">
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" component="p">
                        Full Name
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        hiddenLabel
                        {...getFieldProps('fullname')}
                        size="small"
                        error={Boolean(touched.fullname && errors.fullname)}
                        helperText={touched.fullname && errors.fullname}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" component="p">
                        Email
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        hiddenLabel
                        {...getFieldProps('email')}
                        size="small"
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" component="p">
                        Profession
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        hiddenLabel
                        size="small"
                        {...getFieldProps('profession')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" component="p">
                        College
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        hiddenLabel
                        size="small"
                        {...getFieldProps('college')}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
            <Box display="flex" justifyContent="flex-end" my={2}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                disableRipple
                startIcon={
                  <Iconify icon="eva:save-fill" width={24} height={24} />
                }
                type="submit"
                sx={{
                  px: { xs: 3, lg: 6 },
                  py: { xs: 1, lg: 1 },
                  fontSize: { xs: '0.8rem', lg: '1rem' },
                  textTransform: 'none',
                  borderRadius: '5px',
                  boxShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',
                }}
              >
                Save
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      )}
    </>
  );
};

export default EditProfile;
