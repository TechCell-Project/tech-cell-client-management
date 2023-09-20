export enum Roles {
  User = "User",
  Admin = "Admin",
  Mod = "Mod",
  SuperAdmin = "SuperAdmin",
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
}

export enum RootRoutes {
  DASHBOARD_ROUTE = "/dashboard",
  ACCOUNT_ROUTE = "/dashboard/account",
  PRODUCT_ROUTE = "/dashboard/product",
  PRODUCT_CREATE_ROUTE = "/dashboard/product/create",
  PRODUCT_EDIT_ROUTE = "/dashboard/product/edit",
  CATEGORY_ROUTE = "/dashboard/product/category",
  ATTRIBUTE_ROUTE = "/dashboard/product/attribute",
  ORDER_ROUTE = "/dashboard/order",
}