import Inventory from "./inventory.js";

let bttnRegister = document.querySelector("#register"),
    bttnInquiry = document.querySelector("#inquiry"),
    //bttnInsert = document.querySelector("#insert"),
    divInventory = document.querySelector("#showInventory"),
    divInquiry = document.querySelector("#showInquiry"),
    bttnDelete = document.querySelector("#delete");

bttnRegister.addEventListener("click", () => {
    m.registerNewProduct(m.extractDataFromInputs());
});

bttnInquiry.addEventListener("click", () => {
    m.makeInquiry(Number(document.querySelector("#inquiryCode").value));
});

/*bttnInsert.addEventListener("click", () => {
    let data = m.extractDataFromInputs(),
        position = document.querySelector("#position").value;
    m.insertProduct(data, position);
});*/

bttnDelete.addEventListener("click", () => {
    m.deleteFromInventory(Number(document.querySelector("#deleteCode").value));
});

class Main {
    constructor() {
        this._baseInventory = new Inventory();
    }

    registerNewProduct(objNewProduct) {
        this._baseInventory.registerProduct(objNewProduct);
        this.showInventory();
    }

    insertProduct(product, position) {
        this._baseInventory.addProductInPosition(product, position);
        this.showInventory();
    }

    makeInquiry(code) {
        divInquiry.innerHTML = this._baseInventory.searchForInquiry(code);
    }

    extractDataFromInputs() {
        let objNewProduct = {
            code: Number(document.querySelector("#code").value),
            name: document.querySelector("#name").value,
            price: document.querySelector("#price").value,
            quantity: document.querySelector("#quantity").value,
            description: document.querySelector("#description").value
        }
        return objNewProduct;
    }

    deleteFromInventory(code) {
        this._baseInventory.deleteProduct(code);
        this.showInventory();
    }

    showInventory() {
        this._baseInventory.getInventoryAsString();
        divInventory.innerHTML = this._baseInventory.inventoryString;
    }

    /*defaultRegister() {
        let p1 = {
            code: "0001",
            name: "Paleta",
            price: "4.00",
            quantity: "30",
            description: "Vainilla"
        }

        let p2 = {
            code: "0002",
            name: "Paleta",
            price: "4.00",
            quantity: "30",
            description: "Chocolate"
        }

        let p3 = {
            code: "0003",
            name: "Paleta",
            price: "4.00",
            quantity: "30",
            description: "Cajeta"
        }

        this.registerNewProduct(p1);
        this.registerNewProduct(p2);
        this.registerNewProduct(p3);
    }*/
}

let m = new Main();
//m.defaultRegister();