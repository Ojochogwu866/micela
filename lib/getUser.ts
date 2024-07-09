const CHIMONEY_API_BASE_URL = 'https://api-v2-sandbox.chimoney.io/v0.2';

/**
 * Get all details attached to a specific user
 * @param id 
 * @returns 
 */
export  async function getUser(id: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_CHIMONEY_API_KEY; 
    if (!apiKey) {
      throw new Error('Unauthorized Access');
    }
    const res = await fetch( `${CHIMONEY_API_BASE_URL}/sub-account/get?id=${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
        }
    });
    if (!res.ok) {
      throw new Error('Failed to get User: ' + res.statusText);
    }
    const userData = await res.json();
    return userData.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

/**
 * Get all transactions from sub account
 * @param id 
 * @returns
 */

export  async function getTransactions(id: string) {
      try {
        const apiKey = process.env.NEXT_PUBLIC_CHIMONEY_API_KEY;
        if (!apiKey) {
          throw new Error('Unauthorized Access');
        }

        const payload = { subAccount: id };
        const res = await fetch( `${CHIMONEY_API_BASE_URL}/accounts/transactions`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
          },
          body: JSON.stringify(payload)
        });
   if (!res.ok) {
      throw new Error('Failed to get User: ' + res.statusText);
    }
    const userData = await res.json();
    return userData.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}