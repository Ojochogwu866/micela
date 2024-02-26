
import * as React from 'react'
import { cn }  from '@/lib/utils'

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

    const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
        ({ className,  ...props }, ref) =>{
            return (
                <button
                    className={cn(` w-full h-[46px] rounded-md text-sm font-medium flex 
                    items-center justify-center text-white bg-[#670b78]`)}
                    ref={ref}
                    {...props}
                />
            )
        }
    )

    Button.displayName = 'Button'

    export { Button }