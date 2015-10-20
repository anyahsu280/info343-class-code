/**
 * application script for the states.html
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function addStates(states, listElem) {
        listElem.innerHTML = '';                            //clears current list
        states.forEach(function(state) {
            //console.log(state);
            var li = document.createElement('li');
            li.textContent = state.name;                    //
            listElem.appendChild(li);                        //adds new child element to parent
        });
    }

    var statesFilter = document.getElementById('state-filter-field');
    statesFilter.addEventListener('keyup', function() {
        var filter = this.value.toLowerCase();               //value of current filter (whatever's typed in the box) to lower case
        //console.log(filter);                                      //fills console with what's typed in the box
        var filteredStates = usaStates.filter(function(state) {     //sees is current state should be included in filter (T/F)
            return state.name.toLowerCase().indexOf(filter) >= 0;         //
        });
        addStates(filteredStates, statesUl);
    });

    var statesUl = document.getElementById('states-list');
    addStates(usaStates, statesUl); //generates the content (states list) based on data
});