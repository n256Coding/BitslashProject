/**
 * Created by Nishan on 6/28/2017.
 */
'use strict';

appModule.factory('OrderInvoiceService', ['$http',
    function ($http) {
        this.invoice = {};
        this.invoiceLineItems = [];

        function setOrder(invoice, invoiceLineItems) {
            this.invoice = invoice;
            this.invoiceLineItems = invoiceLineItems;
        }

        function unsetOrder() {
            this.invoice = {};
            this.invoiceLineItems = [];
        }

        function makeOrder() {
            var order = {};
            order.invoice = this.invoice;
            order.invoiceLineItems = this.invoiceLineItems;
            $http.post('/orderInvoices', order).then(function (output) {
                console.log(output.data);
            });
        }

        function getAllOrders() {
            return $http.get('/orderInvoices').then(function (orders) {
                return orders.data;
            });
        }

        return {
            makeOrder : makeOrder,
            setOrder : setOrder,
            unsetOrder : unsetOrder,
            getAllOrders : getAllOrders
        }
}]);