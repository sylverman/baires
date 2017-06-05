$('#profilePicture').click(function(e){
  $('#menu').toggle('fast');
  e.stopPropagation();
});
$('body').click(function() {
   $('#menu').hide('fast');
});
$('#filterBy li').click(function(){
  $('#filterBy li').removeClass('selected');
  $(this).addClass('selected');
  $('#mainContent article').fadeOut();
  if($(this).attr('data-media-filter') == 'all'){
    $('#mainContent article').fadeIn();
  } else {
    $('#mainContent article[data-media='+$(this).attr('data-media-filter')+']').fadeIn();
  }
});
$('#changeView li').click(function(){
  if(this.className != 'selected') {
    $('#changeView li').removeClass('selected');
    $(this).addClass('selected');
    $('#mainContent').fadeOut('slow', function(){
      $(this)
        .toggleClass("mosaic")
        .toggleClass('list')
        .fadeIn('slow');
    });
  }
});
$('#createUserBtn').click(function(e){
  e.stopPropagation();
  $('#createUser').modal();
});
$('#newUserEmail').keyup(function(){
  if(this.value.length > 5){
    $.ajax({
      url: "https://bpi.briteverify.com/emails.json?address="+this.value+"&apikey=07422695-8c01-4822-a418-9a17fe71f330",
      type: "GET",
      dataType: 'jsonp',
      xhrFields: {
        withCredentials: true
     }
    }).done(function(data) {
      //console.log(data.status);
      if(data.status === "invalid"){
        $('#newUserSubmit').attr('disabled', 'disabled');
        $('#emailValidationMessage')
          .removeClass("successMessage")
          .addClass("errorMessage")
          .text("✗ Please enter a valid email");
      } else if (data.status === "unknown" || data.status === "acceptall" || data.status == "accept all") {
        $('#newUserSubmit').removeAttr('disabled');
        $('#emailValidationMessage')
          .removeClass("errorMessage")
          .addClass("successMessage")
          .text("Unable to validate this account");
      } else {
        $('#newUserSubmit').removeAttr('disabled');
        $('#emailValidationMessage')
          .removeClass("errorMessage")
          .addClass("successMessage")
          .text("✓ This email account is valid");
      }
    });
  }
});
$('#newUserSubmit').click(function(e){
  if (validateUserForm().valid === true) {
    $('#emailValidationMessage')
      .removeClass("errorMessage")
      .addClass("successMessage")
      .text("✓ The user has been succcessfully created");
      $('#newUserFirstName').val('');
      $('#newUserLastName').val('');
      $('#newUserEmail').val('');
  } else {
    $('#emailValidationMessage')
      .removeClass("successMessage")
      .addClass("errorMessage")
      .text(validateUserForm().errorMessage);
  }
});
var validateUserForm = function(){
  if($('#newUserFirstName').val() == ""){
    message = "Please enter the first name";
  } else if ($('#newUserLastName').val() == ""){
    message = "Please enter the last name";
  } else if($('#newUserEmail').val() == ""){
    message = "Please enter an email address";
  } else {
    return {
      valid: true
    }
  }
  return {
    valid: false,
    errorMessage: message,
  }
}
