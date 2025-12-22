import { getItem, setItem } from "@/utils/sessionStorage";
import { useEffect, useState } from 'react';

export function usePersistedState <T>(key: string, initialValue: T) {
    const [value, setValue] = useState(()=> {
        const item = getItem(key);
        return (item as T) || initialValue;
    })

    useEffect(()=> {
        setItem(key, value);
    }, [key, value]);

    return [value, setValue] as const;
}