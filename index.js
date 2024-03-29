let form = document.querySelector('form');
form.addEventListener('submit', submitForm);
window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/seller/get-seller-data')
        .then(res => {
            for (let i = 0; i < res.data.length; i++) {
                showOutput(res.data[i]);
            }
        })
        .catch(err => console.log(err));
})
//submit form
function submitForm(e) {
    e.preventDefault();
    let sp = document.getElementById('sellPrice');
    let prod = document.getElementById('prodName');
    let category = document.getElementById('category');
    let obj = {
        sellingPrice: sp.value,
        productName: prod.value,
        category: category.value
    }
    axios.post('http://localhost:3000/seller/add-seller-data', obj)
        .then(res => {
            showOutput(res.data);
        })
        .catch(err => console.log(err));
}
function showOutput(data) {
    if (data.category == 'Electronic Items') {
        let parentNode1 = document.getElementById('electronicList');
        let childNode1 = `<li id='${data.id}'> ${data.sellingPrice} - ${data.productName} - ${data.category} <button onclick=delFun('${data.id}')>Delete</button></li>`;
        parentNode1.innerHTML = parentNode1.innerHTML + childNode1;
    }
    else if (data.category == 'Food Items') {
        let parentNode2 = document.getElementById('foodList');
        let childNode2 = `<li id='${data.id}'> ${data.sellingPrice} - ${data.productName} - ${data.category} <button onclick=delFun('${data.id}')>Delete</button></li>`;
        parentNode2.innerHTML = parentNode2.innerHTML + childNode2;
    }
    else if (data.category == 'Skincare Items') {
        let parentNode3 = document.getElementById('skincareList');
        let childNode3 = `<li id='${data.id}'> ${data.sellingPrice} - ${data.productName} - ${data.category} <button onclick=delFun('${data.id}')>Delete</button></li>`;
        parentNode3.innerHTML = parentNode3.innerHTML + childNode3;
    }
}
function delFun(id) {
    axios.delete(`http://localhost:3000/seller/delete-seller-data/${id}`)
        .then(res => {
            removeFromScreen(id);
        })
        .catch(err => console.log(err));
}
function removeFromScreen(id) {
    let parentNode1 = document.getElementById('electronicList');
    let parentNode2 = document.getElementById('foodList');
    let parentNode3 = document.getElementById('skincareList');
    let childNode = document.getElementById(id);
    if (parentNode1.contains(childNode)) {
        parentNode1.removeChild(childNode);
    } else if (parentNode2.contains(childNode)) {
        parentNode2.removeChild(childNode);
    } else if (parentNode3.contains(childNode)) {
        parentNode3.removeChild(childNode);
    }

}