Custom Carousel || Image Slider
We have a Prev | Next button. On pressing it we can move images

![demo](image.png)

Our HTML looks like

![alt text](image-6.png)

One way to center a div withour using flex is, give marginTop and margin:auto

![alt text](image-1.png)

When we give position: absolute to a child, we should give position: relative to the parent also

![alt text](image-2.png)

We write our JS

We select all slides and we run a loop
Now for each slide

![alt text](image-3.png)

Now it results in

![alt text](image-4.png)

To hide this we keep overflow: hidden and we give transition:1s to slide

![alt text](image-5.png)

Now we make a slideImage() which slides image to next based on a counter

![alt text](image-8.png)

Now we give onclick to prev and next button and on pressing them we change value of counter

![alt text](image-7.png)

![alt text](image-9.png)

Complete JS logic

![alt text](image-10.png)

Now if we want it to slide from top to bottom, Instead of "left" we give "bottom" and instead of translateX we give translateY
