// Waiting for the DOM to finish loading
$(document).ready(function(){
 
  var contacts = [];
  var count = 0;

  //implimenting Alpha choose. You can use ACSII numbers for letters and creat a look that 
 
  var deleteContact = function(event){
    console.log("Delete", this);
    $(this).parents(".contact").remove();
  };
 
  var editContact = function(event){
    var $contact = $(this).parents(".contact");
    var $btn = $(this);
    $btn.toggleClass("edit");
    $btn.toggleClass("update");
    $btn.html("SAVE").toggleClass("btn-attention");
    $contact.find(".contact-item").attr("contenteditable", "true");

    //Deal with contact img
    var $contactImg = $contact.find("#contact-img");
    var src = $contactImg.attr("src");
    var $imgCon = $contact.find(".contact-img-con")
    $imgCon.empty();
    $imgCon.attr("contenteditable", "true");
    $imgCon.html(src);
   
  };
 
  var updateContact = function(event){
    var $contact = $(this).parents(".contact");
    var $btn = $(this);
    $btn.toggleClass("edit");
    $btn.toggleClass("update");
    $btn.html("Edit").toggleClass("btn-attention");
    $contact.find(".contact-item").attr("contenteditable", "false");
    
    var name = $contact.find(".contact-name").first().html();
    var email = $contact.find(".contact-email").first().html();
    var number = $contact.find(".contact-number").first().html();
   
    var $imgCon = $contact.find(".contact-img-con");
    var imgUrl = $imgCon.first().html();
    $imgCon.empty();
    $imgCon.append( "<img id='contact-img' src='" + imgUrl + "' class='contact-img'>");
    $imgCon.attr("contenteditable", "false");
  };
  
  $("#contacts").on("click", ".delete", deleteContact);
 
  $("#contacts").on("click", ".edit", editContact);
  
  $("#contacts").on("click", ".update", updateContact);
 
  var addContact = function(newContact){
    var contactString = ["<div id='", newContact.id, "' class='contact'>",
                            "<div>",
                              "<img src='", newContact.imgUrl, "' class='contact-img'>",
                            "</div>",
                            "<div class='contact-item'>", newContact.name, "</div>",
                            "<div class='contact-item'>", newContact.email, "</div>",
                            "<div class='contact-item'>", newContact.number, "</div>",
          
                            "<div class='contact-actions'>",
                              "<span class='edit btn btn-warning'>Edit</span>",
                              "<span class='delete btn btn-action'>Delete</span>",
                            "</div>",
                          "</div>"].join("");
 
    //console.log(contactString);
 
    $("#contacts").append(contactString);
  
  };
 
  // Now we need to watch for a submit 
  //  event on the form
  $("#new_contact").submit( function(event){
    // Prevent the page from reloading
    event.preventDefault();
 
    //console.log(this);
    var form = $(this);
    var name = $("#contact_name").val();
    var email = $("#contact_email").val();
    var number = $("#contact_number").val();
    var imgUrl =  $("#contact_img_url").val();
 
    //console.log(name, email, number, imgUrl);
    //add ajax post
    $.ajax({
      url: '/contacts',
      method: "POST",
      data: {
        "contact": {
          "name": name,
          "email": email,
          "number": number,
          "imgUrl": imgUrl
        }
      },
      dataType: "json",
      success: function(data) {
        console.log(data);
      },

      error: function(data) {
        console.log("Error: ");
        console.log(data);
      }
    });
    // Reset the form
    this.reset();
 
    // Keeping track of new contacts
    var newContact = { id: count,
                       name: name,
                       email: email,
                       number: number,
                       imgUrl: imgUrl };

    count += 1;
 
    contacts.push(newContact);
    contacts = _.sortBy(contacts, function(contact) {
      return contact.name;
    });

    $("#contacts").html('');

    // Call a function to add our contact to 
    //  the page.
    $.each(contacts, function(index, contact) {
      addContact(contact);
    });
 
  });

  $.get('/contacts.json').done(function(data){
    contacts = data
    contacts = _.sortBy(contacts, function(contact) {
      return contact.name;
    });
    // console.log(_.findWhere(contacts, { name: "Adam"} ));
    $.each(contacts, function(index, contact) {
      addContact(contact);
    });
  });
});







