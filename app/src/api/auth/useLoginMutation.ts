import {useMutation} from '@tanstack/react-query';
import api from 'libs/axios';
import {TAuthToken} from 'types/auth';
import {TResponse} from 'types/global';
import {TLoginSchema} from 'validation/auth/login-schema';

const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (body: TLoginSchema) => {
      const {data} = await api.post<TResponse<TAuthToken>>('/auth/token', body);
      return data;
    },
    // onError: (error: any) => {
    //   console.log(
    //     '❌ ERROR LOGIN:',
    //     error?.response ?? error?.message ?? error,
    //   );
    // },
    // onSuccess: data => {
    //   console.log('✅ LOGIN SUCCESS:', data);
    // },
  });
};

export default useLoginMutation;
