/**
 * Created by Nishan on 5/1/2017.
 */
appModule.factory('EmailDataStore', function () {
    var stockData = [];
    var supplierEmail = '';
    function setData(stock) {
        stockData = stock;
    }
    function getData() {
        return stockData;
    }
    function setSupplierEmail(email) {
        supplierEmail = email;
    }
    function getSupplierEmail() {
        return supplierEmail;
    }

    return{
        set: setData,
        get: getData,
        setEmail : setSupplierEmail,
        getEmail : getSupplierEmail
    }
});