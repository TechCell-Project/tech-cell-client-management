export interface IColumnAccount {
  id: string | undefined;
  no: any;
  name: string;
  role: string;
  email: string | undefined;
  status: string;
}

export interface IColumnAttribute {
  id?: string | null;
  no: number;
  name?: string | null;
  label?: string | null;
  description?: string | null;
}

export interface IColumnCategory {
  id?: string | null;
  no: number;
  name?: string | null;
  label?: string | null;
  description?: string | null;
  requiresAttribute?: Array<string>;
}