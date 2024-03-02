import  React, { useState} from 'react'
import { Input } from '@/components/UI/input';
import { Button } from '@/components/UI/button';
import { recieveMoney } from '@/lib/transactions';
import { Alert } from '@/components/UI/alert';
import { useAppContext } from '@/context';

export const RecieveMoney = () => {
    const { userData } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valueInUSD, setValueInUSD] = useState('');
    const [payerEmail, setEmail] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRecievePayment = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
  try {
    const subAccount = userData?.id || '';
    const response = await recieveMoney(payerEmail, valueInUSD, subAccount); 
    setAlertMessage('Requets sent successfully!');
    console.log(response);
    setTimeout(() => {
        setAlertMessage('Request sent successfully!');        
        setEmail('');
        setValueInUSD('');
        setIsModalOpen(false);
    }, 5000);
    } catch (error) {
    console.error('Error sending money via email:', error);
    } finally {
            setIsLoading(false); 
        }
};

    return(
        
        <div className='flex md:w-3/5 w-full gap-8 h-[300px] bg-slate-200
         border-[1px] border-[#680b783f] justify-between rounded-md items-center p-5 mt-10'>
            <div className='space-y-6 w-full'>
                <h1 className=' text-5xl font-normal'>Recieve Money</h1>
                <p className=''>Recieve Money from anywhere around the world in easy steps</p>
                <div className=' mt-4'>
                    <Button onClick={() => setIsModalOpen(!isModalOpen)}>Recieve Payment</Button>
                </div>
            </div>
                {isModalOpen && ( 
      <div className='bg-clip-padding backdrop-filter bg-gray-600 backdrop-blur-sm bg-opacity-10 
      drop-shadow px-[20px] fixed w-full h-screen z-50 top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
        <div  className='bg-white lg:w-[600px] w-11/12 h-auto px-[20px] rounded-[16px] p-8'> 
          <div className=' w-full uppercase cursor-pointer text-sm flex justify-end font-medium'>
          <button onClick={() => setIsModalOpen(!isModalOpen)}>Close</button>
        </div>
            <form className='space-y-6' onSubmit={handleRecievePayment}>  
            <div  className=" w-full flex text-sm justify-center items-center">Recieve Money to your Wallets</div>
             {alertMessage && (
                <Alert>
                    <p>{alertMessage}</p>
                </Alert>
            )}  
                <Input
                placeholder='Payers Email'
                value={payerEmail}
                onChange={(e) => setEmail(e.target.value )}
                />
                <Input
                placeholder='Amount'
                id='amount'
                required
                value={valueInUSD}
                onChange={(e) => setValueInUSD(e.target.value)}
                />
                 {isLoading ? (
                <Button className='' type="submit" disabled>Processing</Button>
            ) : (
                <Button type="submit">Send</Button>
            )}
            </form>
            </div>
            </div>
                )}
        </div>
    )
}