//Data Access Tier - the functions in this file are reading/writing to the local storage of the browser

//----------------------------------section1--------------------------
//This section is function to nail page (ShugasTreatment.html)


//processInfo function: gets phone number, name and last name and store it in the localStorage (key = phone number)
function processInfo(fullNum, name, lastName, day, hours, fileURL ) {
	var dbString = stringify(name, lastName, day, hours, fileURL);
	localStorage.setItem(fullNum, dbString);
}



//stringify function: gets the name and last name combining them to a localStorage format string 
function stringify(name, lastName, day, hours, fileURL) {
	var nameStr = 'name: ' + name;
	var lastNameStr = 'lastName: ' + lastName;
    var dayStr = 'day: ' + day;
    var hoursStr = 'hours: ';
    var dbStr = '';
    for (var i = 0; i < hours.length; i++) {
        if (i == hours.length - 1){
            hoursStr += hours[i];    
        }
        else{
            hoursStr += hours[i] + ', ';
        }
    }

    if(!fileURL){
        dbStr = '{'+ nameStr + ',' + lastNameStr + ',' + dayStr + ',' + hoursStr + ',file: ' + '}';
    }
    else{
        dbStr = '{'+ nameStr + ',' + lastNameStr + ',' + dayStr + ',' + hoursStr + ',file: ' + fileURL.src + '}'; 
    }
	return dbStr;	
}



//getBookingsDb function: returning all the books in the localStorage  as an array (bookings)  
function getBookingsDb(){
	var bookings = [];	//rows: number of bookings. cols: number of info params
	for (i = 0; i < localStorage.length; i++) {
		var costumerPhoneNum = localStorage.key(i); //fullNum is the key, costumerPhoneNum will get it's value (will change each iteration)
		var costumerInfo = localStorage.getItem(costumerPhoneNum); // costumerInfo's value will be the string stored in the localStorage (the one made with stringify), it also changes in each iteration
		var tmpBooking = [];
		tmpBooking[0] = costumerPhoneNum;
		tmpBooking[1] = getName(costumerInfo);
		tmpBooking[2] = getLastName(costumerInfo);
        tmpBooking[3] = getDay(costumerInfo);
        tmpBooking[4] = getHours(costumerInfo);
        tmpBooking[5] = getFile(costumerInfo);
		bookings[i] = tmpBooking;
	}
	return bookings;
}



//getName function: Extracting the name of the costumer from the localStorage string associated with it
function getName(costumerInfo) {
	var nameIndex = costumerInfo.indexOf('name')+6;
	var endNameIndex = costumerInfo.indexOf('lastName')-1;
	return 	costumerInfo.substring(nameIndex, endNameIndex); //returning the substring of the name value
}





//getLastName function: same function like getName just for the last name
function getLastName(costumerInfo) {
	var lastNameIndex = costumerInfo.indexOf('lastName')+10;
	var endLastNameIndex = costumerInfo.indexOf('day')-1;
	return 	costumerInfo.substring(lastNameIndex, endLastNameIndex);
}


//getDay function: same function like getName just for the day
function getDay(costumerInfo) {
	var dayIndex = costumerInfo.indexOf('day')+5;
	var endDayIndex = costumerInfo.indexOf('hours')-1;
	return 	costumerInfo.substring(dayIndex, endDayIndex);
}


//getHours function: same function like getName just for the hours
function getHours(costumerInfo) {
	var hoursIndex = costumerInfo.indexOf('hours')+7;
	var endHoursIndex = costumerInfo.indexOf('file')-1;
	return 	costumerInfo.substring(hoursIndex, endHoursIndex);
}

//geFile function: Extracting the name of the costumer from the localStorage string associated with it
function getFile(costumerInfo) {
	var fileIndex = costumerInfo.indexOf('file')+6;
	var endfileIndex = costumerInfo.indexOf('}');
	return 	costumerInfo.substring(fileIndex, endfileIndex); //returning the substring of the name value
}


//removeBookingFromDb function: deletes the desired Booking from the localStorage
function removeBookingFromDb(id){ 
	localStorage.removeItem(id);
}


//----------------------------------section2--------------------------
//This section is function to nail page (ShugasCourses.html)


//CourseInfo function: gets phone number, name and last name and coursechoices store it in the
//localStorage (key = phone number + char 'c') - diffrent key from the treatmentKey.
function CourseInfo(fullNum_c, name_c, lastName_c, coursechoices) {
	var dbString_c = stringifyCourse(name_c, lastName_c, coursechoices);
	localStorage.setItem(fullNum_c, dbString_c);
}

//stringifyCourse function: gets the name and last name combining them to a localStorage format string
//also create str to all course selecting and the hour of the course.
function stringifyCourse(name_c, lastName_c, coursechoices) {
    var nameStr_c = 'name: ' + name_c;
    var lastNameStr_c = 'lastName: ' + lastName_c;
    var choiceStr = 'your course choice: ';
    for (var i = 0; i < coursechoices.length; i = i + 2) {
        choiceStr += coursechoices[i] + ' ' + coursechoices[i + 1];
        if (i < coursechoices.length - 2) {
            choiceStr += ', ';
        }
    }
    var dbStr_c = '{' + nameStr_c + ', ' + lastNameStr_c + ', ' + choiceStr + '}';
    return dbStr_c;
}



//getCourseBookingsDb function: returning all the books in the localStorage  as an array (coursebookings)  
function getCourseBookingsDb() {
    var coursebookings = [];

    for (let j = 0; j < localStorage.length; j++) { // Changed i to j
        var costumerPhoneNum_c = localStorage.key(j);
        var customerInfo_c = localStorage.getItem(costumerPhoneNum_c);

        // Check if customer info exists
        if (customerInfo_c) {
            var tmpCourseBooking = [];

            tmpCourseBooking[0] = costumerPhoneNum_c;
            tmpCourseBooking[1] = getName_c(customerInfo_c);
            tmpCourseBooking[2] = getLastName_c(customerInfo_c);
            tmpCourseBooking[3] = getChoice(customerInfo_c);

            coursebookings.push(tmpCourseBooking);
        }
    }

    return coursebookings;
}

//getName_c function: Extracting the name of the costumer from the localStorage string associated with it
function getName_c(customerInfo_c) {
    var nameIndex_c = customerInfo_c.indexOf('name:') + 5;
    var endNameIndex_c = customerInfo_c.indexOf(', lastName: ');
    return customerInfo_c.substring(nameIndex_c, endNameIndex_c); //returning the substring of the name value
}




//getLastName_c function: same function like getName just for the last name
function getLastName_c(customerInfo_c) {
	var lastNameIndex_c = customerInfo_c.indexOf('lastName: ')+10;
	var endLastNameIndex_c = customerInfo_c.indexOf(', your course choice: ');
	return 	customerInfo_c.substring(lastNameIndex_c, endLastNameIndex_c);
}

//getChoice function: same function like getName just for the hours
function getChoice(customerInfo_c) {
	var choiceIndex = customerInfo_c.indexOf(', your course choice:')+21;
	var endchoiceIndex = customerInfo_c.indexOf('}');
	return 	customerInfo_c.substring(choiceIndex, endchoiceIndex);
}


//removeBookingfromcoursesDb function: deletes the desired Booking from the localStorage
//remove only with the special 11 chars key.
function removeBookingfromcoursesDb(CoursePhoneremover){ 
	localStorage.removeItem(CoursePhoneremover);
}
