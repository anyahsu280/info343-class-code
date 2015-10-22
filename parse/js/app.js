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

    var tasksList = $('#tasks-list');           //reference to task list element
    var errorMessage = $('#error-message');     //reference to error message alert
    var tasks = [];                             //current set of tasks

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
           $(document.createElement('li'))
               .text(task.get('title'))
               .appendTo(tasksList);
        });
    }

    $('#new-task-form').submit(function(evt) {       //when the user submits the new task form
        evt.preventDefault();                       //don't want browser to refresh

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);                   //set title property = title typed into input box
        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val('');
        });

        return false;
    });

    fetchTasks();                                   //go and getch tasks from Parse

    window.setInterval(fetchTasks, 3000);        //that # is in milliseconds to refresh
});