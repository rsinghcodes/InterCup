// material
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
// component
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500]} !important`,
  },
}));

// ----------------------------------------------------------------------

export default function ListToolbar({ filterName, onFilterName, placeholder }) {
  return (
    <RootStyle>
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: 'text.disabled', width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />
      <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon="ic:round-filter-list" />
        </IconButton>
      </Tooltip>
    </RootStyle>
  );
}
