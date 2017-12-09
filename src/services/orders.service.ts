import { Injectable } from '@angular/core';
//


@Injectable()
export class OrdersService {
    private allOrders = []

    
    constructor() {
        
    }
    newOrder = (order) => {
        this.allOrders.push(order);
    }

    getOrders = () => {
        return this.allOrders;
    }
}
    
