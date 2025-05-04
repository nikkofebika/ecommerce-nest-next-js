export type TUser = {
  id: number;
  name: string;
//   phone: string;
  email: string;
  type: 'admin' | 'user';
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

// export type TUserType = "admin" | "user";
