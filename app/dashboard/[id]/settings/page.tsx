'use client'

import React, {useState} from 'react'
import { Input } from '@/components/UI/input'
import { Button } from '@/components/UI/button'


export default function Page() {
     const [githubUsername, setgithubUsername] = useState('');
  return (
    <div className= 'w-full md:w-1/2 flex flex-col justify-center items-start'>
      <h1 className='text-base font-bold'>
        Update Account Information
      </h1>
      <form className=" w-10/12 space-y-4 mt-6">
        <Input
            placeholder='enter email'
        />
        <Input
            placeholder='Password'
        />
        <Button className=' mt-5'>
            Update
        </Button>
      </form>
    </div>
  )
}
