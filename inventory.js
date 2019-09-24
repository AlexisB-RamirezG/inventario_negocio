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
            if (this._inventory.length == 0) {
                this._inventory[0] = newProduct;
            } else {
                let position = this._searchForBottomPosition(product.code);
                for (let i = this._inventory.length - 1; i > position - 1; i--) {
                    this._inventory[i + 1] = this._inventory[i];
                }
                this._inventory[position + 1] = newProduct;
            }
        }
    }

    /*registerProduct(product) {
        console.log(this._searchForRegisteredProduct(product.code));
        if (this._searchForRegisteredProduct(product.code) == -1) {
            let newProduct = new Product(product);
            this._inventory[this._inventory.length] = newProduct;
        }
    }*/

    /*addProductInPosition(product, position) {
        if (this._searchForRegisteredProduct(product.code) == -1) {
            let newProduct = new Product(product);
            for (let i = this._inventory.length - 1; i >= position - 1; i--) {
                this._inventory[i + 1] = this._inventory[i];
            }
            this._inventory[position - 1] = newProduct;
        }
    }*/

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
        let uPosition = this._inventory.length - 1,
            bPosition = 0,
            medium = 0;

        while (this._getDifference(bPosition, uPosition) >= 1) {
            medium = this._getHalf(bPosition, uPosition);
            if (code < this._inventory[medium].code) {
                uPosition = medium;
            } else {
                bPosition = medium;
            }
            if (this._inventory[bPosition].code == code) {
                return bPosition;
            } else if (this._inventory[uPosition].code == code) {
                return uPosition;
            }
        }
        return -1;
    }

    _searchForBottomPosition(code) {
        let uPosition = this._inventory.length - 1,
            bPosition = 0,
            medium = 0;

        while (this._getDifference(bPosition, uPosition) >= 1) {
            medium = this._getHalf(bPosition, uPosition);
            if (code < this._inventory[medium].code) {
                uPosition = medium;
            } else {
                bPosition = medium;
            }
            console.log(code, uPosition, bPosition);
        }
        if (code > this._inventory[uPosition].code) {
            return uPosition;
        } else {
            return bPosition; {}
        }
    }

    _getHalf(bP, uP) {
        return Math.trunc((bP + uP) / 2);
    }

    _getDifference(bP, uP) {
        return (uP - bP) / 2;
    }

    /*_searchForRegisteredProduct(code) {
        for (let i = 0; i < this._inventory.length; i++) {
            if (this._inventory[i].code == code) {
                return i;
            }
        }
        return -1;
    }*/
}