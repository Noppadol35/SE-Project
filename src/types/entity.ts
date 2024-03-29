
export type User = {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
}

export type Order = {
    id: string;
    quantity: number;
    tableID: string;
    menu : Menu;
    status: string;
}

export type Menu = {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    cart: Cart;
    status: string;
}

export type Table = {
    id: string;
    number: number;
    capacity: number;
    status: string;
    order: Order;
    cart: Cart;
    bill: Bill;
}

export type Cart = {
    id: string;
    menu: Menu;
    order: Order;
    table: Table;
    quantity: number;
    status: string;
}

export type Bill = {
    id: string;
    total: number;
    table: Table;
    guest: Guest;
    status: string;
}

export type Guest = {
    id: string;
    start: Date;
    end: Date;
    bill: Bill;
    status: string;
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