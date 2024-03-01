Form Validation Using JavaScript
Gives green check mark if field is correctly filled, name should have both firstname + " " + lastname
PhoneNumber should be 10 digit number
Email id should have proper email format and so on

![alt text](image.png)

![alt text](image-1.png)

Our HTML looks like

![alt text](image-2.png)

Now To add error message for each input field, we add span tag

![alt text](image-3.png)

![alt text](image-4.png)

Now we add CSS to these error messages

Now we add error messages using JS

We give id and keyUp event to input field

![alt text](image-5.png)

Our JS looks like

![alt text](image-6.png)

To validate Name, we use regex

![alt text](image-7.png)

Instead of valid, we want to show check icon

![alt text](image-8.png)

Sameway we do for contact number, email and message

![alt text](image-9.png)

![alt text](image-10.png)

![alt text](image-11.png)

![alt text](image-12.png)

![alt text](image-13.png)

Now we add Validation for the submit button

![alt text](image-14.png)

We want to hide the submit error message after sometime so

![alt text](image-15.png)
