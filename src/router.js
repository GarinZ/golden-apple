import AccountContainer from '@/views/AccountContainer';
import LoginContainer from '@/views/containers/LoginContainer';
import RegisterContainer from '@/views/containers/RegisterContainer';
import ResetPasswordContainer from '@/views/containers/ResetPasswordContainer';
import RouterName from '@/common/constants/RouterName';
import AccountInfoContainer from '@/views/containers/AccountInfoContainer';
import EmailBindContainer from '@/views/containers/EmailBindContainer';

export default [
  {
    path: '/account',
    component: AccountContainer,
    children: [
      {
        name: RouterName.LOGIN,
        path: '',
        component: LoginContainer,
      },
      {
        name: RouterName.LOGIN,
        path: 'login',
        component: LoginContainer,
      },
      {
        name: RouterName.REGISTER,
        path: 'register',
        component: RegisterContainer,
      },
      {
        name: RouterName.BIND_EMAIL,
        path: 'bind/email',
        component: EmailBindContainer,
      },
      {
        name: RouterName.RESET_PASSWORD,
        path: 'reset/password',
        component: ResetPasswordContainer,
      },
      {
        name: RouterName.ACCOUNT_INFO,
        path: 'info',
        component: AccountInfoContainer,
      },
      {
        name: RouterName.ACCOUNT_INFO,
        path: 'info',
        component: AccountInfoContainer,
      },
      {
        path: '*',
        redirect: '/account/login',
      },
    ],
  },
  {
    path: '*',
    redirect: '/account/login',
  },
];
