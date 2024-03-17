export enum RootRoutes {
  LOGIN_ROUTES = '/',
  DASHBOARD_ROUTE = '/dashboard',
  ACCOUNT_ROUTE = '/dashboard/account',
  PRODUCT_ROUTE = '/dashboard/product',
  PRODUCT_CREATE_ROUTE = '/dashboard/product/create',
  PRODUCT_EDIT_ROUTE = '/dashboard/product/edit',
  CATEGORY_ROUTE = '/dashboard/product/category',
  ATTRIBUTE_ROUTE = '/dashboard/product/attribute',
  ORDER_ROUTE = '/dashboard/order',
}

export enum Roles {
  User = 'User',
  // Admin = 'Admin',
  // Mod = 'Mod',
  // SuperAdmin = 'SuperAdmin',
  Staff = 'Staff',
  Manager = 'Manager',
}

export enum AccountStatus {
  Unblocked = 'unblocked',
  Blocked = 'blocked',
}

export enum AccountStatusVi {
  Unblocked = 'Hoạt động',
  Blocked = 'Bị chặn',
}

export enum EmailStatus {
  Verified = 'verified',
  Unverified = 'unverified',
}

export enum ProductType {
  OnlyActive = 'only_active',
  OnlyDeleted = 'only_deleted',
  BothDeleteAndActive = 'both_deleted_and_active',
}

export enum ProductStatus {
  ComingSoon = 1,
  NewArrival = 2,
  Pre_order = 3,
  OnSales = 4,
  Hide = 5,
  NotSales = 6,
  LowStock = 7,
  TemporarilyOutOfStock = 8,
  Deleted = -1,
}

export enum PaymentMethod {
  COD = 'COD',
  VNPAY = 'VNPAY',
  ATM = 'ATM',
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  JCB = 'JCB',
}

export enum PaymentStatus {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  PROCESSING = 'processing',
  REFUNDED = 'refunded',
}

export enum PaymentOrder {
  SHIPPING = 'shipping',
  WAIT_FOR_PAYMENT = 'wait_for_payment',
}

export enum TimeSplit {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export enum OrderProcessStep {
  First_Pending = 1,
  Second_Processing = 2,
  Third_Shipping = 3,
  Four_Completed = 4,
  Five_Cancel = 5,
}

export enum OrderStatusStats {
  Pending = 'PENDING',
  Cancelled = 'CANCELLED',
  Processing = 'PROCESSING',
  Shipping = 'SHIPPING',
  Completed = 'COMPLETED',
  Refunded = 'REFUNDED',
}
