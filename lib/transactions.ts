const CHIMONEY_API_BASE_URL = 'https://api-v2-sandbox.chimoney.io/v0.2';

/**
 * Seach Users by email or phone number
 * @param searchTerm 
 * @returns 
 */
export const searchUsers = async (searchTerm: string): Promise<{
    wallets: any; email: string; phone: string 
}[]> => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_CHIMONEY_API_KEY;
        if (!apiKey) {
            throw new Error('Chi-Money API key not provided');
        }
        const res = await fetch(
            `${CHIMONEY_API_BASE_URL}/sub-account/list`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey
                }
            }
        );
        if (!res.ok) {
            throw new Error('Failed to search for users: Invalid response from Chi-Money API');
        }
        const responseData = await res.json();
        if (Array.isArray(responseData.data)) {
            const subAccounts = responseData.data;
            const filteredUsers = subAccounts.filter((subAccount: any) => {
                return subAccount.email === searchTerm || subAccount.phoneNumber === searchTerm;
            }).map((user: any) => ({
                email: user.email,
                phone: user.phoneNumber,
                wallets: user.wallets
            }));
            return filteredUsers;
        } else {
            throw new Error('Failed to search for users: Invalid response data from Chi-Money API');
        }
    } catch (error) {
        console.error('Error searching for users:', error);
        throw new Error('Failed to search for users');
    }
};

/*
*types Definition for payload
*/
interface Payment {
    email: string;
    phone: string;
    valueInUSD: number;
    redeemData: {
        walletID: string;
        interledgerWalletAddress: string;
    };
}

/**
 * Make payments to users if email address or phone is confirmed
 * @param payments 
 * @returns 
 */


export async function sendMoney(payments: Payment[]): Promise<any> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_CHIMONEY_API_KEY;
    if (!apiKey) {
            throw new Error('Chi-Money API key not provided');
    }
    const res = await fetch(`${CHIMONEY_API_BASE_URL}/payouts/chimoney`, {
    method: 'POST',
            headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'X-API-KEY': apiKey
     },
      body: JSON.stringify({
        chimoneys: payments,
        turnOffNotification: true,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to send money');
    }

    return res.json();
  } catch (error) {
    console.error('Error sending money:', error);
    throw new Error('Failed to send money');
  }
}


/*
*types Definition for payload
*/

export async function sendMoneyViaEmail(email: string, valueInUSD: string): Promise<any> {
  try {
    const res = await fetch(`https://chi-api.vercel.app/api/v1/send-payment`, {
      method: 'POST',
            headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
     },
      body: JSON.stringify({
                    email,
                    valueInUSD
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to send money');
    }

    return res.json();
  } catch (error) {
    console.error('Error sending money:', error);
    throw new Error('Failed to send money');
  }
}