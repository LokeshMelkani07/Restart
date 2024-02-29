We have 3 buttons, On pressing them we get toasts

![alt text](image.png)

Our HTML looks like

![alt text](image-1.png)

Toast will come at right side bottom corner so CSS for it will be like:

![alt text](image-3.png)

Now let us add onclick for the buttons

![alt text](image-2.png)

Now Let us add JS

![alt text](image-4.png)

Now we design these notification tags

We need to show modified content of the toast based on button we press so make another variable successMsg, errorMsg, invalidMsg

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

Now we add icons using favicon

![alt text](image-8.png)

We need colour of favicon to be based on button pressed so we add classes for it

![alt text](image-9.png)

We need to hide a notification after certain time so we add setTimeout()

![alt text](image-14.png)

We need to show a progress bar below each toast so we add CSS for that, we make .toast as position:relative and we make .toast:after as position:absolute

![alt text](image-12.png)

We want toast to slide to left and vanish on finishing so we add CSS for it

![alt text](image-13.png)
