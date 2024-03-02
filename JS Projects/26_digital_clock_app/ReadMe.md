Digital Clock

![alt text](image.png)

Our HTML looks like

![alt text](image-1.png)

![alt text](image-2.png)

To get below effect we make container::before and container::after

![alt text](image-3.png)
![alt text](image-5.png)

Result

![alt text](image-4.png)

To make the clock blur, we give backdrop-filter

![alt text](image-6.png)

![alt text](image-7.png)

Now we style 00:00:00 part of clock so we give span tags

![alt text](image-8.png)

We give ids to them so that we can change the text accordingly

![alt text](image-9.png)

![alt text](image-10.png)

![alt text](image-11.png)

Now we add JS

![alt text](image-12.png)

![alt text](image-13.png)

But this time is static and we want it to change every second so we put everything inside setInterval and put timer of 1sec

![alt text](image-14.png)

To make digits like 00, 01.... for <10 we do

![alt text](image-15.png)
