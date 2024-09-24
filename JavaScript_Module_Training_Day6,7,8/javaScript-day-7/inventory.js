function priceError(element) {
    const priceError = document.getElementById('price-error');
    const price = parseFloat(element.value);
    if (isNaN(price) || price <= 0) {
        priceError.textContent = "Enter a valid price.";
        priceError.style.display = 'block';
    } else {
        priceError.style.display = 'none';
    }
}

function quantityError(element) {
    const quantityError = document.getElementById('quantity-error');
    const quantity = parseInt(element.value);
    if (isNaN(quantity) || quantity < 0) {
        quantityError.textContent = "Enter a valid quantity.";
        quantityError.style.display = 'block';
    } else {
        quantityError.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    function Product(name, price, quantity) {
        this.productName = name.trim().toLowerCase();
        this.productPrice = price;
        this.quantity = quantity;
    }

    Product.prototype.updateData = function(name, price, quantity) {
        this.productName = name.trim().toLowerCase();
        this.productPrice = price;
        this.quantity = quantity;
    }

    Product.prototype.displayProduct = function () {
         console.log(inventory);
        const inventoryTable = document.querySelector('.inventory-list-table tbody');
        const existingRow = Array.from(inventoryTable.rows).find(row =>
            row.cells[0].innerText.toLowerCase() === this.productName
        );
        if (existingRow) {
            existingRow.cells[1].innerText = `$${this.productPrice.toFixed(2)}`;
            existingRow.cells[2].innerText = this.quantity;
        } else {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${this.productName}</td>
                <td>$${this.productPrice.toFixed(2)}</td>
                <td>${this.quantity}</td>
                <td colspan="2">
                    <div class="action-btn">
                        <button class="delete-btn" data-name="${this.productName}">Delete</button>
                        <button class="update-btn" 
                                data-name="${this.productName}"
                                data-price="${this.productPrice}"
                                data-quantity="${this.quantity}">
                                Update
                        </button>
                    </div>
                </td>
            `;
            inventoryTable.appendChild(tableRow);
        }
    }

    document.querySelector('.inventory-list-table').addEventListener('click', function (event) {
        
        if (event.target.classList.contains('delete-btn')) {
            const productName = event.target.getAttribute('data-name');
            const row = event.target.closest('tr');
            row.remove();

            const index = inventory.findIndex(product => product.productName === productName);
            if (index > -1) {
                inventory.splice(index, 1);
            }
            console.log(inventory);
        }

        if (event.target.classList.contains('update-btn')) {
            const oldName = event.target.getAttribute('data-name');
            const oldPrice = parseFloat(event.target.getAttribute('data-price'));
            const oldQuantity = parseInt(event.target.getAttribute('data-quantity'));

            document.getElementById('product-name').value = oldName;
            document.getElementById('product-price').value = oldPrice;
            document.getElementById('product-quantity').value = oldQuantity;

            const updateButton = document.getElementById('add-product-btn');
            updateButton.textContent = 'Update';
            updateButton.classList.add('data-update');
            updateButton.classList.remove('add-product-btn');
            updateButton.setAttribute('data-old-name', oldName); 
        }
    });

    const inventory = [];

    function addFormData(event) {
        event.preventDefault();

        const updateButton = document.querySelector('#add-product-btn.data-update');
        const isUpdate = updateButton !== null;

        const name = document.getElementById('product-name').value.trim().toLowerCase();
        const price = parseFloat(document.getElementById('product-price').value);
        const quantity = parseInt(document.getElementById('product-quantity').value);

        if (isUpdate) {
            const oldName = updateButton.getAttribute('data-old-name');
            const existingProduct = inventory.find(product => product.productName === oldName);

            if (existingProduct) {
                // console.log(existingProduct);
                existingProduct.updateData(name, price, quantity);
                // console.log(existingProduct);
                existingProduct.displayProduct();
            }

            updateButton.textContent = 'Add Product';
            updateButton.classList.add('add-product-btn');
            updateButton.classList.remove('data-update');
            updateButton.removeAttribute('data-old-name');
        } else {
            
            const newProduct = new Product(name, price, quantity);
            // console.log(newProduct);
            inventory.push(newProduct);
            newProduct.displayProduct();
        }

        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-quantity').value = '';
    }

    const inventoryForm = document.getElementById('inventory-form-data');
    inventoryForm.addEventListener('submit', addFormData);
});
