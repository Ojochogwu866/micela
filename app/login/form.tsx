import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { Button } from '@/components/UI/button';
import { useState } from 'react';
import { Alert } from '@/components/UI/alert';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res?.ok) {
                const responseData = await res.json();
                const id = responseData.isSubAccount;
                localStorage.setItem('isSubAccount', id); 
                console.log('User logged in successfully!');
                router.push(`/dashboard/[id]/?isSubAccountId=${id}`);
            } else {
                const errorResponse = await res.json();
                const errorMessage = errorResponse?.error ?? 'Failed to login';
                console.error('Failed to login:', errorMessage);
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while logging in');
     } finally {
            setIsLoading(false); 
        }
};


    return (
        <form
            onSubmit={onSubmit}
            className='space-y-6 w-full mx-auto flex flex-col justify-center items-start font-raleway'
        >
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
                <Label htmlFor="password">Password</Label>
                <Input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    id='password' type='password'
                />
            </div>
            {error && <Alert>{error}</Alert>}
             {isLoading ? (
                <Button className='' type="submit" disabled>...</Button>
            ) : (
                <Button type="submit">Login</Button>
            )}
        </form>
    );
}; 