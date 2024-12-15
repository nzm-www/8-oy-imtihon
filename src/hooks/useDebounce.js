import { useEffect, useState } from "react"

const useDebounce = (initialValue, delay) => {
    const [value, setValue] = useState(initialValue)
    useEffect(() => {
        const interval = setTimeout(() => {
            setValue(initialValue)
        }, delay);
        return() => {
            clearTimeout(interval)
        }
    }, [initialValue, delay])
    
    return value
}

export default useDebounce