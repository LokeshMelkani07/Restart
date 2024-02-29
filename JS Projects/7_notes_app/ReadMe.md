When we click on Create NOtes button, a text box opens where we can write any note, now when we click delete button, it deletes the note.
Now if we close the browser, we again open it, our notes are intact because we have used local storage to store the notes

![Demo](image.png)

HTML structure of our doc looks like

Inside p tag we make contentEditable = true

![alt text](image-2.png)

We position delete button at end corner of input tag

![alt text](image-3.png)

Now we do not want input to show by default, we show it using JS when we press the button

So we write JS

![alt text](image-4.png)

To make Delete button functional

![alt text](image-5.png)

Now we want to save these note in our local storage so that everytime we refresh browser, notes remain there

![alt text](image-6.png)

Now we call it, Whenever we add a note or start typing, it should update local storage

![alt text](image-8.png)

Now we need to function to display notes and we call that function at the top

![alt text](image-9.png)

Now we overwrite default behaviour of "Enter" key and whenever we press "Enter" it puts line break in the note

![alt text](image-10.png)

Output looks like

![alt text](image-11.png)
