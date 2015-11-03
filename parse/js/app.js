/*
    script for the index.html file
*/

<<<<<<< HEAD
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
=======

//OK to call this before the DOM is ready
Parse.initialize("u8fq2u4IqxKXBa9PuPjHB40HA39gqnxMq8lKJYkG", "R9zpakOjl4dXU3quSQ9tvTwwe0uQA2IJj3GdNKTt");

//when the document is ready...
$(function() {
    'use strict';

    //define a new Task object class with Parse
    var Task = Parse.Object.extend('Task');

    //define a query for querying Task objects
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //varible to hold the current list of tasks
    var tasks = [];

    //reference to our error message alert
    var errorMessage = $('#error-message');

    //reference to the tasks list element
    var tasksList = $('#tasks-list');

    function displayError(err) {
        errorMessage.text(err.message);
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
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

<<<<<<< HEAD
    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)   //after comma is what happens when there's an error
            .always(hideSpinner);
    }

    function onData(results) {
        tasks = results;                            //results is the array of tasks from server
=======
    function onData(results) {
        tasks = results;
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
        renderTasks();
    }

    function renderTasks() {
<<<<<<< HEAD
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
=======
        tasksList.empty();
        tasks.forEach(function(task) {
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    $('#new-task-form').submit(function(evt) {
        //tell the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form 
        //with a name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');
        
        //get the current value
        var title = titleInput.val();

        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
        //so the user can enter the next new task
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
            });

        //some browsers also require that we return false to
        //prevent the default behavior
        return false;
    }); //on new task form submit

    //fetch the tasks to kick everything off...
    fetchTasks();

    //refetch the tasks every so often
    //to get new tasks created by others
    window.setInterval(fetchTasks, 10000);
}); //on doc ready
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
