import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { NextPage } from 'next';
import { LockClosedIcon } from '@heroicons/react/solid';

import TextInput from '@components/molecules/TextInput/TextInput';
import Checkbox from '@components/molecules/CheckBox/CheckBox';
import Button from '@components/atoms/Button/Button';

const Login: NextPage = () => {
  const { register } =
    useForm<{ email: string; password: string; remember: boolean }>();

  return (
    <div className="flex flex-col justify-center h-screen py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md"></div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <h2 className="mb-8 text-3xl font-extrabold text-center text-gray-900 font-nunito">
            Sign in to your account
          </h2>
          <form className="space-y-6">
            {/* Email */}
            <TextInput fullWidth label="Email Address" {...register('email')} />

            {/* Password */}
            <TextInput
              fullWidth
              label="Password"
              type="password"
              {...register('password')}
            />

            <div className="flex items-center justify-between">
              {/* Remember me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  className="w-4 h-4 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
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
              <Button className="w-full text-sm btn btn-primary" type="submit">
                <LockClosedIcon className="w-5 h-5 mr-32 text-indigo-800" />
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
