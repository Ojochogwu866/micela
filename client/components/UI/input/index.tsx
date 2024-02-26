import * as React from 'react'
import { cn }  from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

    const Input = React.forwardRef<HTMLInputElement, InputProps>(
        ({className, ...props }, ref) =>{
            return (
                <input
                    className={cn(`w-full h-[46px] border bg-gray-100 border-gray-400 text-sm rounded-md p-2`)}
                    ref={ref}
                    {...props}
                />
            )
        }
    )

    Input.displayName = 'Input'

    export { Input }