It will display any random password whenever we click "Generate Password" and we can copy it also by pressing button, it will be a strong password

![Demo](image.png)

HTML looks like

![alt text](image-1.png)

Adding Generate Password Button

![alt text](image-2.png)

Now we add JS

![alt text](image-3.png)

Now we make a function that creates random password

![alt text](image-4.png)

Math.random\*uppercase.length generates any random number between 0 to uppercase.length that is 26
Now we need length of password to be 12 so we make a while loop and we make allchars variable

![alt text](image-5.png)

Once password is made, we can display it now

![alt text](image-7.png)

We put this function for onclick of generate password button

![alt text](image-6.png)

Now we make copy button functional and create a function that goes to onclick of that button

![alt text](image-8.png)
