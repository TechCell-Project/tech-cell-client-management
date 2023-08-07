import { Badge, BadgeProps, styled } from '@mui/material';

export const BadgeIconButton = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -4,
    top: -5,
  },
}));
