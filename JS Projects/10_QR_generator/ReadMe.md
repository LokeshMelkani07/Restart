We have a input box where if we write some URL or something, it creates QR code of that text or URL.

![alt text](image.png)

![alt text](image-1.png)

Our HTML looks like

![alt text](image-3.png)

Now we write JS

We will use QR Generator API to generate QR code

![alt text](image-5.png)

We want to show an animation while showing the QR such that we initially give max-height = 0 to QR box and then when QR comes, we increase it to 300px by adding a class show-img in it.

![alt text](image-4.png)

if text is empty, we handle it like

![alt text](image-6.png)

![alt text](image-7.png)
