import * as React from 'react'
import { Button } from '@/components/UI/button'

export const RecieveMoney = () => {
    return(
        <div className='flex md:w-3/5 w-full gap-8 h-[300px] bg-slate-200
         border-[1px] border-[#680b783f] justify-between rounded-md items-center p-5 mt-10'>
            <div className='space-y-6'>
                <h1 className=' text-5xl font-normal'>Recieve Money</h1>
                <p className=''>Recieve Money from anywhere around the world in easy steps</p>
                <div className=' mt-4'>
                    <Button>Get Funded</Button>
                </div>
            </div>
        </div>
    )
}