appModule
    .controller('viewOrderConntroller',function ($scope,OrderInvoiceService) {

        $scope.orderDate = '';
        OrderInvoiceService.getAllOrders().then(function (orders) {
            $scope.orders = orders;
        });
        $scope.clearDate = function () {
            $scope.orderdate = '';
        };

        $scope.generatePdf = function () {
            /*var pdf = new jsPDF('p', 'pt', 'a4');
             pdf.canvas.height = 72 * 11;
             pdf.canvas.width = 72 * 8.5;
             html2pdf(document.getElementById('orderListTable'), pdf, function(pdf){
             pdf.output('dataurlnewwindow');
             });*/

            //var pdf = new jsPDF(),
            //    source = document.getElementById('orderListTable');

            /*pdf.addHTML(
             source, 0, 0, {
             pagesplit: true
             },
             function(dispose){
             //pdf.save('orderList.pdf');
             pdf.output('dataurlnewwindow');
             }
             );*/

            var doc = new jsPDF();
            doc.text("Order History", 14, 16);
            var elem = document.getElementById('ordersTable');
            var res = doc.autoTableHtmlToJson(elem);
            doc.autoTable(res.columns, res.data, {startY: 20});
            doc.output('dataurlnewwindow');
            /*
             pdf.addHTML(source, 20, 20, {pagesplit: true}, function(dispose){
             //pdf.save('orderList.pdf');
             pdf.output('dataurlnewwindow');
             }
             );*/
        };

        $scope.printableView = function(divId) {
            var printContents = document.getElementById(divId).outerHTML;
            var popupWin = window.open('', '_blank', 'width=500,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="assets/css/printFriendlyView.css" /></head><body onload="window.print()"><h2>Order History</h2>' + printContents + '</body></html>');
            popupWin.document.close();
        };

    });