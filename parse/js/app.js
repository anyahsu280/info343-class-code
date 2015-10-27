/*
    script for the index.html file
*/

Parse.initialize("l4bWhRLXH442qPkevDSfovHe8Y1mIHsT0Ywqzn6L", "mh7FgJDM6ofHYZmJmA8aJjZU0Lr46m4lVhwsGvWD");
//this identifies the key to your application; "parse" is a global variable

$(function() {
    'use strict';

    //new Task class for parse
    var Task = Parse.Object.extend('Task');      //uppercase "Task" bc its like a class
    var tasksQuery = new Parse.Query(Task);      //lets you get many obj at same time; returns all tasks ordered by createAt
    tasksQuery.ascending('createdAt');           //organizes by when it was created
    tasksQuery.notEqualTo('done', true);

    var tasksList = $('#tasks-list');           //reference to task list element
    var errorMessage = $('#error-message');     //reference to error message alert
    var tasks = [];                             //current set of tasks

    var ratingElem = $('#rating');

    function displayError(err) {
        errorMessage.text(err.message);         //.text doesn't interpret what you pass to it as HTML
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)   //after comma is what happens when there's an error
            .always(hideSpinner);
    }

    function onData(results) {
        tasks = results;                            //results is the array of tasks from server
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();            //clear ul before we add stuff to it
        tasks.forEach(function(task) {
           var li = $(document.createElement('li'))
               .text(task.get('title'))
               .addClass(task.get('done') ? 'completed-task' : '')      //if done task is true, does the next thing; an if/else statement (turnary expression); adds style class to what we're doing
               .appendTo(tasksList)
               .click(function() {
                   task.set('done', !task.get('done'));         //toggles the done property
                   task.save().then(renderTasks, displayError);
               });
            $(document.createElement('span'))
                .raty({readOnly: true,
                    score: (task.get('rating') || 0), //handles undefined case to be 0 stars
                    hints: ['crap', 'awful', 'ok', 'nice', 'awesome']})     //words for when you hover
                .appendTo(li);
        });
    }

    function showMessage(message) {
        message = message || 'Hello';
        alert(message);
    }

    //showMessage('World');

    $('#new-task-form').submit(function(evt) {       //when the user submits the new task form
        evt.preventDefault();                       //don't want browser to refresh

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);                   //set title property = title typed into input box
        task.set('rating', $('#rating').raty('score'));

        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val('');
            ratingElem.raty('set', {});
        });

        return false;           //to prevent default behavior
    });

    fetchTasks();                                   //go and getch tasks from Parse

    //enables the star rating UI element
    ratingElem.raty();

    window.setInterval(fetchTasks, 10000);        //that # is in milliseconds to refresh
});