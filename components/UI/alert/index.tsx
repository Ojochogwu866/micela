
type AlertProps = {
    children: React.ReactNode
}

const Alert = ({ children}: AlertProps ) => {
    return (
        <div className=" w-full flex justify-center items-center text-xs text-slate-950">
            {children}
        </div>
    )
}

export { Alert }