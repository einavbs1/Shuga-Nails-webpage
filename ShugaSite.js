//---------------------------section1-----------------

//This section is function to nail page (ShugasCourses.html)

//generateText function: function to verify input entered by the user in ShugasCourses.html browser
function generateText() {
	event.preventDefault(); // Prevent default form submission behavior learned with w3schools

    var name_c = document.getElementById('fname').value;
    var lastName_c = document.getElementById('lname').value;
    var Phonenumberf_c = document.getElementById('phonenum').value;
    var Phonenumbers_c = document.getElementById('sevendigitsnum').value;

    var Gelforstarters_c = document.getElementById('Gelforstarters').checked;
    var Gelhours_c = document.getElementById('Gelforstartershours').value;

    var NailsDecorations_c = document.getElementById('NailsDecorations').checked;
    var NailsDecorationsshours_c = document.getElementById('NailsDecorationsshours').value;

    var Nailforms_c = document.getElementById('Nailforms').checked;
    var Nailsformshours_c = document.getElementById('Nailsformshours').value;

    var Levelupcourse_c = document.getElementById('Levelupcourse').checked;
    var leveluphours_c = document.getElementById('leveluphours').value;

    var alertMsg_c = "";
	
	var coursechoices = checkCourses() ;

    if (name_c.trim() == '') {
        alertMsg_c = alertMsg_c + "Please enter your first name.\n";
    }
    if (lastName_c.trim() == '') {
        alertMsg_c = alertMsg_c + "Please enter your last name.\n";
    }
    if (Phonenumberf_c == 'empty' || Phonenumbers_c.trim() == '') {
        alertMsg_c = alertMsg_c + "Please enter your phone number.\n";
    }
	if (!/^\d{7}$/.test(Phonenumbers_c.trim())) {
        alertMsg_c = alertMsg_c + "Phone number should contain only 7 digits.\n";
    }
    if (Gelforstarters_c && Gelhours_c == 'empty') {
        alertMsg_c = alertMsg_c + "\nPlease choose the course hours for Gel menicor.";
    }
    if (NailsDecorations_c && NailsDecorationsshours_c == 'empty') {
        alertMsg_c = alertMsg_c + "\nPlease choose the course hours for Gel decorations.";
    }
    if (Nailforms_c && Nailsformshours_c == 'empty') {
        alertMsg_c = alertMsg_c + "\nPlease choose the course hours for Nail forms.";
    }
    if (Levelupcourse_c && leveluphours_c == 'empty') {
        alertMsg_c = alertMsg_c + "\nPlease choose the course hours for level up course.";
    }
    if (!Levelupcourse_c && !Nailforms_c && !NailsDecorations_c && !Gelforstarters_c) {
        alertMsg_c = alertMsg_c + "\nPlease choose at least one course.";
    }
    if (alertMsg_c.trim() == '') {
        var textForDisplay_c = "Hello " + name_c + ' ' + lastName_c + "!</br>Thank you for choosing Shuga's course.</br>" + "Your request has been processed and you will receive approval for the course soon! </br>";
        document.getElementById('SentFormMessage').innerHTML = textForDisplay_c;
        var fullNum_c = Phonenumberf_c + Phonenumbers_c + 'c'; //var for the full phone number (it'll be the key value)
		//we are adding another char to fullNum_c to separte our keys in local storage.
        CourseInfo(fullNum_c, name_c, lastName_c, coursechoices); //sending the data to processs and storage
    } else {
        alert(alertMsg_c);
    }
}






