var events = [];
var counter = 0;


// change colors based on hour
var findDay = function () {
    $('#currentDay')
    .text(moment().format('ddd, MMM Do YYYY'));
}

var auditTask = function(index, taskEl) {
    var time = $(taskEl).attr('data-hour');
    
    var hour = moment(time, 'HH');
  
    $('#' + index).removeClass('past present future')
    
    if (moment().isSame(hour, 'hour')) {
        $('#' + index).addClass('present');
    }
    else if (moment().isAfter(hour, 'hour')) {
        $('#' + index).addClass('past');
    }
    else if (moment().isBefore(hour)) {
        $('#' + index).addClass('future');
    }
};
  
  
$('.set').each(function(index, el) {
    auditTask(index, el);

});

$('.col-md-10').on('click', function(){
    var text= $(this)
    .text()
    .trim();
  
    var textInput = $('<textarea>')
    .val(text)
    .attr('data-hello', counter);
    
    var close = $(this).closest('.row');

    var sample = close.children('.button-selector');

    var sample2 = sample.children('button');

    sample2.attr('data-selector', counter);

    var replaced = close.find('.text-area');

    replaced.replaceWith(textInput);
    textInput.trigger('focus');

    counter++;
  });

  $('.btn').on('click', function() {
    var done = $(this).attr('data-selector');
    
    var text = $('textarea[data-hello="' + done + '"]')
    .val()
    .trim();

    var done = $(this).attr('data-selector');
  
    var taskP = $('<div>')
    .addClass('m-1')
    .text(text)
    .addClass('text-area');
  
    $('textarea[data-hello="' + done + '"]').replaceWith(taskP);

    saveToStorage()
  });

  var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
  };

var saveToStorage = function() {
    tempArr = [];
    for (let index = 0; index < 9; index++) {
            var text = $('.container')
              .find('#' + index)
              .text()
              .trim();

            tempArr.push({
                text: text
            });
    }

    events = tempArr;

    saveEvents()
}
var loadEvents = function() {
    events = JSON.parse(localStorage.getItem("events"))
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!events) {
      events = [];
    }

    for (index = 0; index < events.length; index++) {
        var text = events[index].text;
        
        var choice = $('#' + index)
        .find('div');

        choice.text(text);

    }
}
   
findDay();
loadEvents();

setInterval(function() {
    auditTask();
  }, 30000);

  setInterval(function() {
    findDay();
  }, (1000 * 60) * 60);