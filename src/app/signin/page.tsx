/* eslint-disable @next/next/no-async-client-component */
'use client';

import { signIn } from 'next-auth/react';

export default async function Page() {
  return (
    <div className='grid min-h-screen w-full place-items-center'>
      <div className='flex w-full max-w-md flex-col gap-8 rounded-md border border-zinc-200 p-6 shadow-sm'>
        <p className='text-2xl font-medium'>Sign in</p>
        <button
          // eslint-disable-next-line prettier/prettier
          onClick={() => signIn('discord', { callbackUrl: "/dashboard" })}
          className=' rounded-lg bg-violet-300 px-4 py-2 font-medium text-white'
        >
          sign in with discord
        </button>
      </div>
    </div>
  );
}
