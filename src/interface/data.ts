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
  requiresAttribute?: string;
}

export interface IColumnProduct {
  id?: string | null;
  no: number;
  name?: string | null;
  category?: string | null;
  status: string;
  generalAttributes?: number;
  variations: number;
}

export interface IColumnOrder {
  id?: string | null;
  no: number;
  trackingCode: string | null;
}