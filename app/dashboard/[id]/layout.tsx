  'use client' 
import TopNav from "@/components/UI/dashboard/topbar/navbar"
import Sidebar from '@/components/UI/dashboard/sidebar/sidebar'
import { ContextWrapper } from '@/context'

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className=' flex relative'>
          <ContextWrapper>
              <div className='lg:flex-1 lg:flex h-screen  overflow-y-scroll  '>
                  <Sidebar/>
              </div>
              <div className='flex flex-col flex-[3] h-auto relative w-[70%] px-10 pb-5  '>
                  <TopNav/>
                {children}
              </div>
            </ContextWrapper>
        </div>
    )
}