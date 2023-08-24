import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface INavProps {
  name?: string;
  to?: URL | string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  isAction?: boolean | string;
  listChildren?: INavChildProps[];
}

export interface INavChildProps {
  name?: string;
  to: URL | string;
  isAction?: boolean | string;
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
