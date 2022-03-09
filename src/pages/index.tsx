import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { NextPage } from 'next';
import { LockClosedIcon } from '@heroicons/react/solid';

import TextInput from '@components/molecules/TextInput/TextInput';
import CheckBox from '@components/molecules/CheckBox/CheckBox';
import Button from '@components/atoms/Button/Button';
import Layout from '@components/templates/Layout/Layout';

const Login: NextPage = () => {
  const { register, handleSubmit } =
    useForm<{ email: string; password: string; remember: boolean }>();

  const onSubmit: SubmitHandler<{
    email: string;
    password: string;
    remember: boolean;
  }> = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md lg:min-w-[600px]">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <h2 className="mb-8 text-3xl font-extrabold text-center text-gray-900 font-nunito">
              Sign in to your account
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <TextInput
                fullWidth
                label="Email Address"
                {...register('email')}
              />

              {/* Password */}
              <TextInput
                fullWidth
                label="Password"
                type="password"
                {...register('password')}
              />

              <div className="flex items-center justify-between">
                {/* Remember me */}
                <CheckBox label="Remember me" {...register('remember')} />

                {/* Forget Password */}
                <div className="text-sm">
                  <Link href="/forgot-password">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  className="flex items-center justify-center w-full space-x-2 text-sm btn btn-primary"
                  type="submit"
                >
                  <LockClosedIcon className="w-5 h-5 text-indigo-800" />
                  <span>Sign in</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
