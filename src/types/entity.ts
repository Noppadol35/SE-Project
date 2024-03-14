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
}

export type Menu = {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export type Table = {
    id: string;
    number: number;
    capacity: number;
    status: string;
}

export type Cart = {
    id: string;
    quantity: number;
    tableID: string;
    menu : Menu;
}

export type Bill = {
    id: string;
    total: number;
    gustID: string;
}

