const CHIMONEY_API_BASE_URL = 'https://api-v2-sandbox.chimoney.io/v0.2';

/**
 * Seach Users by email or phone number
 * @param searchTerm 
 * @returns 
 */
export const searchUsers = async (partialSearchTerm: string): Promise<{
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
                return subAccount.email.startsWith(partialSearchTerm) || subAccount.phoneNumber.startsWith(partialSearchTerm);
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
export async function sendMoney(payments: Payment[], subAccount: string): Promise<any> {
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
        turnOffNotification: false,
        subAccount,
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

export async function recieveMoney(payerEmail: string, valueInUSD: string, subAccount: string): Promise<any> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_CHIMONEY_API_KEY;
    if (!apiKey) {
            throw new Error('Chi-Money API key not provided');
    }
    const res = await fetch(`${CHIMONEY_API_BASE_URL}/payment/initiate`, {
    method: 'POST',
            headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'X-API-KEY': apiKey
     },
      body: JSON.stringify({
        payerEmail,
        valueInUSD,
        subAccount
      }),
    });

    if (!res.ok) {
      throw new Error('Cant recieve money yet');
    }

    return res.json();
  } catch (error) {
    console.error('Error getting paid money:', error);
    throw new Error('Failed to recieve money');
  }
}

interface PayWithEmail {
    email: string;
    valueInUSD: number;
    redeemData: {
        walletID: string;
        interledgerWalletAddress: string;
    };
}

export async function sendMoneyViaEmail(payments: PayWithEmail[], subAccount: string): Promise<any> {
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
        turnOffNotification: false,
        subAccount,
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

export async function verifyMoney(id: string, subAccount: string): Promise<any> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_CHIMONEY_API_KEY;
    if (!apiKey) {
            throw new Error('Chi-Money API key not provided');
    }
    const res = await fetch(`${CHIMONEY_API_BASE_URL}/payment/verify`, {
    method: 'POST',
            headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'X-API-KEY': apiKey
     },
      body: JSON.stringify({
        id,
        subAccount,
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