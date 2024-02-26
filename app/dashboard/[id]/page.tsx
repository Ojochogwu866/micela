'use client'

import { SendMoney } from '../send';
import { RecieveMoney } from '../recieve';
import { RecentTransactions } from '../recent';
import { useAppContext } from '@/context';

export default function Dashboard() {
    const { userData } = useAppContext();

    return (
        <>
            <div className='w-full h-[200px] rounded-md flex flex-col items-start justify-center shadow-md p-4'>
                {userData && userData.wallets && (
                    <>
                        <h1 className='text-xl font-medium text-gray-900'>Balance:</h1>
                        <span className='font-bold text-5xl mt-4'>
                            ${userData.wallets[0].balance}
                        </span>
                    </>
                )}
            </div>
            <SendMoney />
            <div className='flex flex-col md:flex-row gap-2 justify-center items-center'>
                <RecieveMoney />
                <RecentTransactions />
            </div>
        </>
    );
}


