import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface INavProps {
  name?: string;
  to?: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
}

export interface IListNavProps {
  list?: INavProps[];
  pathname?: string;
  subHeader?: string;
}

export interface IUserBox {
  name?: string | null;
  role?: string | null;
}
