'use client'
import { useState } from 'react';
import { Input } from '@/components/UI/input';
import { Button } from '@/components/UI/button';
import { searchUsers, sendMoney, sendMoneyViaEmail } from '@/lib/transactions';
import { Alert } from '@/components/UI/alert';
import { useAppContext } from '@/context';


interface Wallet {
    id: string;
    type: string; 
}

interface User {
  id?:string;
  email?: string;
  phone?: string;
  wallets?: Wallet[];
}

interface Payment {
  email: string;
  phone: string;
  valueInUSD: number;
  redeemData: {
    walletID: string;
    interledgerWalletAddress: string;
  };
}

export const SendMoney = () => {
  const { userData } = useAppContext();
  const [tab, setTab] = useState('otherUsers');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [valueInUSD, setValueInUSD] = useState('');
  const [email, setEmail] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: string) => {
      setTab(tab);
  };

const handleSearchInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    setSearchQuery(query);
    if (query !== '') {
        try {
        const results = await searchUsers(query);
        setSearchResults(results);
        setDropdownVisible(true); 
        } catch (error) {
        console.error('Error searching for users:', error);
        }
    } else {
        setSearchResults([]); 
        setDropdownVisible(false); 
    }
};

  
const handleSendMoney = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsLoading(true);
  try {
    const user = searchResults[0]; 
    const chiWallet = user?.wallets?.find(wallet => wallet.type === 'chi');
    const walletID = chiWallet?.id || '';
    const subAccount = userData?.id || '';
    const payments: Payment[] = [{
        email: user?.email || '',
        phone: user?.phone || '',
        valueInUSD: parseInt(valueInUSD),
        redeemData: {
            walletID: walletID,
            interledgerWalletAddress: 'zedeki28',
        },
    }];

    const response = await sendMoney(payments, subAccount);
        setAlertMessage('Money sent successfully!');
        console.log(response);
        setTimeout(() => {
            setSearchQuery('');
            setSearchResults([]);
            setSelectedUser(null);
            setValueInUSD('');
            setDropdownVisible(false);
            setIsModalOpen(false);
        }, 5000); 
    } catch (error) {
        console.error('Error sending money:', error);
        setAlertMessage('Error sending money. Please try again.');
        setIsModalOpen(false);
     } finally {
            setIsLoading(false); 
        }
};

const handleSendMoneyViaEmail = async (event: React.FormEvent<HTMLFormElement>) => {
  setIsLoading(true);
  event.preventDefault();
  try {
    const response = await sendMoneyViaEmail(email, valueInUSD); 
    setAlertMessage('Money sent successfully!');
    console.log(response);
    setTimeout(() => {
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

const handleDropdownItemClick = (result: User) => {
  setSelectedUser(result);
  setDropdownVisible(false);
};

return (
  <div className=''>
    <div className='flex md:flex-row flex-col w-full gap-8 md:h-[300px] h-auto bg-slate-200 border-[1px] border-[#680b783f] justify-between rounded-md items-center p-5 mt-10'>
      <div className='space-y-6'>
        <h1 className='text-5xl font-normal'>Send Money</h1>
        <p className=''>Send Money to anyone anywhere around the world</p>
      </div>
      <div className='space-y-4 w-full h-auto md:w-[30%] md:h-[200px] flex flex-col justify-center items-center'>
        <p className='text-sm font-normal'>
          Sending Money to your loved ones anywhere in very easy steps. <br/>
          Just by using their email address or phone number 
        </p>
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>Send Here</Button>
      </div>
    </div>
    {isModalOpen && ( 
      <div className='bg-clip-padding backdrop-filter bg-gray-600 backdrop-blur-sm bg-opacity-10 
      drop-shadow px-[20px] fixed w-full h-screen z-50 top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
        <div  className='bg-white lg:w-[600px] w-11/12 h-auto px-[20px] rounded-[16px] p-8'> 
        <div className=' w-full uppercase cursor-pointer text-sm flex justify-end font-medium'>
          <button onClick={() => setIsModalOpen(!isModalOpen)}>Close</button>
        </div>
         <h6 className=' text-base font-medium'>Send Money</h6>
            <div className="flex gap-4 my-3">
              <div  onClick={() => handleTabChange('otherUsers')} className={`tab ${tab === 'otherUsers w-full' ? 'border-b-[2px] delay-75 translate-x-3 border-black pb-2' : ''} w-full flex justify-start cursor-pointer items-center`}>Send to Chimoney Users</div>
              <div  onClick={() => handleTabChange('viaEmail')} className={`tab ${tab === 'viaEmail w-full' ? 'border-b-[2px] delay-75 translate-x-3 border-black pb-2' : ''} w-full flex justify-start cursor-pointer items-center`}>Send to Non Users</div>
            </div>
            {alertMessage && (
                <Alert>
                    <p>{alertMessage}</p>
                </Alert>
            )}
             {tab === 'otherUsers' && (
            <form className='space-y-6' onSubmit={handleSendMoney}>
               
                <div className=''>
                <Input
                    placeholder='Search by Email or Phone Number'
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <ul>
                    {dropdownVisible && searchResults.map((result, index) => (
                        <li className='text-sm cursor-pointer w-full h-[46px] bg-gray-100  rounded-md p-2  font-normal' key={index}>
                        <div onClick={() => handleDropdownItemClick(result)}>
                            {result.email || result.phone}
                        </div>
                        </li>
                    ))}
                </ul>
                </div>
                <Input
                placeholder='Amount'
                id='amount'
                required
                value={valueInUSD}
                onChange={(e) => setValueInUSD(e.target.value)}
                />
                <Input
                disabled
                placeholder='Recipient Email'
                value={selectedUser?.email || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
                <Input
                disabled
                placeholder='Recipient Phone Number'
                value={selectedUser?.phone || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                />
              {isLoading ? (
                <Button className='' type="submit" disabled>Processing</Button>
            ) : (
                <Button type="submit">Send</Button>
            )}
            </form>
            )}
            {tab === 'viaEmail' && (
              <form className='space-y-6' onSubmit={handleSendMoneyViaEmail}>    
                <Input
                placeholder='Recipient Email'
                value={email}
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
              )}
            </div>
        </div>
        )}
    </div>
    );
}
