
  //I think it would be better "more stable" to getElementById instead of className with index # because
  //classes could change or index position. I wasn't sure if we can/should add to the html, or just use what is there.
  var studentItemLi = document.getElementsByClassName('student-item');
  var hideStudentArray = [];
  var numOfPages = (studentItemLi.length / 10) + 1;
  var showPage = 0;
  var searchStudents = document.getElementsByTagName('h3');
  var searchArr = [];
  // var hideAll = studentItemLi[i].style.display = "none";

for (var i = 0; i < searchStudents.length; i++) {
  searchArr.push(searchStudents[i].innerText);
}


function hideAll() {
  for (var i = 0; i < studentItemLi.length; i++) {
    studentItemLi[i].style.display = "none";
    }
  }
  hideAll();

//Create search bar and append to header
function createSearchBar() {
  //Get div that contains header
  var headerDiv = document.getElementsByClassName('page-header')[0];
  //Create div to append to header
  var createDiv = document.createElement('div');
  //Create input for search box
  var createInput = document.createElement('input');
  //Create search button
  var createButton = document.createElement('button');

  //Add class to newly created div
  createDiv.className = "student-search";
  //Add the placeholder text to the search input
  createInput.placeholder = "Search for students...";
  //
  createInput.id = 'buttonInput';
  //
  createInput.type = 'text';
  //Add the text search to the button
  createButton.innerText = "Search";
  //Append the div to the header div
  headerDiv.appendChild(createDiv);
  //Append the new search input
  createDiv.appendChild(createInput);
  //Append the search button
  createDiv.appendChild(createButton);
}
  //Run the function, if JS is not installed/blocked then the search bar will not show up. (Unobstrusive JavaScript)
  createSearchBar();



function createPagination(pageNum) {
  //Get div that contains main page to create pagination in
  var pageDiv = document.getElementsByClassName('page')[0];
  //Create div to house pagination
  var createDiv = document.createElement('div');
  //Create Ul for page
  var createUl = document.createElement('ul');
  //Add class to newly created div
  createDiv.className = "pagination";
  //
  createUl.id = "paginationUl";
  //Append the div to the header div
  pageDiv.appendChild(createDiv);
  //
  createDiv.appendChild(createUl);

  for (var i = 1; i < pageNum; i++ ) {
    //Create Li for page
    var createLi = document.createElement('li');
    //Create anchor link for page
    var createAnchor = document.createElement('a');
    //Add the href location
    createAnchor.href = "#";
    //Add the text with correct page number
    createAnchor.innerText = i;
    //
    createUl.appendChild(createLi);
    //
    createLi.appendChild(createAnchor);
  }
}
  //Run the function, if JS is not installed/blocked then the search bar will not show up. (Unobstrusive JavaScript)
  createPagination(numOfPages);



 var showStudent = function() {
   hideAll();
   var pageNumber = parseInt(this.children[0].innerText) * 10 - 10;
   var active = document.getElementsByClassName('active');
    for (var i = pageNumber; i < pageNumber + 10; i++ ) {
      studentItemLi[i].style.display = "";
    }
    for (var i = 0; i < active.length; i++) {
      active[i].className = '';
    }
      this.children[0].className = 'active';
}



var paginationUl = document.getElementById('paginationUl');

  for (var i = 0; i < paginationUl.children.length; i++) {
    paginationUl.children[i].onclick = showStudent;
}


var search = function() {
  console.log('Searching...');
  hideAll();
  for (var i = 0; i <= searchArr.length; i++) {
    if (searchArr[i].match(buttonInput.value)) {
      studentItemLi[i].style.display = "";
    }
  }

  //  var searchLoop = searchArr.indexOf(buttonInput.value);
  //  var buttonValue = '/' + buttonInput.value + '/';



 }


// var search = function() {
//   console.log('Searching...');
//    var searchLoop = searchArr.indexOf(buttonInput.value);
//     hideAll();
//
//     for (var i = 0; i <= searchArr.length; i++) {
//       if (buttonInput.value === searchArr[i]) {
//         studentItemLi[i].style.display = "";
//
//       }
//  }
//  }

var buttonInput = document.getElementById('buttonInput');
var button = document.getElementsByTagName('button')[0];

button.onclick = search;











    //On page refesh or on page load
