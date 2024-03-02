import React from 'react';
import { useAppContext } from '@/context';

export const RecentTransactions = () => {
    const { userData } = useAppContext();

    return (
        <div className='w-full md:w-2/5 h-[300px] bg-slate-200 border-[1px] border-[#680b783f] flex flex-col items-start justify-start p-5 mt-10 overflow-y-scroll rounded-md'>
            <h1 className='text-sm text-gray-600'>Recent Transactions</h1>
            <div className='mt-3 space-y-6'>
                {userData && userData.wallets && 
                userData.wallets.slice(0, 10).map((wallet, index) => (
                    <div className='space-y-6' key={index}>
                        {wallet.transactions && 
                          wallet.transactions.map((transaction, transactionIndex) => (
                            <p key={transactionIndex} 
                            className='text-sm font-medium flex justify-start items-center gap-2'>
                                <span>{transaction.amount} USD</span>
                                <span>{transaction.amount > 0 ? 'Received' : 'Sent'}</span>
                                <span>{new Date(transaction.meta.date._seconds * 1000).toLocaleString()}</span>
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
