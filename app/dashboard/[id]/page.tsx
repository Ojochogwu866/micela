'use client'
import { SendMoney } from '../send';
import { RecieveMoney } from '../recieve';
import { RecentTransactions } from '../recent';
import { useAppContext } from '@/context';

export default function Dashboard() {
    const { userData } = useAppContext();

    let cumulativeBalance = 0;
    if (userData && userData.wallets) {
        userData.wallets.forEach(wallet => {
            if (wallet.transactions) {
                cumulativeBalance += wallet.transactions.reduce((total, transaction) => {
                    return total + transaction.amount;
                }, 0);
            }
        });
    }

    return (
        <>
            <div className='w-full h-[200px] rounded-md flex flex-col items-start justify-center shadow-md p-4'>
                
                <div className='flex justify-around gap-10 items-center md:flex-row flex-col'>
                <span className='font-bold text-5xl mt-4'>
                    <h1 className='text-xl mb-4 font-medium text-gray-900'>Main Wallet:</h1>
                    ${cumulativeBalance.toFixed(2)}
                </span>
                 <span className='font-bold text-5xl mt-4'>
                    <h1 className='text-xl mb-4 font-medium text-gray-900'>Flexible Balance:</h1>
                    ${userData && userData.wallets[0].balance}
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

