import React from 'react'

interface IGlobalContext {
    consumption: number
    time: string
    setConsumption: React.Dispatch<React.SetStateAction<number>>
    setTime: React.Dispatch<React.SetStateAction<string>>
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DEFAULT_CONTEXT: IGlobalContext = {
    consumption: 0,
    time: '',
    setConsumption: () => {},
    setTime: () => {},
    isOpen: false,
    setOpen: () => {},
}

const GlobalContext = React.createContext<IGlobalContext>(DEFAULT_CONTEXT)

export const GlobalContextProvider: React.FC<{ children: any }> = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(DEFAULT_CONTEXT.isOpen)
    const [consumption, setConsumption] = React.useState<number>(DEFAULT_CONTEXT.consumption)
    const [time, setTime] = React.useState<string>(DEFAULT_CONTEXT.time)

    const setOpen = () => {
        setIsOpen((prev) => !prev)
    }

    const value: IGlobalContext = {
        setConsumption,
        setTime,
        consumption,
        time,
        isOpen,
        setOpen,
    }

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export default GlobalContext
