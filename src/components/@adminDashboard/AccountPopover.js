import { useRef, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, logout } from '../../redux/reducers/authSlice';
import { removeUser } from '../../redux/reducers/userSlice';
// components
import MenuPopover from '../MenuPopover';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.fullname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            dispatch(logout());
            dispatch(removeUser());
            handleClose();
          }}
          sx={{ m: 1 }}
        >
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
