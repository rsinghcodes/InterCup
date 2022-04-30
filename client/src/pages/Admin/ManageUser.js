import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  adminSelector,
  changeUserAccountAccess,
  createUser,
  getUsersProfile,
} from '../../redux/reducers/adminSlice';
import {
  deleteUserProfile,
  updateUserProfile,
} from '../../redux/reducers/userSlice';
// components
import {
  ListHead,
  ListToolbar,
  TableMoreMenu,
  UserForm,
} from '../../components/@adminDashboard';
import Popup from '../../components/Popup';
import ConfirmDialog from '../../components/ConfirmDialog';
import Notification from '../../components/Notification';
import Iconify from '../../components/Iconify';
import Label from '../../components/Label';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fullname', label: 'Full Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'profession', label: 'Profession', alignRight: false },
  { id: 'global_rank', label: 'Global Rank', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'isAccess', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.fullname.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ManageUser() {
  const dispatch = useDispatch();

  const { users } = useSelector(adminSelector);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'success',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  useEffect(() => {
    dispatch(getUsersProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
    filterName
  );

  const addOrEditUser = (user, resetForm) => {
    if (user._id == null) {
      dispatch(createUser(user));
      setNotify({
        isOpen: true,
        message: 'Data Added Successfully',
        type: 'success',
      });
    } else {
      dispatch(updateUserProfile(user));
      setNotify({
        isOpen: true,
        message: 'Data Updated Successfully',
        type: 'success',
      });
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteUserProfile(id));
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    });
  };

  return (
    <>
      <Box my={2}>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" fontWeight="600" component="h5" my={2}>
              Users
            </Typography>
            <Button
              variant="contained"
              disableElevation
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
              sx={{
                px: 3,
                py: 1,
                fontSize: { xs: '0.8rem', lg: '1rem' },
                textTransform: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 14px 0 rgb(0 118 255 / 39%)',
              }}
            >
              New User
            </Button>
          </Stack>

          <Card>
            <ListToolbar
              placeholder="Search by Name..."
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        fullname,
                        email,
                        profession,
                        global_rank,
                        isVerified,
                        isAccess,
                      } = row;

                      return (
                        <TableRow hover key={_id} tabIndex={-1}>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle2" noWrap>
                              {fullname}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{profession}</TableCell>
                          <TableCell align="left">{global_rank}</TableCell>
                          <TableCell align="left">
                            {isVerified ? 'Yes' : 'No'}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              onClick={() =>
                                dispatch(changeUserAccountAccess(_id))
                              }
                              color={
                                (isAccess === false && 'error') || 'success'
                              }
                            >
                              {isAccess ? 'Active' : 'Banned'}
                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            <TableMoreMenu
                              openInPopup={openInPopup}
                              row={row}
                              onDelete={onDelete}
                              setConfirmDialog={setConfirmDialog}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Box>
      <Popup
        title="Add New User"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserForm recordForEdit={recordForEdit} addOrEditUser={addOrEditUser} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
