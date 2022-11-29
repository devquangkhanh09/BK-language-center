// @mui
import { styled } from '@mui/material/styles';
import { ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 10,
  height: 48,
  position: 'relative',
  textTransform: 'none',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
})); 