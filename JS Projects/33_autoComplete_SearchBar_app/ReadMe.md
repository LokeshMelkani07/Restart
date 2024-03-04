AutoComplete Search Bar using JS
We write anything, we get all search terms related to that search text

![alt text](image.png)

Our HTML looks like

![alt text](image-1.png)

Our JS looks like

We will show the result-box content using JS so initially we delete it

![alt text](image-2.png)

![alt text](image-3.png)

Now we apply "onKeyup" event on the input box, we make an empty array "result" and we store the matching keyword in that array

![alt text](image-4.png)

Now we will display that result inside result-box and we pass "result" array as an parameter

![alt text](image-5.png)

We see in our result, we have "," after each result and our result.map gives another array due to which "," comes, so to convert it to string we use .join and to remove "," we do .join('')

![alt text](image-6.png)

Now if we click on any result option, it should get displayed on the search bar content and hide all other result options so we put onclick on <li>

![alt text](image-7.png)

![alt text](image-8.png)

At the end, if our result list is empty, we do not want to show anything in result-box so

![alt text](image-9.png)

If our Suggestion box is very large, we need to take care of the scroll so

![alt text](image-10.png)
