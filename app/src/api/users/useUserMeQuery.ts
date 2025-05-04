import {useQuery} from '@tanstack/react-query';
import api from 'libs/axios';
import {TResponse} from 'types/global';
import {TUser} from 'types/users';

export function useUserMeQuery() {
  return useQuery({
    queryKey: ['users/me'],
    queryFn: getUserMe,
  });
}

export async function getUserMe(token?: string) {
  console.log('getUserMe', token);
  let config = {};

  if (token) {
    config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  console.log('getUserMe config', config);
  
  const {data} = await api.get<TResponse<TUser>>('/users/me', config);
  console.log('getUserMe data', data);
  return data;
}
