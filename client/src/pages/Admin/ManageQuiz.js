import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
// components
import {
  ListHead,
  ListToolbar,
  TableMoreMenu,
} from '../../components/@adminDashboard';
// Redux
import { useDispatch, useSelector } from 'react-redux';

import {
  createQuiz,
  deleteQuiz,
  fetchQuizzes,
  quizSelector,
  updateQuiz,
} from '../../redux/reducers/quizSlice';
import Popup from '../../components/Popup';
import ConfirmDialog from '../../components/ConfirmDialog';
import Notification from '../../components/Notification';
import Iconify from '../../components/Iconify';
import QuestionForm from '../../components/@adminDashboard/QuestionForm';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'topic', label: 'Topic Name', alignRight: false },
  { id: 'question', label: 'Question', alignRight: false },
  { id: 'answer', label: 'Answer', alignRight: false },
  { id: 'marks', label: 'Marks', alignRight: false },
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
      (_question) =>
        _question.question.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ManageQuiz() {
  const dispatch = useDispatch();

  const { quizzes } = useSelector(quizSelector);

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
    dispatch(fetchQuizzes());
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quizzes.length) : 0;

  const filteredUsers = applySortFilter(
    quizzes,
    getComparator(order, orderBy),
    filterName
  );

  const addOrEditQuestion = (quiz, resetForm) => {
    if (quiz._id == null) {
      dispatch(createQuiz(quiz));
      setNotify({
        isOpen: true,
        message: 'Question Added Successfully',
        type: 'success',
      });
    } else {
      dispatch(updateQuiz(quiz));
      setNotify({
        isOpen: true,
        message: 'Question Updated Successfully',
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
    dispatch(deleteQuiz(id));
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
              Quizzes
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
              component={RouterLink}
              to="/admin/quiz/new"
            >
              New Quiz
            </Button>
          </Stack>

          <Card>
            <ListToolbar
              filterName={filterName}
              onFilterName={handleFilterByName}
              placeholder="Search by question..."
            />

            <TableContainer>
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
                      const { _id, topic, question, answer, marks } = row;

                      return (
                        <TableRow hover key={_id} tabIndex={-1}>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle2" noWrap>
                              {topic}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{question}</TableCell>
                          <TableCell align="left">{answer}</TableCell>
                          <TableCell align="left">{marks}</TableCell>

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
              count={quizzes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Box>
      <Popup
        title="Add New Quiz"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <QuestionForm
          recordForEdit={recordForEdit}
          addOrEditQuestion={addOrEditQuestion}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
