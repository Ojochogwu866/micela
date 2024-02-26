'use client'
import { Input } from '@/components/UI/input'
import { Label } from '@/components/UI/label'
import { Button } from '@/components/UI/button'
import { useState } from 'react'
import { Alert } from '@/components/UI/alert'
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [lastName, setlastName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

    try {
        const res = await fetch('https://chi-api.onrender.com/api/v1/register', {
            method: 'POST',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phoneNumber,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const responseData = await res.json();
            const id = responseData.isSubAccount;
            console.log('User registered successfully!');
            localStorage.setItem('isSubAccount', id); 
            router.push(`/login`);
        } else {
            const errorResponse = await res.json();
            const errorMessage = errorResponse?.error ?? 'Failed to register user';
            console.error('Failed to register user:', errorMessage);
            setError(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while registering user');
     } finally {
            setIsLoading(false); 
        }
    };

    return (
        <form 
        onSubmit={onSubmit}
        className=' space-y-6 w-full mx-auto flex flex-col justify-center items-start font-raleway'>
            <div className='flex w-full gap-6 '>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label htmlFor="First name">First Name</Label>
                    <Input
                        required
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                        id='First name' type='text'
                    />
                </div>
                <div className='grid w-full  items-center gap-1.5'>
                    <Label htmlFor="Last name">Last Name</Label>
                    <Input
                        required
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                        id='Last name' type='text'
                    />
                </div>

            </div>
            <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor="email">Email</Label>
                <Input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email' type='email'
                />
            </div>
            <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor="phone number">Phone Number <span className='text-xs ml-2 text-red-600'>*Please add country code</span></Label>
                <Input
                    required
                    value={phoneNumber}
                    onChange={(e) => setphoneNumber(e.target.value)}
                    id='email' type='text'
                />
            </div>
            <div className='grid w-full  items-center gap-1.5'>
                <Label htmlFor="Password">Password</Label>
                <Input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=' Choose a minimum of 8 characters'
                    id='password' type='password'
                />
            </div>
            {error && <Alert>{error}</Alert>}
            {isLoading ? (
                <Button className='' type="submit" disabled>...</Button>
            ) : (
                <Button type="submit">Sign Up</Button>
            )}
        </form>
    )
}