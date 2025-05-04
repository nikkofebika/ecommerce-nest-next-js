import Icon2 from '@assets/icon-2.svg';
import GithubIcon from '@assets/icon-github.svg';
import GoogleIcon from '@assets/icon-google.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import useLoginMutation from 'api/auth/useLoginMutation';
import Checkbox from 'components/Checkbox';
import CustomButton from 'components/CustomButton';
import Gap from 'components/Gap';
import Link from 'components/Link';
import PasswordInputRHF from 'components/PasswordInputRHF';
import TextInputRHF from 'components/TextInputRHF';
import { useAuth } from 'context/AuthContext';
import { useTheme } from 'context/ThemeContext';
import { FC, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { loginSchema, TLoginSchema } from '../../validation/auth/login-schema';

// type Props = NativeStackScreenProps<
//   {
//     Onboarding: undefined;
//     Login: undefined;
//   },
//   'Login'
// >;

type Props = {};

const LoginPage: FC<Props> = () => {
  const {signIn} = useAuth();
  const {theme} = useTheme();
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {mutateAsync} = useLoginMutation();

  const handleSubmit = async (data: TLoginSchema) => {
    try {
      const {
        data: {access_token, refresh_token},
      } = await mutateAsync(data);

      await signIn(access_token, refresh_token);
    } catch (error) {
      console.log('error auth', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.topSection}>
        <Image
          style={styles.image}
          source={require('@assets/login-image.png')}
        />
        <View style={styles.topContent}>
          <Text style={[styles.welcomeText, {color: theme.secondary}]}>
            Welcome to
          </Text>
          <Icon2 />
        </View>
      </View>
      <View style={styles.bottomSection}>
        <FormProvider {...form}>
          <TextInputRHF name="email" icon="mail" />
          <Gap height={12} />
          <PasswordInputRHF />
          <Gap height={12} />
          <View style={styles.rememberMe}>
            <Checkbox label="Remember me" />

            <Link label="forgot password?" style={styles.registerLink} />
          </View>
          <Gap height={25} />
          <CustomButton
            title="Login"
            variant="primary"
            onPress={form.handleSubmit(handleSubmit)}
          />
        </FormProvider>
        <View style={styles.anotherLoginContainer}>
          <View
            style={[styles.anotherLoginLine, {backgroundColor: theme.border}]}
          />
          <Text style={[styles.anotherLoginText, {color: theme.secondary}]}>
            Or login with
          </Text>
          <View
            style={[styles.anotherLoginLine, {backgroundColor: theme.border}]}
          />
        </View>
        <View style={styles.socmedContainer}>
          <SocmedLoginButton>
            <GoogleIcon />
          </SocmedLoginButton>
          <Gap width={20} />
          <SocmedLoginButton>
            <GithubIcon />
          </SocmedLoginButton>
        </View>
        <View style={styles.alreadyHaveAccountWrapper}>
          <Text style={styles.alreadyHaveAccountText}>
            Already have an account?
          </Text>
          <Link label="register" style={styles.registerLink} />
        </View>
      </View>
    </View>
  );
};

type SocmedLoginButtonProps = {
  children: ReactNode;
};
const SocmedLoginButton: FC<SocmedLoginButtonProps> = ({children}) => {
  return (
    <TouchableOpacity style={styles.socmedIconWrapper}>
      {children}
    </TouchableOpacity>
  );
};

const {height, width} = Dimensions.get('window');
const topSectionHeight = height * 0.37;
const bottomSectionPaddingVertical = (height - topSectionHeight) * 0.05;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    position: 'relative',
    height: topSectionHeight,
    backgroundColor: '#F4F8FF',
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: width * 0.042,
    paddingVertical: bottomSectionPaddingVertical,
    backgroundColor: '#FFF',
  },
  topContent: {
    position: 'absolute',
    bottom: height * 0.041,
    left: width * 0.042,
  },
  welcomeText: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  image: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 180,
    width: 217,
  },
  rememberMe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  anotherLoginContainer: {
    marginVertical: height * 0.043,
    flexDirection: 'row',
    alignItems: 'center',
  },
  anotherLoginLine: {
    height: 1,
    flex: 1,
  },
  anotherLoginText: {
    marginHorizontal: 10,
  },
  socmedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socmedIconWrapper: {
    backgroundColor: '#F4F8FF',
    borderRadius: 50,
    padding: 15,
  },
  alreadyHaveAccountWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  alreadyHaveAccountText: {
    marginRight: 5,
  },
  registerLink: {fontWeight: '600', textDecorationLine: 'underline'},
});

export default LoginPage;
