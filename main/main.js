const loadAllItems = require('./loadAllItems.js');

module.exports = function main(inputs) {
    console.log("Debug Info");
    var allItems = loadAllItems();
    var items = allItems.valueOf();
    var total = 0;

    var actualText = '***<没钱赚商店>购物清单***\n';

    filter(inputs, items).forEach(item => {
        actualText += `名称：${item.name}，数量：${item.count}，单价：${item.price.toFixed(2)}(元)，小计：${(item.Subtotal).toFixed(2)}(元)\n`;
        total += item.Subtotal;
    })

    actualText += `----------------------\n总计：${total.toFixed(2)}(元)\n**********************`;

    return actualText;
};

function filter(inputs, items) {

    var outputs = [];
    items.forEach(element => {
        var count = 0;
        inputs.forEach(item => {
            if (item === element.barcode) {
                count++;
            }
        })

        if (!(count === 0)) {
            outputs.push({
                name: element.name,
                count: count + element.unit,
                price: element.price,
                Subtotal: count * element.price,
            })
        }
    })

    return outputs;
}
