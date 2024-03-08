'use client';

import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  styles?: React.CSSProperties;
  isBadge?: boolean;
  badgeInvisible?: boolean;
  badgeContent?: number;
  badgeVariant?: 'standard' | 'dot';
  tooltip?: string;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'reset' | 'submit';
  colorIcon?:
    | 'inherit'
    | 'default'
    | 'secondary'
    | 'primary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

export const IconBtnCustom = ({
  icon,
  onClick,
  styles,
  isBadge = false,
  badgeInvisible = false,
  badgeContent,
  badgeVariant = 'standard',
  tooltip = undefined,
  size = 'medium',
  type = 'button',
  colorIcon = 'default',
}: Props) => {
  const renderButton = () => {
    return (
      <IconButton
        onClick={onClick}
        sx={{
          bgcolor: 'rgba(0, 0, 0, 0.04)',
          p: '8px',
          width: 'max-content',
          ...styles,
        }}
        size={size}
        type={type}
        color={colorIcon}
      >
        {isBadge ? (
          <Badge
            badgeContent={badgeContent}
            color="secondary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            variant={badgeVariant}
            invisible={badgeInvisible}
            sx={{
              '& .MuiBadge-badge': {
                borderRadius: badgeVariant === 'standard' ? '.5rem' : '50%',
                top: '-3px',
                right: '-3px',
              },
            }}
          >
            {icon}
          </Badge>
        ) : (
          <>{icon}</>
        )}
      </IconButton>
    );
  };

  return tooltip ? (
    <Tooltip title={tooltip} placement="bottom">
      {renderButton()}
    </Tooltip>
  ) : (
    <>{renderButton()}</>
  );
};
