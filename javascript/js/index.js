/**
 * application script for index.html
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';                                                   //use this in all functions to save your life

    function forEachElement(collection, fn) {
        var idx;
        for (idx = 0; idx < collection.length; idx++) {
            fn(collection[idx]);                                    //can use this over any node list
        }
    }

    var clickMeButton = document.getElementById("click-me");
    clickMeButton.addEventListener('click', function() {
        var alerts = document.querySelectorAll('.alert');
        forEachElement(alerts, function (alert) {
            alert.style.display = 'block';                          //makes the buttons visible again
        })
    })

    var closeButtons = document.querySelectorAll(".alert .close"); //this is an array-like structure
    forEachElement(closeButtons, function(button) {
        button.addEventListener('click', function() {
            button.parentElement.style.display = 'none';            //hides the buttons
        })
    })

});