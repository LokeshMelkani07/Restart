Stopwatch which play, stop, reset the timer

![demo](image.png)

Our HTML looks like

![alt text](image-1.png)

CSS looks like

![alt text](image-3.png)

![alt text](image-2.png)

Now we write JS

We give id to h1 tag to show time using JS

![alt text](image-5.png)

JS looks like

![alt text](image-6.png)

Now we want to execute stopwatch() every second for which we use JS setInterval

We need to take care that if timer is already running then we need to clear it our first so we make a timer variable

![alt text](image-7.png)

Now we make a function

![alt text](image-9.png)

We want this timer to start when we click start button so we give it as onclick to start button

![alt text](image-8.png)

Now we want to update the display time everytime and we need to take care that our time should come in 00:00:00 format means double 0 format so we need to take care of 0 to 9 digits so we put condition for it

![alt text](image-10.png)

Now we add functionality to stop or reset the timer so we make a function and give it as onclick

![alt text](image-12.png)

![alt text](image-11.png)
