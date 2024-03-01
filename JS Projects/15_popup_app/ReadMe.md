We have a button, On pressing which we show a popup with a animation and when we click OK on popup, it vanishes

![alt text](image.png)
![alt text](image-1.png)

Our HTML looks like

![alt text](image-2.png)

Now we style our popup

![alt text](image-3.png)

We want our popup to start as very small in size and from the top and get bigger as it comes to center and it should come from top to center so in CSS we give top:0, translate:scale(0.1) initially and we will change it using animations and we will show it only when we click "Submit" so initially we keep visiblity:hidden

![alt text](image-4.png)

We give onclick function to buttons

![alt text](image-5.png)

Now we write JS

![alt text](image-7.png)

We will give a class to our popup using JS

![alt text](image-6.png)
