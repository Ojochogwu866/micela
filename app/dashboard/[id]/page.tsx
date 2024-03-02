'use client'

import { SendMoney } from '../send';
import { RecieveMoney } from '../recieve';
import { RecentTransactions } from '../recent';
import { useAppContext } from '@/context';

export default function Dashboard() {
    const { userData } = useAppContext();

    let flexibleBalance = 0;
    if (userData && userData.wallets) {
        const chiWallet = userData.wallets.find(wallet => wallet.type === 'chi');
        if (chiWallet && chiWallet.transactions && chiWallet.transactions.length > 0) {
            const lastTransaction = chiWallet.transactions[chiWallet.transactions.length - 1];
            flexibleBalance = lastTransaction.newBalance;
        }
    }

    return (
        <>
            <div className='w-full h-[400px] md:h-[200px] rounded-md flex flex-col items-start justify-center shadow-md p-4'>
                
                <div className='flex justify-around gap-10 items-center md:flex-row flex-col'>
                    <span className='font-bold text-5xl mt-4'>
                        <h1 className='text-xl mb-4 font-medium text-gray-900'>Flexible Balance:</h1>
                        ${flexibleBalance.toFixed(2)}
                    </span>
                </div>
            </div>
            <SendMoney />
            <div className='flex flex-col md:flex-row gap-2 justify-center items-center'>
                <RecieveMoney />
                <RecentTransactions />
            </div>
        </>
    );
}
