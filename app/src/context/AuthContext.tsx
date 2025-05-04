import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserMe, useUserMeQuery} from 'api/users/useUserMeQuery';
import { getUsersDetail } from 'api/users/useUsersDetailQuery';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {TUser} from 'types/users';

type TAuthContext = {
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  user: TUser | null;
  refreshUserData: () => Promise<void>;
  signIn: (accessToken: string, refreshToken: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUserData = async (ovverideToken?: string | null) => {
    const token = ovverideToken || accessToken;

    console.log('token 111', token);
    if (!token) {
      return;
    }

    console.log('token token', token);
    const me = await getUsersDetail(1);
    console.log('me me', me.data);
    setUserData(me.data);
    // fetch ke /users/me
  };

  const loadFromStorage = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const refresh_token = await AsyncStorage.getItem('refreshToken');
      if (access_token) {
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        refreshUserData(access_token);
      }
    } catch (error) {
      console.log('error loadFromStorage', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFromStorage();
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem('accessToken');
    setAccessToken(null);
    setRefreshToken(null);
    setUserData(null);
  };

  const signIn = async (access_token: string, refresh_token: string) => {
    await AsyncStorage.setItem('accessToken', access_token);
    await AsyncStorage.setItem('refreshToken', refresh_token);
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    await refreshUserData(access_token);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isLoading,
        user: userData,
        signOut,
        signIn,
        refreshUserData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): TAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
