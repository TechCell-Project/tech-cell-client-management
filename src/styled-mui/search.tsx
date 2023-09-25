import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '100rem',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  // [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  // },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    fontSize: '14px',
    padding: '10px 12px 10px 0',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
