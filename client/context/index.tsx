'use client'
import { createContext, useState, useContext, useEffect } from "react";
import {getUser} from '@/lib/getUser';

interface UserData {
    id: string;
    lastName: string;
    parent: string;
    verified: boolean;
    isScrimUser: boolean;
    subAccount: boolean;
    firstName: string;
    preferredExchangeRate: boolean;
    uid: string;
    approved: boolean;
    createdDate: string;
    phoneNumber: string;
    meta: {
        email: string;
    };
    name: string;
    email: string;
    wallets: {
        id: string;
        owner: string;
        balance: number;
        type: string;
        transactions: {
            amount: number;
            balanceBefore: number;
            meta: {
                date: {
                    _seconds: number;
                    _nanoseconds: number;
                };
            };
            newBalance: number;
            description: string;
        }[];
    }[];
}


interface ContextType {
    userData: UserData | null;
    fetchUserData: () => Promise<void>;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export function ContextWrapper ({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<UserData | null>(null);

    const fetchUserData = async () => {
        try {
            const id = localStorage.getItem('isSubAccount');
            if (!id) {
                console.error('isSubAccount ID not found in localStorage');
                return;
            }
            const data = await getUser(id);
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <AppContext.Provider value={{ userData, fetchUserData }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppContextProvider');
    }
    return context;
}
