import React, { useMemo, useState } from 'react';
import { DialogAction } from '@interface/common';
import { ShowDialog } from '@components/Common';
import { ProfileAddress } from './ProfileAddress';
import { ProfileInfo } from './ProfileInfo';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';

export const Profile = ({ isOpen, handleClose }: DialogAction) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const theme = useTheme();

  const tabs = useMemo(
    () => [
      { name: 'Thông tin', component: <ProfileInfo handleClose={handleClose} /> },
      { name: 'Địa chỉ', component: <ProfileAddress handleClose={handleClose} /> },
    ],
    [handleClose],
  );

  return (
    <ShowDialog
      dialogTitle="Hồ sơ"
      isOpen={isOpen}
      handleClose={handleClose}
      dialogStyle={{ minWidth: { lg: '65%', xs: '90%' } }}
    >
      <div style={{ width: '100%' }}>
        <Tabs
          value={tabIndex}
          onChange={(_: React.SyntheticEvent, index: number) => setTabIndex(index)}
          aria-label="tabs"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: theme.color.red,
            },
            mb: 3,
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.name}
              label={tab.name}
              onClick={() => setTabIndex(index)}
              sx={{
                textTransform: 'capitalize',
                '&.Mui-selected': {
                  fontWeight: 700,
                  color: theme.color.red,
                },
              }}
            />
          ))}
        </Tabs>

        {tabs[tabIndex].component}
      </div>
    </ShowDialog>
  );
};
