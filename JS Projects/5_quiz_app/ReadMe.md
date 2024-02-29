This is a Quiz app which has Questions, right/wrong answer using colours, next button, score display after quiz finishes

![quiz demo app](image.png)

Lets code it

![html](image-1.png)

Now we give CSS to html file

Now we add next button which will only be shown when we click any answer so initially we put display:none for the button

![next button](image-2.png)

Now we insert JS and connect it to html at end of body tag

We make a JSON for Questions and answers

![Questions JSON](image-3.png)

Now we make variables for answer button, question button, next button

![alt text](image-4.png)

Now we make startQuiz() function which resets the questions index and score

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

Now we make functionality of what will happen if we click on any answer option

![alt text](image-8.png)

We define selectAnswer function

![alt text](image-9.png)

Now we add background colour based on these classes

![alt text](image-10.png)

We need to disable number of times a answer can be clicked for an question to 1 and when we select the wrong answer, it should automatically highlight right answer with green colour and show next button

![alt text](image-11.png)

To stop the hover effect once button is disabled and stop cursour pointer, we make following changes in css file

![alt text](image-12.png)

Now when we click correct answer, score should increase

![alt text](image-13.png)

Now we add functionality for next button such that if questions are over, reset the quiz else go to next question

![alt text](image-14.png)

Now we define handleNextButton

![alt text](image-15.png)

![alt text](image-17.png)
