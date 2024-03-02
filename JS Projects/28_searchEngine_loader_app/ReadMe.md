Image Search Engine

We have a Search bar where whatever we write we get images related to it in result and we have a show more button in the bottom of page when we click it, we see more results

![alt text](image.png)
![alt text](image-1.png)

Our HTML looks like

We will show search result inside search-result div

![alt text](image-2.png)

Initally we will keep Show More button as hidden and will show it only when we have the API data

Now we write JS and we use unsplash API to get the images

![alt text](image-3.png)

Inside unSplash API we have certain parameters like query, page, pageperLimit etc to get the desired search result

![alt text](image-4.png)

We will call this function when someone submits the form so we add a listener to the form for onSubmit

![alt text](image-5.png)

Now we show the result when we get the data from the API and we make <a> to make image connected to a link and we make target = \_blank so that image opens on new tab.
we place our img inside <a> tag and we put <a> tag inside our div search-results

![alt text](image-6.png)
![alt text](image-7.png)

Now we show "Show More" Button
so we put its display:block
and we want to load more images on clicking it we do it by showing result from other pages so we do pages++

![alt text](image-8.png)

![alt text](image-9.png)

We want to hide previous result when we are entering new result

![alt text](image-10.png)
