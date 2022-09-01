function Order(firstname, size, milkType, availableDrinks, hotOrCold) {
    this.firstname = firstname;
    this.size = size;
    this.milkType = milkType;
    this.availableDrinks = availableDrinks;
    this.hotOrCold = hotOrCold;
}

const form = document.querySelector('.form');
const listContainer = document.querySelector('.list');
const allOrders = [];


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.querySelector("ul")) {
        document.querySelector("ul").remove();
    }
    const userName = document.querySelector('#username').value;
    const size = document.querySelector('#size').value;
    const milkType = document.querySelector('#milkType').value;
    const availableDrinks = document.querySelector('#availableDrinks').value;
    const hotOrCold = document.querySelector('input[name="hotOrCold"]:checked').value;

    const newOrder = new Order(userName, size, milkType, availableDrinks, hotOrCold);
    allOrders.push(newOrder);

    if (JSON.parse(localStorage.getItem('orders'))) {
        localStorage.removeItem('orders');
        localStorage.setItem('orders', JSON.stringify(allOrders))
    } else {
        localStorage.setItem('orders', JSON.stringify(allOrders))
    }

    const list_of_orders = document.createElement('ul');
    listContainer.appendChild(list_of_orders);

    form.reset();
    if (JSON.parse(localStorage.getItem('orders'))) {
        allOrders.forEach(order => {
            const newOrder = document.createElement('li');
            newOrder.innerHTML = `
            ${order.firstname} ordered a ${order.hotOrCold} ${order.size} ${order.availableDrinks} with ${order.milkType}
            `;
            list_of_orders.appendChild(newOrder);
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'X';
            deleteButton.classList.add('delete');
            newOrder.appendChild(deleteButton);
        })
    }
    const buttons = document.querySelectorAll('.delete');


    buttons.forEach(btn => {

        btn.addEventListener('click', () => {
            btn.parentElement.remove();
        })
    });
});



