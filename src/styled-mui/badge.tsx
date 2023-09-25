import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

export const BadgeIconButton = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -4,
    top: -5,
  },
}));
