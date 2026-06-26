interface UserData {
  email: null | string;
  uid: string;
  displayName: null | string;
}

interface UserState {
  user: UserData | null;
  isAuth: boolean;
}

export const selectAuth = ({ user }: { user: UserState }) => user.isAuth;

export const selectUser = ({ user }: { user: UserState }) => user.user;
