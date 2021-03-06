  var user_signed_in = false;
  var global_user_name = "";
  var global_user_pic = "";
  var searchQ = window.location.href.slice(window.location.href.indexOf('?') + 1);

  //google sign in code
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var profileImg = profile.getImageUrl();

    var tag = '<img src="'+ profileImg + '"style= "border-radius: 50%; width:60px"></img>';
    global_user_pic = '<img src="'+ profileImg + '"style= "border-radius: 50%; width:10px"></img>';
  
  var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);

        if(profile === undefined){
          console.log("user not signed in, no info to return");
        
        }else{
          console.log("hey hey hey "+profile.getId());
          $("#signOutButton").html("Sign Out");

          $("#signOutButton").show();
          $("#profilePic").show();
          $("#profilePic").html(tag);
          $("#signInButton").hide();
          
          // posts is what the user profile gets appended to
          var posts = '<div id = "container">';
          
          var section1 = '<div class="row"><div class="col-sm-3"><div class="card"><div class="card-body">' + tag;
          var section2 = '<h5 class="card-title">'+searchQ+'</h5><p class="card-text"><a href="http://danu7.it.nuigalway.ie:8620/allUsers">All Users</a><br><a href="http://danu7.it.nuigalway.ie:8620/chat">Chat</a>';
          var section3 = '</p>';
          var section4 = '';

          var section5 = '</div></div></div><div class="col-sm-4"><div class="card"><div class="card-body"><h5 class="card-title">';
          var section6 = 'My Current Reading List</h5><p class="card-text">';
          var booksReading = '';
          var section7 = '</p>';
          var section8 = '';
          var section9 = '</div></div></div>';

          var section10 = '<div class="col-sm-4"><div class="card"><div class="card-body"><h5 class="card-title">';
          var section11 =  'Books Completed</h5><p class="card-text">';
          var booksCompleted = '';
          var section12 = '</p>';
          var section13 = '';
          var section14 = '</div></div></div></div>';

          var booksReadingJSON = null;
          var booksCompletedJSON = null;

         
          /*
          posts += '<img src="'+ profileImg + '"style= "border-radius: 50%; width:120px"></img>';

          posts += '<div id="profilePageName"> Name: ' + profile.getName() + '<br>'+
                    'Email: ' + profile.getEmail()

                    + '</div>'+
                  '</div>';
          */
          $.ajax({
            // Finding a user with the same name as profile signed in with
            type: 'GET',
            url: '/getUserDatabase?user_name='+ profile.getName(),
            dataType: 'json',
            success: function(user){
              // Upon success check how many users where in the database with that name

              console.dir('success', user);
              // If its more than one we do not want to add the user
                  if(user.length > 0){
                    console.log("user in database");
                    console.dir(user);


                    if (user[0].to_read_list) {
                     
                      booksReadingJSON = user[0].to_read_list;
                      //console.dir(booksReadingJSON);
                      console.dir(booksReadingJSON);
                      for (var counter=0; counter<booksReadingJSON.length; counter++) {
                        if (booksReadingJSON != null) {

                          var booksReadingP1 = '<div class="row"><div class="col-5"><div id="book_title_link"><img id="book_cover_link" class="img-fluid rounded mb-3 mb-md-0" src="http://covers.openlibrary.org/b/id/';
                          var bookLink = booksReadingJSON[counter].cover_i;
                          var booksReadingP2 = '-M.jpg" alt=""></div></div><div class="col-7"><div id="book_title_link"><h3 id="book_title">';
                          var bookTitle = booksReadingJSON[counter].title_suggest;

                          var booksReadingP3 = '</h3></div><p id="by_word">by </p><h6 id="book_author">';
                          
                          var bookAuthor = booksReadingJSON[counter]['author_name[]'];
                          var booksReadingP4 = ' </h6><br><button type="button" class="btn btn-info rem-book" id="removeBookR'+bookTitle;
                          var deleteButton1 = '">Remove Book</button>';//'<div class="btn btn-warning delete-book" id="deleteBookR>Remove</div>';
                          var booksReadingP5 = '</div></div><hr>';
                          
                          
                      
                          booksReading += booksReadingP1+bookLink+booksReadingP2+bookTitle+booksReadingP3+bookAuthor+booksReadingP4+deleteButton1+booksReadingP5;
                          
                        }
                      }
                    }

                    if(user[0].have_read_list) {
                      booksCompletedJSON = user[0].have_read_list;
                      
                      //console.dir(booksReadingJSON);
                      console.dir(booksCompletedJSON);
                      for (var counter=0; counter<booksCompletedJSON.length; counter++) {
                        if (booksReadingJSON != null) {

                          var booksReadingP1 = '<div class="row"><div class="col-5"><div id="book_title_link"><img id="book_cover_link" class="img-fluid rounded mb-3 mb-md-0" src="http://covers.openlibrary.org/b/id/';
                          var bookLink = booksCompletedJSON[counter].cover_i;
                          var booksReadingP2 = '-M.jpg" alt=""></div></div><div class="col-7"><div id="book_title_link"><h3 id="book_title">';
                          var bookTitle = booksCompletedJSON[counter].title_suggest;

                          var booksReadingP3 = '</h3></div><p id="by_word">by </p><h6 id="book_author">';
                          
                          var bookAuthor = booksCompletedJSON[counter]['author_name[]'];
                          var booksReadingP4 = ' </h6><br><button type="button" class="btn btn-info rem-book" id="removeBookC'+bookTitle;
                          var deleteButton2 = '">Remove Book</button>';
                          var booksReadingP5 = '</div></div><hr>';

                          
  
                          booksCompleted += booksReadingP1+bookLink+booksReadingP2+bookTitle+booksReadingP3+bookAuthor+booksReadingP4+deleteButton2+booksReadingP5;
                          
                        }
                      }

                     
                    }
                    posts += section1+section2+section3+section4+section5+section6+booksReading+section7+section8+section9+section10+section11+booksCompleted+section12+section13+section14;
                    
                    user_signed_in = true;
                    global_user_name = profile.getName();
                  }
                  else{
                    //if it is less than 1 we want to add the user
                    console.log(user[0]);
                    console.log("user not in database");

                    // Adding the user
                    $.ajax({
                      url: '/addUserDatabase/',
                      type: 'POST',
                      dataType: 'json',
                      data: {user_name: profile.getName(), profile_pic: profile.getImageUrl()},
                      success: function(data){
                          console.log("added the user "+data);
                          console.log(data.user_name);
                          console.log(name);

                      },
                      error: function(error){
                          console.log("error saving order "+error);
                      }
              });
                  }
                  $("#profilePagePic").html(posts);
                  
                  $(".rem-book").click(function(event) {

                    var whichList = event.target.id.substring(0, 11);
                    var bookTitle = event.target.id.substring(11, event.target.id.length);
                    if (whichList == "removeBookR") {
                      console.log(whichList);
                      console.log(bookTitle);

                      $.ajax({
                        url: '/deleteBook/:'+global_user_name  +'/:'+whichList+'/:'+bookTitle,
                        type: 'POST',
                        dataType: 'json',
                        
                        success: function(data){
                          
                          console.log("Updated list!");
                        },
                        error: function(error){
                            console.log("Didn't work");
                          }
                        });

                    }
                    else {

                      console.log(whichList);
                      console.log(bookTitle);

                      $.ajax({
                        url: '/deleteBook/:'+global_user_name+'/:'+whichList+'/:'+bookTitle,
                        type: 'POST',
                        dataType: 'json',
                        
                        success: function(data){
                          
                          console.log("Updated list!");
                        },
                        error: function(error){
                            console.log("error saving order "+error);
                                }
                        });
                    }
                    window.open("/User?"+searchQ,"_self");
                  });
            },
            error: function(){
                console.log('error on chat page function');
            }
        });
        }
  }





  function getComments() {
    console.log("Getting comments");
    $.ajax({
        url: '/getComments?user_name='+searchQ,
        type: 'GET',
        success: function (data) {
            var comments = "";
            try {
              console.dir(data[0].comment);
              for (var i = 0; i < data[0].comment.length; i++) {
                  comments += "<div class='row justify-content-md-center pt-4'>" +
                      "<div class='card col-12'><div class='row'>"
                      + "<div><span style='font-weight:bold'>"+ data[0].comment[i].user_name + "</span> : " + data[0].comment[i].comment + "</div>" + "</div></div></div>";
                  console.dir("this is a comment: " + data[0].comment[i].comment);
              }
            }catch(e) {}
            console.log("testing here "+ comments);
            $("#commentSection").html(comments);
        }
    });
}

  function postComment(){
    console.log("press button");   
    console.log("this is me:"+searchQ);    
    $.ajax({
        url: '/addComment?user_name='+searchQ,
        type: 'POST',
        data: {user_name:global_user_name,comment:$('#inputPost').val()},
        success: function (data) {
          getComments();
        }
    });

  }
  $(document).ready(
    
    function(){
      var totalCharacters = 300;

      $("#inputPost").keyup(function (event) {
      console.log("im typing");

        var inputText = event.target.value;
        $("#charRemaining").html(totalCharacters - inputText.length);
    });
    getComments();

    }
  )
 
    /**
     * Event handler for when the user posts a comment
     */
    $("#postBtn").click(function (event) {            
        $.ajax({
            url: '/addComment/',
            type: 'POST',
            data: {user_name:profile.getName(), comment:$('#inputPost').val()},
            success: function (data) {
                // getComments();
            }
        });
    });



    
  function returnInfoToScreen(){
    
    const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
  const profile = googleUser.getBasicProfile();
 
    
  }
  

  //google sign out code
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      $("#signOutButton").hide();
      $("#profilePic").hide();
      $("#signInButton").show();

    });
  }



  
  