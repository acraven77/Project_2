//I wanted to create this in vanilla JavaScript. So there might be a better way of writing the code
//however, it works. I understand with jquery I could have saved a several of lines of code.


var studentItem = document.getElementsByClassName('student-item');
var studentUl = studentItem[0].parentNode;
var studentName = document.getElementsByTagName('h3');
var studentEmail = document.getElementsByClassName('email');
var studentShow = [];
var studentAll = [];
var studentNameArr = [];


//I used 3 arrays one for only showing students or searched students. One for all students because
//once removed from the dom I needed to be able to add them back. The third for searching by
//NAME or EMAIL ADDRESS becuase that was specific in the extra credit, I didn't know how to search
//by element inside of an array. I guess I could have built an object array with the different
//properties.
  for (var i = 0; i < studentItem.length; i++) {
    studentShow.push(studentItem[i]);
    studentAll.push(studentItem[i]);
    studentNameArr.push(studentName[i].innerText + " " + studentEmail[i].innerText);
  }


//Function to remove all students from the dom.
  function removeAll() {
      while (studentUl.firstChild) {
        studentUl.removeChild(studentUl.firstChild);
      }
  }
  removeAll();


//Function that creates and appends the pagination elements... pretty straight forward.
  function createPagination() {
    removeAll();
    var numOfPages = (studentShow.length / 10) + 1;
    var pageDiv = document.getElementsByClassName('page')[0];
    var createDiv = document.createElement('div');
    var createUl = document.createElement('ul');

    createDiv.className = 'pagination';
    createUl.id = 'paginationUl';
    pageDiv.appendChild(createDiv);
    createDiv.appendChild(createUl);

    for (var i = 1; i < numOfPages; i++) {
      var createLi = document.createElement('li');

      createLi.id = 'liNum' + i;

      var createAnchor = document.createElement('a');

      createAnchor.href = '#';
      createAnchor.id = 'pageNum' + i;
      createAnchor.innerText = i;
      createUl.appendChild(createLi);
      createLi.appendChild(createAnchor);
    }
  }
  createPagination();


//Function to add search box and button. Route button click to search function.
  function createSearchBar() {
    var headerDiv = document.getElementsByClassName('page-header')[0];
    var createDiv = document.createElement('div');
    var createInput = document.createElement('input');
    var createButton = document.createElement('button');

    createDiv.className = "student-search";
    createInput.placeholder = "Search for students...";
    createInput.id = 'buttonInput';
    createInput.type = 'text';
    createButton.innerText = "Search";

    headerDiv.appendChild(createDiv);
    createDiv.appendChild(createInput);
    createDiv.appendChild(createButton);

    var button = document.getElementsByTagName('button')[0];
    button.addEventListener("click", function() {
      search();
    });
  }
  createSearchBar();


//Function to create or remove pagination links at bottom of page. Also maps showPage function
//to the links and sends the page element(this) with it as an argument to the showPage function.
  function paginationLinks(remove) {
  var paginationUl = document.getElementById('paginationUl');
  var page = document.getElementsByClassName('page')[0];
  var pagination = document.getElementsByClassName('pagination')[0];

    if (remove) {
      page.removeChild(pagination);

    } else {
        for (var i = 0; i < paginationUl.children.length; i++) {
          paginationUl.children[i].addEventListener("click", function() {
            showPage(this);
          });
      }
    }
  }
  paginationLinks();


//Use this variable for the first page shown when showPage function is called. This is needed becuase
//on the first page load a link is not being clicked and showPage is looking for an element(this). Also
//when search is clicked with no value the showPage function needs an element to reference as 'this'.
  var liNum = document.getElementById('liNum1');

//Function to show which students correspond with the link clicked 1-10, 11-20 etc...
//It also sets the link clicked class name to active.
  function showPage(element) {
      removeAll();
      var active = document.getElementsByClassName('active');

      //pageNumber takes the innerText and multiplies by 10 then subtracts 10 to get a starting student
      //number. Have to do it this way becuase if link #2 was clicked it would start with showing
      //student #2.
      var pageNumber = parseInt(element.children[0].innerText) * 10 - 10;

      //lastPage variable calculates how many students are on the last page. This is needed because
      //if not there is a console error when the last page is being show due to the appendChild
      //trying to append students that are not there.
      var lastPage = studentShow.length - pageNumber;

      //appending students with 10 students on the page. Else it will only append exaclty how many
      //students are left.
        if (lastPage > 9) {
          for (var i = pageNumber; i < pageNumber + 10; i++) {
            studentUl.appendChild(studentShow[i]);
          }
        } else {
            for (var x = pageNumber; x < pageNumber + lastPage; x++) {
                studentUl.appendChild(studentShow[x]);
            }
          }

        //clearing active class from previous page clicked..
        for (var y = 0; y < active.length; y++) {
              active[y].className = '';
        }

        //setting class to active on last link clicked.
        element.children[0].className = 'active';
  }
  showPage(liNum);


//function for error message if no students are found.
  function message() {
    var page = document.getElementsByClassName('student-list')[0];
    var message = document.createElement('h4');

      page.appendChild(message);
      message.innerText = 'Sorry we could not find anyone by that name or email address. Please try your search again!';
  }


//Function for searching students.
  function search() {
    var buttonInput = document.getElementById('buttonInput');
    var pagination = document.getElementsByClassName('pagination')[0];
    var foundName = '';
    studentShow = [];
    removeAll();

    //if pagination links are in the dom then they are removed to make room for the new pagination
    //links once created.
      if (pagination) {
        paginationLinks(true);
      }

      //If no value is entered then all students are shown and new pagination is created and added.
      if (!buttonInput.value) {
        for (var i = 0; i < studentAll.length; i++) {
          studentShow.push(studentAll[i]);
        }
        createPagination();
        paginationLinks();

        //This needed to be declared again becuase it is already set as active and if not the class
        //will not be set once everything is recreated. Might be a better(dry) way of doing this.
        var liNum = document.getElementById('liNum1');
        showPage(liNum);
      }

      //If there is a value entered in the search bar then the value is searched in the student name
      //and email array. If a value is matched then it is added to the show array from the ALL
      //students array and foundName is set to true.
      if (buttonInput.value) {
        for (var x = 0; x < studentNameArr.length; x++) {
          if (studentNameArr[x].match(buttonInput.value.toLowerCase())) {
            foundName += true;
            studentShow.push(studentAll[x]);
          }
        }
      }

      //If a name is found then everything is re-created. Agian there might be a better way(dry)
      //instead of calling the same functions multiple times in this one function(search) but I am
      //not quite sure what that would be..??? If no match is found then the 'sorry' message is displayed.
      if (foundName) {
        createPagination();
        paginationLinks();
        var liNum = document.getElementById('liNum1');
        showPage(liNum);

      } else if (buttonInput.value && !foundName) {
          var liNum = document.getElementById('liNum1');
          message();
          }
  }

function test() {
    alert("yo bro");
  }

  test();
