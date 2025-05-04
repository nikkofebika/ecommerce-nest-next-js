import {useQuery} from '@tanstack/react-query';
import api from 'libs/axios';
import {TResponse} from 'types/global';
import {TUser} from 'types/users';

export function useUsersDetailQuery(id: number) {
  return useQuery({
    queryKey: ['users/me'],
    queryFn: () => getUsersDetail(id),
  });
}

export async function getUsersDetail(id: number) {
  // console.log('getUsersDetail', token);
  let config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJmZWJpa2Eubmlra29AZ21haWwuY29tIiwidHlwZSI6ImFkbWluIiwiY3JlYXRlZF9hdCI6IjIwMjUtMDQtMTdUMTU6MTI6MDEuNjgxWiIsImNyZWF0ZWRfYnkiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDI1LTA0LTE3VDE1OjEyOjAxLjY4MVoiLCJ1cGRhdGVkX2J5IjpudWxsLCJkZWxldGVkX2F0IjpudWxsLCJkZWxldGVkX2J5IjpudWxsLCJpYXQiOjE3NDQ5OTM4NTIsImV4cCI6MTc0NTA4MDI1Mn0.Bh1DO_jwvJTmPMMnEZVIX_LT3mh4mjDbkLwQKi6G9s4`,
    },
  };
    console.log('getUsersDetail config', config);

  const {data} = await api.get<TResponse<TUser>>(`/users/${id}`, config);
  console.log('getUsersDetail data', data);
  return data;
}
