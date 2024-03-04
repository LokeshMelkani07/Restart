Search Bar & Filter Table
We have a Table with some data and we have a Search bar, we write something on search bar and show result in the below table

![Demo](image.png)

Our HTML looks like

First we make a Table

![alt text](image-2.png)
![alt text](image-1.png)

Now we make our Search bar

![alt text](image-3.png)

Now we apply "onKeyup" event and we call a function searchFun()

![alt text](image-4.png)

Now we define the function

We can access our input and its value like this

![alt text](image-5.png)

To get values inside tr of our table we do something like this

![alt text](image-6.png)

We have got collection of all tr now we apply for-loop for each tr and get "name" field from that tr and to get textValue, we use textContent, we convert it to Uppercase so that matching is easy.

indexOf gives index of first occurence of that thing if its present or it gives -1 if its not present

Our complete function looks like

![alt text](image-8.png)