//cleanFormCourse function: cleaning all fields in ShugasCourses.html browser (Course browser)
function cleanFormCourse(){
//additional clean form for course form.
	document.getElementById('fname').value = '';
	document.getElementById('lname').value = '';
	document.getElementById('phonenum').value = 'js';
	document.getElementById('sevendigitsnum').value = '';
    document.getElementById('Gelforstarters').checked = false;
	document.getElementById('Gelforstartershours').value = 'js';
	document.getElementById('NailsDecorations').checked = false;
	document.getElementById('NailsDecorationsshours').value = 'js';
	document.getElementById('Nailforms').checked = false;
	document.getElementById('Nailsformshours').value = 'js';
	document.getElementById('Levelupcourse').checked = false;
	document.getElementById('leveluphours').value = 'js';
}


 
//This function is adding to ARR which course has been selected and the hours in ShugasCourses.html
function checkCourses(){
    var courseArr = [];

    if (document.getElementById('Gelforstarters').checked) {
		if(document.getElementById('Gelforstartershours').value){
			courseArr.push(document.getElementById('Gelforstarters').value);
			courseArr.push(document.getElementById('Gelforstartershours').value);
		}
    }
    if (document.getElementById('NailsDecorations').checked) {
		if(document.getElementById('NailsDecorationsshours').value){
			courseArr.push(document.getElementById('NailsDecorations').value);
			courseArr.push(document.getElementById('NailsDecorationsshours').value);
		}
    }
	if (document.getElementById('Nailforms').checked) {
		if(document.getElementById('Nailsformshours').value){
			courseArr.push(document.getElementById('Nailforms').value);
			courseArr.push(document.getElementById('Nailsformshours').value);
		}
    }
	if (document.getElementById('Levelupcourse').checked) {
		if(document.getElementById('leveluphours').value){
			courseArr.push(document.getElementById('Levelupcourse').value);
			courseArr.push(document.getElementById('leveluphours').value);
		}
	
    }
   
    return(courseArr);
}




//getAllBookingscourses function: gettting all the bookings from the localStorage (using getbookingsDb func) and printing them in the administrator page
//we are printing only the courses forms.
function getAllBookingscourses(){
	var bookingsTable_c = getCourseBookingsDb();
	var textPrint_c = '';
	for(i=0; i<bookingsTable_c.length; i++){
		var booking_c = bookingsTable_c[i];
		if(booking_c[0].length > 10){ // our key is with 11 chars.
			var phonenumberstr = booking_c[0].substring(0, booking_c[0].length - 1);
			var fullName_c = booking_c[1].substring(1, booking_c[1].length+6) + ' ' + booking_c[2];
			var ChoiceCources = booking_c[3];
			textPrint_c += fullName_c + ', phone: ' + phonenumberstr; 
			textPrint_c += ', has requested to book an the course: ' + ChoiceCources;
			textPrint_c += '</br>';
		}
	}
	document.getElementById('allcoursesBookings').innerHTML = textPrint_c;
}





//removeBookingfromcourses function: delete a booking from the localStorage, based on the phonenumber_c
//specially removing only course booking.
function removeBookingfromcourses(){
    var CoursePhoneremover = document.getElementById('removeBookingfromcourse').value;
	CoursePhoneremover = CoursePhoneremover + 'c';
    removeBookingfromcoursesDb(CoursePhoneremover);
	getAllBookingscourses(); //update bookings in real time to manager.html.
}


//cleanFormCourse function: cleaning all fields in ShugaSite.html browser (Course browser)
function cleanFormCourse(){
//additional clean form for course form.
	document.getElementById('fname').value = '';
	document.getElementById('lname').value = '';
	document.getElementById('phonenum').value = 'js';
	document.getElementById('sevendigitsnum').value = '';
    document.getElementById('Gelforstarters').checked = false;
	document.getElementById('Gelforstartershours').value = 'js';
	document.getElementById('NailsDecorations').checked = false;
	document.getElementById('NailsDecorationsshours').value = 'js';
	document.getElementById('Nailforms').checked = false;
	document.getElementById('Nailsformshours').value = 'js';
	document.getElementById('Levelupcourse').checked = false;
	document.getElementById('leveluphours').value = 'js';
}



//---------------------------section2------------------------------
// for both sections


// remove spaces before and after str
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

//function when button click its open this html page (our homepage).
function returnToHomePage() {
        window.location.href = 'ShugaHomepage.html';
    }


//---------------------------section3------------------------------
//This section is function to nail page (ShugasTreatment.html)


