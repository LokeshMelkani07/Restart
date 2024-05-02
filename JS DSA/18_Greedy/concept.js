// Greedy
// In DP we were going to each case and solving it
// In Greedy, its different, we will already know which case to go inside before choosing any case.

// Non-overlapping Intervals
/*
Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Example 1:
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
*/
var eraseOverlapIntervals = function (intervals) {
  // We will use Greedy Technique where we will choose the meeting which ends in shortest time because we need to schedule maximum meetings
  // We will sort the array based on ending time so that we can choose the meeting ending sbse jaldi
  // We will check if next meeting ka stating time coincide with ending time of previous chosen meeting
  // if it coincides means hum uss meeting ko ignore krenge
  // else hum usko lelenge and endTime update krdenge
  // in this problem we need to return minimum meetings we can discard to do max meeting possibe so everytime we discard a meeting, we do mini++
  intervals.sort(function (a, b) {
    return a[1] - b[1];
  });

  console.log(intervals);
  // Store the ending time for first one
  let endTime = intervals[0][1];
  // Minimum number of meeting to be removed
  let mini = 0;

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < endTime) {
      mini++;
    } else {
      endTime = intervals[i][1];
    }
  }

  return mini;
};

// Wine Buying and Selling
/*
Given an array, Arr[] of size N represents N house built along a straight line with equal distance between adjacent houses. Each house has a certain number of wine and they want to buy/sell those wines to other houses. Transporting one bottle of wine from one house to an adjacent house results in one unit of work. The task is to find the minimum number of work is required to fulfill all the demands of those N houses.
if arr[i] < 0, then ith house wants to sell arr[i] number of a wine bottle to other houses.
if arr[i] > 0, then ith house wants to buy arr[i] number of a wine bottle from other houses.
Note: One have to print the minimum number such that, all the house can buy/sell wine to each other.
It is guaranteed that sum of all the elements of the array will be 0.

Example 1:
Input: N = 5,
Arr[] = {5, -4, 1, -3, 1}
Output: 9
Explanation:
1th house can sell 4 wine bottles to 0th house,
total work needed 4*(1-0) = 4, new arr[] = 1,0,1,-3,1
now 3rd house can sell wine to 0th, 2th and 4th.
so total work needed = 1*(3-0)+1*(3-2)+1*(4-3) = 5
So total work will be 4+5 = 9
*/
function wineSelling(Arr, N) {
  // Arr[i] < 0 means isko sell krni hain
  // Arr[i] > 0 means isko buy krni hain
  // On selling/buying x bottles at d distance, the ans will be calulated as x*d
  // Let say hume cheeni laane bheja gya hain and humare ghar ke paas do dukaane hain
  // ek dukaan 10km doori par, ek dukaan 2km doori par. hum kaunsi dukaan se cheeni layenge?
  // Obviously 2km doori vale se so sameway in the questions do buying and selling in such a way that answer comes minimum
  // Approach:
  // We will follow Greedy approach where agar kisi ko khareedni hai toh hum sbse closest seller se khareedenge
  // For that purpose, we make 2 pointers buy and sell both initially at 0
  // We will move buy and sell based on whether its a buyer or a seller
  // if we buy points to a buyer and sell points to a seller
  // We will check whose value is greater, the lesser will become 0 and we subtract that amount from greater and add in the answer (sell-buy)*Arr[sell]
  // This way we keep on moving until one of the pointer goes out of array which would mean that all buying and selling has taken place as its given that "It is guaranteed that sum of all the elements of the array will be 0."
  let sell = 0,
    buy = 0;
  let ans = 0; // Initialize ans outside the loop

  while (sell < N && buy < N) {
    // Move sell until we get our first negative number because negative means he wants to sell
    while (sell < N && Arr[sell] >= 0) {
      sell++;
    }

    // Move buy until we get our first positive number because positive means he wants to buy
    while (buy < N && Arr[buy] <= 0) {
      buy++;
    }

    if (sell < N && buy < N) {
      // get minimum from abs(buy,sell)
      let val = Math.min(Math.abs(Arr[buy]), Math.abs(Arr[sell]));
      // if buyers are more than seller, cubtract that, add in answer and make seller zero
      if (Math.abs(Arr[buy]) >= Math.abs(Arr[sell])) {
        Arr[buy] -= val;
        ans += val * Math.abs(sell - buy);
        Arr[sell] = 0;
      } else {
        Arr[sell] += val;
        ans += val * Math.abs(sell - buy);
        Arr[buy] = 0;
      }
    }
  }

  return ans;
}

// Minimum Platforms
/*
Given arrival and departure times of all trains that reach a railway station. Find the minimum number of platforms required for the railway station so that no train is kept waiting.
Consider that all the trains arrive on the same day and leave on the same day. Arrival and departure time can never be the same for a train but we can have arrival time of one train equal to departure time of the other. At any given instance of time, same platform can not be used for both departure of a train and arrival of another train. In such cases, we need different platforms.

Example 1:
Input: n = 6
arr[] = {0900, 0940, 0950, 1100, 1500, 1800}
dep[] = {0910, 1200, 1120, 1130, 1900, 2000}
Output: 3
Explanation:
Minimum 3 platforms are required to
safely arrive and depart all trains.
*/
//Function to find the minimum number of platforms required at the
//railway station such that no train waits.
function findPlatform(arr, dep, n) {
  // We are given with Arrival and Departure time of trains
  // We see that maximum number of platforms we need at a time depends on maximum number of trains whose arrival and departure overlaps
  // If 2 trains ki timing not overlapping means its obvious that they can come and go in a single platform comfortably without interfaring with each other
  // So if we can find out maximum overlapping trains, we can return minimum number of platforms needed to accomodate all trains smoothly
  // One Approach:
  // We will make a count variable and maxi variable initially 0 in which if we find a arrival time we do count++ and store maxi = Math.max(count,maxi)
  // If we find a departure time we do count-- and store in maxi
  // This way we will get max value of count variable at any time during whole traversal and that will be our max overlap or minimum platforms needed
  // What we will do is: We sort the arrival and departure array, we do not need to think of ambiguity because we consider all train as same, we just need to know the overlapping of time
  // Once we sort both of them, we run 2 pointer, i on arrival and j on depature
  // What comes before we do counter++ and make count++ or count-- accoridingly and store in maxi
  arr.sort((a, b) => a - b);
  dep.sort((a, b) => a - b);
  let maxi = 0;
  let count = 0;
  let i = 0,
    j = 0;

  // Till any one pointer goes out of array
  while (i < n) {
    if (arr[i] <= dep[j]) {
      count++;
      maxi = Math.max(maxi, count);
      i++;
    } else if (arr[i] > dep[j]) {
      count--;
      j++;
    }
  }

  return maxi;
}
