"use client";
import React from "react";
import { useLogin } from "@/hooks/dog.hooks";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { login, isLoginSuccessful } = useLogin();

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  }

  React.useEffect(() => {
    if (isLoginSuccessful) {
      router.push('/home');
    }
  }, [isLoginSuccessful, router]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
              <input onChange={handleInputChange} type="text" value={formData.name} name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
              <input onChange={handleInputChange} type="email" value={formData.email} name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </label>
          </div>

          <div>
            <button type="submit" className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
        </div>
      </form>

    </div>
  );
}

export default LoginForm;