//verifyInput function: function to verify input entered by the user in ShugasTreatment.html browser and save it in localStorage
function verifyInput(){
	event.preventDefault(); // Prevent default form submission behavior
	
	var name = document.getElementById('fname').value;
	var lastName = document.getElementById('lname').value;
    var areaCode = document.getElementById('areaCode').value;
    var restNum = document.getElementById('restNum').value;
    var day = checkDay();
    var hours = checkHours();
    var treatment = checkTreatment();
	var NewCustomer = checkCustomer();
    var uploadedFile = document.getElementById('uploadedImg');
    var alertMsg = "";

    if((trim(name) == '') || (trim(lastName) == '')) {
		alertMsg = alertMsg + "Please enter a valid information in the name and last name fields.\n";
	}

	if (!/^\d{7}$/.test(restNum.trim())) {
        alertMsg = alertMsg + "Phone number should contain only 7 digits.\n";
    }
	
	if (areaCode == 'empty' || restNum.trim() == '') {
        alertMsg = alertMsg + "Please enter your phone number.\n";
    }

    if (treatment == 'empty'){
        alertMsg = alertMsg + "Please choose treatment.\n";
    }

    if(day == 'empty' ){
        alertMsg = alertMsg + "Please  choose a day.\n";
    }

    if(hours.length === 0 ){
        alertMsg = alertMsg + "Please choose possible hours.\n";
    }

    if(NewCustomer == 'empty'){
        alertMsg = alertMsg + "Please choose costumer status.\n"
    }

    if(NewCustomer == 'New' && !uploadedFile){
        alertMsg = alertMsg + "Please Upload an Image.\n"
    }

    if(alertMsg != '') { //if alertMsg === '' all good. if its not '' theres an input error and the site will alert the user
		alert (alertMsg);
	}


	else {
		var fullName = name + " " + lastName;
		var info = fullName + ", " + areaCode + restNum + ": ";
		document.getElementById('res').innerHTML = info + "Your request is being processed ";
        var fullNum = areaCode + restNum; //var for the full phone number (it'll be the key value)
		//key is diffrent from the courses key to seprate in localstorage.
        processInfo(fullNum, name, lastName, day, hours, uploadedFile); //sending the data to processs and storage
	}
}


//cleanForm function: cleaning all field in ShugasTreatment.html browser (appointment booking brorwser)
function cleanForm(){
	document.getElementById('fname').value = '';
	document.getElementById('lname').value = '';
	
	//additional clean form for nails form.
    document.getElementById('areaCode').value = 'js';
    document.getElementById('restNum').value = '';
    document.getElementById('res').innerHTML = '';
    cleanRadioGroup('treatment');
    cleanRadioGroup('days');
    document.getElementById('hour1').checked = false;
    document.getElementById('hour2').checked = false;
    document.getElementById('hour3').checked = false;
    document.getElementById('hour4').checked = false;
    document.getElementById('hour5').checked = false;
    document.getElementById('hour6').checked = false;
    cleanRadioGroup('Customer');
    //clean for the Drag and Drop
    document.getElementById("dragArea").innerHTML = `
    <div id="iconContainer"> <img src="icon.png" id="cloudIcon"> </div>
    <header id="ddHeader">Drag & Drop to Upload File</header>
    <span id="Or">OR</span>
    <button id="browseFileButton">Browse File</button>
    <input type="file" id="fileInputHiddenButton" hidden>
    `;
    
    initializeDragAndDrop()
    }
    





//cleanRadioGroup function: cleaning a radio group (all values will be false)
function cleanRadioGroup(groupName) {
    var radios = document.getElementsByName(groupName);
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }
}

//getAllBookings function: gettting all the bookings from the localStorage (using getbookingsDb func) and printing them in the administrator page
function getAllBookings(){
	var bookingsTable = getBookingsDb();
	var textPrint = '';
	for(i=0; i<bookingsTable.length; i++){
		var booking = bookingsTable[i];
		if(booking[0].length == 10){ // our key is 10 chars (diffrents from course key that is 11).
			var fullName = booking[1] + ' ' + booking[2];
			var dayAndHours = booking[3] + ', possible hours: ' + booking[4];
			textPrint += fullName + ', phone: ' + booking[0]; 
			textPrint += ', has requested to book an order in ' + dayAndHours;
            if (booking[5]) { // Check if file URL exists
                textPrint += '<img src="' + booking[5] + '" alt="Customer Image" style="max-width: 100px; max-height: 100px;">';
            }
			textPrint += '</br>';
		}
	}
	document.getElementById('allBookings').innerHTML = textPrint;
}





//removeBooking function: delete a booking from the localStorage, based on the id and using removeBookingFromDb function
function removeBooking(){
    var id = document.getElementById('removeBooking').value;
    removeBookingFromDb(id);
	getAllBookings(); //update bookings in real time to manager.html.
}





//checkDay Function: returns the day choosen by the costumer, returns 'empty' string of no day was choosen
function checkDay(){
    var Sun = document.getElementById('sunday').checked;
    var Mon = document.getElementById('monday').checked;
    var Tue = document.getElementById('tuesday').checked;
    var Wed = document.getElementById('wednesday').checked;
    var Thu = document.getElementById('thursday').checked;
    var day = Sun ? "Sunday" : (Mon ? "Monday" : (Tue ? "Tuesday" :(Wed ? "Wednesday" :(Thu? "Thursday" : "empty"))));
    return(day);
}


