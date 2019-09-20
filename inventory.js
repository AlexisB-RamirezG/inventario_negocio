import Product from "./product.js";

export default class Inventory {
    constructor() {
        this._inventory = [];
        this._inventoryString = "";
    }

    get inventory() {
        return this._inventory;
    }

    get inventoryString() {
        return this._inventoryString;
    }

    registerProduct(product) {
        if (this._searchForRegisteredProduct(product.code) == -1) {
            let newProduct = new Product(product);
            this._inventory[this._inventory.length] = newProduct;
        }
    }

    addProductInPosition(product, position) {
        if (this._searchForRegisteredProduct(product.code) == -1) {
            let newProduct = new Product(product);
            for (let i = this._inventory.length - 1; i >= position - 1; i--) {
                this._inventory[i + 1] = this._inventory[i];
            }
            this._inventory[position - 1] = newProduct;
        }
    }

    searchForInquiry(code) {
        let index = this._searchForRegisteredProduct(code);
        if (index > -1) {
            return this._inventory[index].toString();
        }
    }

    deleteProduct(code) {
        let index = this._searchForRegisteredProduct(code);
        if (index >= 0) {
            for (let i = index + 1; i <= this._inventory.length; i++) {
                this._inventory[i - 1] = this._inventory[i]
            }
        }
        let newInventory = [];
        for (let i = 0; i <= this._inventory.length - 2; i++) {
            newInventory[i] = this._inventory[i];
        }
        this._inventory = newInventory;
    }

    getInventoryAsString() {
        this._inventoryToString();
    }

    _inventoryToString() {
        this._inventoryString = "";
        for (let i = 0; i < this._inventory.length; i++) {
            this._inventoryString += this._inventory[i].toString() + "<br>";
        }
    }

    _searchForRegisteredProduct(code) {
        for (let i = 0; i < this._inventory.length; i++) {
            if (this._inventory[i].code == code) {
                return i;
            }
        }
        return -1;
    }
}