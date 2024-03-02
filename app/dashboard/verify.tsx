import  React, { useState} from 'react'
import { Input } from '@/components/UI/input';
import { Button } from '@/components/UI/button';
import { Alert } from '@/components/UI/alert';
import { useAppContext } from '@/context';
import { verifyMoney } from '@/lib/transactions';

export const VerifyMoney = () => {
    const { userData } = useAppContext();
    const [id, setId] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleVerifyPayment = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
  try {
    const subAccount = userData?.id || '';
    const response = await verifyMoney(id, subAccount); 
    setAlertMessage('Verified successfully!');
    console.log(response);
    setTimeout(() => {
        setAlertMessage('');        
        setId('');
    }, 5000);
    } catch (error) {
        setAlertMessage('Payment not verifiable'); 
        console.error('Error Verifying:', error);
    } finally {
            setAlertMessage(''); 
            setIsLoading(false); 
        }
};

    return(
        <div className='flex flex-col md:flex-row md:h-[300px] h-auto  w-full gap-8  bg-slate-200
         border-[1px] border-[#680b783f] justify-between rounded-md items-center p-5 mt-10'>
             <div className='space-y-6 '>
                <h1 className=' text-5xl'>Verify Payment Request</h1>
                <p className="">Verify Payment requests here </p>
            </div>
            <form className='space-y-6 w-full md:w-1/2' onSubmit={handleVerifyPayment}>  
            <div  className=" w-full flex text-sm justify-center items-center">Verify Payment Request</div>
             {alertMessage && (
                <Alert>
                    <p>{alertMessage}</p>
                </Alert>
            )}  
                <Input
                placeholder='Payment Reference'
                id='id'
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                />
                 {isLoading ? (
                <Button className='' type="submit" disabled>Processing</Button>
            ) : (
                <Button type="submit">Verify</Button>
            )}
            </form>
        </div>
    )
}