function checkCustomer(){
    var newCos = document.getElementById('New').checked;
    var oldCos = document.getElementById('Old').checked;
    var newOrOldCus = newCos ? "New" : (oldCos ? "Old" : "empty");
    return(newOrOldCus);
}


//checkHours function: returns the hours choosed by the costumer (stored in an array)
function checkHours(){
    var hoursArr = [];

    if (document.getElementById('hour1').checked) {
        hoursArr.push(document.getElementById('hour1').value);
    }
    if (document.getElementById('hour2').checked) {
        hoursArr.push(document.getElementById('hour2').value);
    }
    if (document.getElementById('hour3').checked) {
        hoursArr.push(document.getElementById('hour3').value);
    }
    if (document.getElementById('hour4').checked) {
        hoursArr.push(document.getElementById('hour4').value);
    }
    if (document.getElementById('hour5').checked) {
        hoursArr.push(document.getElementById('hour5').value);
    }
    if (document.getElementById('hour6').checked) {
        hoursArr.push(document.getElementById('hour6').value);
    }
   
    return(hoursArr);
}


//checkTreatment Function: returns 'empty' string if no treatment was choosen
function checkTreatment(){
    var Hands = document.getElementById('hands').checked;
    var Legs = document.getElementById('legs').checked;
    var handsAndLegs = document.getElementById('hands + legs').checked;

    if(!Hands && !Legs && !handsAndLegs){
        return('empty');
    }
    
}


//---------------------------section4------------------------------
//This section is function to nail page (ShugasTreatment.html)

function administratorRedirection(){
    var enteredId = prompt("Enter your ID: ");
    var enteredPassword = prompt("Enter your password: ");

    //checking the credentials
    if(enteredId == "Administrator" && enteredPassword == "123456789"){
        window.location.href = "manager.html";
    }

    else if(enteredId == "Admin" && enteredPassword == "Admin"){
        window.location.href = "manager.html";
    }

    else if(enteredId == "admin" && enteredPassword == "admin"){
        window.location.href = "manager.html";
    }

    else{
        
        alert("Invalid ID or password. Please try again. ");
    }
};


//---------------------------section4.1------------------------------
//This section is for the drag and drop which is in ShugasTreatment.html browser
function initializeDragAndDrop() {
    /*the value of dropArea, dragText, browseFileButton, fileInputHiddenButton initially would be a reference to the file input element in the DOM
    (not the content of the DOM element), the cotent of the DOM elements will be accessable via the EventListeners, by the event itself,
     for example to access the file of the picture, we will use event.target.files (after the evennt "change" occured)
     target is a property of this event, and files is a property of target, using this path get us the file itself */
    const dropArea = document.querySelector("#dragArea");
    const dragText = dropArea.querySelector("#ddHeader");
    const browseFileButton = dropArea.querySelector("#browseFileButton");
    const fileInputHiddenButton = dropArea.querySelector("#fileInputHiddenButton");
    let file;

    // Remove the "reset" class to reset the appearance of the dashed line
    dropArea.classList.remove("active");

    browseFileButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default behavior
        fileInputHiddenButton.click();
    });

    fileInputHiddenButton.addEventListener("change", handleFileInputChange);
    function handleFileInputChange(event) {
        file = event.target.files[0];
        showFile();
        dropArea.classList.add("active");
    }

    dropArea.addEventListener("dragover", handleDragOver);
    function handleDragOver(event) {
        event.preventDefault();
        dropArea.classList.add("active");
        dragText.textContent = "Release to Upload File";
    }

    dropArea.addEventListener("dragleave", handleDragLeave);
    function handleDragLeave() {
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }

    dropArea.addEventListener("drop", handleDrop);
    function handleDrop(event) {
        event.preventDefault();
        file = event.dataTransfer.files[0];
        showFile();
    }

    function showFile() {
        handleFiles(file);
    }

    function handleFiles(file) {
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if (validExtensions.includes(fileType)) {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let fileURL = fileReader.result;
                let imgTag = `<img src="${fileURL}" alt="" id="uploadedImg">`;
                dropArea.innerHTML = imgTag;
            }
            fileReader.readAsDataURL(file);
        } else {
            alert("This is not an Image File!");
            dropArea.classList.remove("active");
            dragText.textContent = "Drag & Drop to Upload File";
        }
    }
}


