Calculator App using JS

![Demo](image.png)

Our HTML looks like

![alt text](image-1.png)
![alt text](image-2.png)

Now we need to show the number when we click on it to our display
We give name attribute to our input tag for display
So we give it like this

![alt text](image-3.png)

We do this for all buttons

![alt text](image-4.png)

Now we add click function on AC, DE, \* etc buttons

For DE button we need to delete only last number so we use slice method

![alt text](image-5.png)

Now we put click function on = button for that we use eval()

![alt text](image-6.png)
