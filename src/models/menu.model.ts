export class MenuGlobal {
    categories: Categories[];
}

export class Categories {
    name: string;
    img: string;
    open: boolean;
    products: Product[];
}

export class Product {
    img: string;
    name: string;
    price: number;
    quantity: number;
}