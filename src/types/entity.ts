
export type User = {
    id: string;
    email: string;
    name: string;
    phone: string;
    role: "MANAGER" | "WAITER" | "CHEF" | "CASHIER";
}

export type Order = {
    id: string;
    quantity: number;
    tableID: string;
    menu : Menu;
    status: "PENDING" | "COMPLETED" | "CANCELLED";
}

export type Menu = {
    id: number;
    name: string;
    category: string;
    cart: Cart;
}

export type TableEntity = {
    id: string;
    name: string;
    capacity: number;
    status: "IDLE" | "EATTING";
    order: Order;
    cart: Cart;
    bill: Bill;
}

export type Cart = {
    id: string;
    menu: Menu;
    order: Order;
    table: TableEntity;
    quantity: number;
    status: string;
}

export type Bill = {
    id: string;
    total: number;
    status: "PAID" | "UNPAID";
    table: TableEntity;
    guest: Guest;
    date: string
}

export type Guest = {
    id: string;
    start: string;
    end: string;
    bill: Bill;
}

export type session = {
    id: string;
    expires: Date;
    useId: string;
    sessionToken: string;
    accessToken: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}

export type SignInResponse = {
    user: User;
    session: session;
}