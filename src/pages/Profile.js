import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfile,
  deleteUserProfile,
  userSelector,
} from '../redux/reducers/userSlice';
// components
import Iconify from '../components/Iconify';
import ConfirmDialog from '../components/ConfirmDialog';
import Notification from '../components/Notification';
import Spinner from '../components/Spinner';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(userSelector);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    dispatch(getProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h5" fontWeight="600" component="h5" my={2}>
        Profile
      </Typography>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" component="p">
                    Full Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" component="p">
                    {user.fullname}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" component="p">
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" component="p">
                    {user.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" component="p">
                    Quiz Highest Score
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" component="p">
                    {user.highest_score}
                  </Typography>
                </Grid>
                {user.profession && (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" component="p">
                        Profession
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" component="p">
                        {user.profession}
                      </Typography>
                    </Grid>
                  </>
                )}
                {user.college && (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" component="p">
                        College
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" component="p">
                        {user.college}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
      <Divider my={2} />
      <Box display="flex" justifyContent="space-between" my={2}>
        <Button
          variant="contained"
          color="error"
          disableElevation
          disableRipple
          startIcon={
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          }
          sx={{
            px: { xs: 3, lg: 6 },
            py: { xs: 1, lg: 1 },
            fontSize: { xs: '0.8rem', lg: '1rem' },
            textTransform: 'none',
            borderRadius: '5px',
          }}
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: 'Delete Your Account',
              subTitle:
                'When you delete your account, your profile, global rank, score will be permanently removed and you wont be able to login again. You can also choose to take a break for sometime.',
              onConfirm: () => {
                dispatch(deleteUserProfile(user._id));
                setConfirmDialog({
                  ...confirmDialog,
                  isOpen: false,
                });
                setNotify({
                  isOpen: true,
                  message: 'Account Deleted Successfully',
                  type: 'error',
                });
              },
            });
          }}
        >
          Delete Account
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          disableRipple
          startIcon={<Iconify icon="eva:edit-fill" width={24} height={24} />}
          sx={{
            px: { xs: 3, lg: 6 },
            py: { xs: 1, lg: 1 },
            fontSize: { xs: '0.8rem', lg: '1rem' },
            textTransform: 'none',
            borderRadius: '5px',
            boxShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',
          }}
          component={Link}
          to="/user/edit-profile"
        >
          Edit Profile
        </Button>
      </Box>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Profile;
