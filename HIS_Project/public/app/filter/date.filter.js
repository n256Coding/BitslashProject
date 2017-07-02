/**
 * Created by Nishan on 6/29/2017.
 */
'use strict';

appModule.filter('orderDateFilter', function ($filter) {
    return function (items, selectedDate) {
        if(selectedDate == undefined){
            return items;
        }
        var output = [];
        angular.forEach(items, function(item){
        //console.log('item.order_date: '+item.order_date+', selectedDate: '+selectedDate);
            if ($filter('date')(item.order_date, "dd-MM-y").includes(selectedDate.toString())) {
                output.push(item);
            }
        });
        return output;
    }
});