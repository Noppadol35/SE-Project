import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const redirectBasedOnRole = (role: string) => {
    if (role === 'CHEF') {
        return '/dashboard/chef'
    } else if (role === 'MANAGER') {
        return '/dashboard/manager'
    } else if (role === 'WAITER') {
        return '/dashboard/waiter'
    } else if (role === 'CASHIER') {
        return '/dashboard/cashier'
    } else {
        return '/'
    }
}