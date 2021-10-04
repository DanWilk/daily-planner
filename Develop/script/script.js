var counter = 0
//
//
//
$('#currentDay')
.text(moment().format('ddd, MMM Do YYYY'));

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
    
    console.log(time);
};
  
  
$('.set').each(function(index, el) {
    auditTask(index, el);

});
//
//
//
$('.col-10').on('click', 'p', function(){
    var text= $(this)
    .text()
    .trim();
  
    var textInput = $('<textarea>')
    .val(text)
    .attr('data-hello', counter)
    
    var close = $(this).closest('.row')

    var sample = close.children('.button-selector')

    var sample2 = sample.children('button')

    sample2.attr('data-selector', counter)
    
    $(this).replaceWith(textInput);
    textInput.trigger('focus');

    counter++
  });

  $('.btn').on('click', function() {
    var done = $(this).attr('data-selector')
    
    var text = $('textarea[data-hello="' + done + '"]')
    .val()
    .trim();

    console.log($(this))

    var done = $(this).attr('data-selector')

    console.log(done)
    //var choice = $('.btn').closest('.row');

    //var replace = choice.children().children('.form-control');
    //var status = $('#btn')
    //.closest('p')
  
    //var index = $('.col-10')
    //.closest('.list-group-item')
    //.index();
  
    //tasks[status][index].text = text;
    //saveTasks();
  
    var taskP = $('<p>')
    .addClass('m-1')
    .text(text);
  
    $('textarea[data-hello="' + done + '"]').replaceWith(taskP);
  })