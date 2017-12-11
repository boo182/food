export class Categories {
    name: string;
    img: string;
    open: boolean;
    products: Product[];
}

export class MenuGlobal {
    categories: Categories[];
}

export class Order {
    date: Date;
    total: number;
    products: Product[];
}

export class Product {
    img: string;
    desc: string;
    name: string;
    price: number;
    quantity: number;
}
