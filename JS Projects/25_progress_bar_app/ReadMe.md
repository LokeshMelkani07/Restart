Progress Bar
This progress bar where we give value and max-value, based on value it changes dynamically. Whatever be the max-value, value will be % of it.

![alt text](image-3.png)

Our HTML looks like

![alt text](image-4.png)
![alt text](image-5.png)

We make 2 classes, progress which shows an empty bar, and progress-done which shows the progress done above progress bar, initially we give width:0 to progress-done
To get that animation in progress bar, initally we set the width to 0 which we change using JS based on %age

![alt text](image-6.png)

Now we write our JS

![alt text](image-7.png)

Now we take input and max-input

![alt text](image-8.png)

Now we make function to change width of progress bar and can what %age of max-value is value

![alt text](image-9.png)

Now we want this function to get called everytime we change the input

![alt text](image-10.png)
