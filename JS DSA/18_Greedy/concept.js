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

// Assign Cookies
/*
Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.

Example 1:
Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3.
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
You need to output 1.
*/
var findContentChildren = function (g, s) {
  // We have g[i] means greed factor of ith child means minimum size of cookie we need for this child to assign that cookie successfully to that child
  // s[i] means size of ith cookie
  // We assign it in such a way that we will get the closest value to g[i] inside s[i] and assign it so that we reserve the bigger values of s[i] for bigger g[i] as we cannot waste s[i] = 4 for g[i] = 1 if there is already s[i] = 1 or 2 or 3 present in s array
  // What we will do is, we will sort g and s array
  // We keep 2 pointers l and r on both arrays, l on s and r on g array
  // we check if g[r] <= s[l], we can assign cookie and as s and g are sorted so we will assign closest s[i] for a particular g[i] without wasting bigger s[i] values on smaller g[i] values
  // if we are able to assign to the ith child, we do r++ and l++
  // if we are not able to assign let say s[i] = 2 and g[i] = 3 so if we are not able to assign 2 for g[i] = 3 means we cannot assign it further for other values of g[i] as its an sorted array so values will only increase further so in that case, do not touch r, just move l++
  // We keep on doing this work on loop till l < s.size
  // at the end, r points to number of children cokkie is assigned to, successfully
  // TC: O(nlogn) + O(mlogm) + O(m), SC: O(1)
  let m = g.length;
  let n = s.length;
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let l = 0,
    r = 0;
  while (l < n) {
    if (g[r] <= s[l]) {
      r++;
    }
    l++;
  }

  return r;
};

// Lemonade Change
/*
At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.

Note that you do not have any change in hand at first.

Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide every customer with the correct change, or false otherwise.

Example 1:
Input: bills = [5,5,5,10,20]
Output: true
Explanation:
From the first 3 customers, we collect three $5 bills in order.
From the fourth customer, we collect a $10 bill and give back a $5.
From the fifth customer, we give a $10 bill and a $5 bill.
Since all customers got correct change, we output true.
*/
var lemonadeChange = function (bills) {
  // Problem says
  // Hum ek nimbu paani bech rhe h jo ki hai 5$ ka
  // 3 type ki denominations hain bas, $5, $10, $15
  // humare paas ek bills array h where bills[i] means amount that customer gives me
  // hume customer se paise leke usme se 5$ kaatke bache hue usko vapas dene hai
  // starting mai apne paas 0$ hai means $5 = 0, $10 = 0, $15 = 0
  // agar hum sab customer ko 5$ kaatke, correct paise vapas kar paate h then return true otherwise return false
  // payback krne ke lie we can only use 5,10,15 dollars
  // say, if we want to return $15, we can return using 5 + 10 or 5+5+5 and if we do not have these denominations, we cannot return back 15$ so return false
  // Approach
  // We will keep track of 5, 10, 20
  // if we have bills[i] = 5, we do 5++ simply
  // if we have bills[i] = 10, we should have atleast one 5 available so if 5 is available, 5--, 10++
  // if we have bills[i] = 20, either we should have one 10 and one 5 or three 5's, if we have it then do -- and pay else return false
  // if we successfully reach end of loop, return true
  // we do not need to take account of 20 as we can only return money in form of 5, 10, 15
  // TC: O(n), SC: O(1)
  let five = 0,
    ten = 0;
  let m = bills.length;
  let i = 0;
  while (i < m) {
    if (bills[i] == 5) {
      five++;
    } else if (bills[i] == 10) {
      if (five >= 1) {
        five--;
        ten++;
      } else {
        return false;
      }
    } else {
      if (ten >= 1 && five >= 1) {
        ten--;
        five--;
      } else if (five >= 3) {
        five -= 3;
      } else {
        return false;
      }
    }
    i++;
  }

  return true;
};

// Shortest Job first
/*
Geek is a software engineer. He is assigned with the task of calculating average waiting time of all the processes by following shortest job first policy.

The shortest job first (SJF) or shortest job next, is a scheduling policy that selects the waiting process with the smallest execution time to execute next.

Given an array of integers bt of size n. Array bt denotes the burst time of each process. Calculate the average waiting time of all the processes and return the nearest integer which is smaller or equal to the output.

Note: Consider all process are available at time 0.

Example 1:
Input:
n = 5
bt = [4,3,7,1,2]
Output: 4
Explanation: After sorting burst times by shortest job policy, calculated average waiting time is 4.
*/
function solve(bt) {
  // We are given execution time for each job in bt array
  // We need to execute task in such a way that we execute the shortest execution time vala job first
  // We will keep on adding execution time in the total and at the end, we divide it by number of jobs and get the average in integer form
  // We need to execute shortest execution time job first so we sort the array first
  // We will take the execution time inside a variable t = 0 initially and waiting time inside variable wt = 0 initially
  // We will add execution time inside t and waiting time = waiting time + t
  // We do this till end of array and at the end we return waiting time / n
  let n = bt.length;
  bt.sort((a, b) => a - b);
  let i = 0,
    t = 0,
    wt = 0;
  while (i < n) {
    wt += t;
    t += bt[i];
    i++;
  }

  return parseInt(wt / n);
}

// Jump Game
/*
You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

Example 1:
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
*/
var canJump = function (nums) {
  // nums[i] means maximum jump we can make to elements ahead us
  // nums[i] = 3 means we can make jump of 1, 2 or 3 from current index
  // if we are successfully able to reach end of array, return true
  // if our nums[i] = 0 means we cannot go ahead so we need to take care of it that somehow we do not encounter 0
  // if there is no 0 in our array, we can definately reach the end at any case
  // Approach
  // we will have a maxIndex = 0 initially
  // we run a loop starting from index = 0 to n
  // if i > maxIndex means we cannot reach that index so return false because maxIndex stores the maximum index we can reach standing from a particular index
  // if i > maxIndex means we are at a index which we can never reach does not matter we use all max jumps from given previous elements
  // if its not the case, update maxIndex
  // at any time if maxIndex > n-1 means we can reach the end successfully so break out
  // return true;
  let n = nums.length;
  let i = 0;
  let maxIndex = 0;
  while (i < n) {
    if (i > maxIndex) {
      return false;
    }

    // updating maxJump we can take to reach a index and storing that index inside maxIndex
    maxIndex = Math.max(maxIndex, i + nums[i]);
    if (maxIndex > n - 1) {
      break;
    }
    i++;
  }

  return true;
};

// Jump Game II
/*
You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

Example 1:
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
*/

// Using recursion + memo
var jump = function (nums) {
  // This time we need to return minimum number of jumps needed to reach the end
  // It is given that we will definately reach the end this time
  // We can think of recursion, where we take a possible jumps from a particular index and return the minimum answer and store it
  let n = nums.length;
  let dp = Array.from({ length: n }, () => Array(n).fill(-1));
  return helper(0, 0, n, nums, dp);
};

function helper(ind, jumps, n, nums, dp) {
  if (ind >= n - 1) {
    return jumps;
  }

  if (dp[ind][jumps] != -1) {
    return dp[ind][jumps];
  }

  let mini = Infinity;
  for (let i = 1; i <= nums[ind]; i++) {
    let first = helper(ind + i, jumps + 1, n, nums, dp);
    mini = Math.min(mini, first);
  }

  return (dp[ind][jumps] = mini);
}

// Greedy
var jump = function (nums) {
  // This time we need to return minimum number of jumps needed to reach the end
  // It is given that we will definately reach the end this time
  // We can think of recursion, where we take a possible jumps from a particular index and return the minimum answer and store it
  // Other way is, we can think of taking a range i.e
  // We take jumps = 0 initially, l and r pointer initially at 0 both
  // We will see the farthest index we can jump from current index and store that index inside another variable far
  // we move l = r+1 means we move to next range, move r to far and jump++
  // now l and r contain the range which we can cover using jumpth jump starting from first index
  // do this till r<n-1 or r does not reach last element
  // return jump in the end
  // Another Approach
  // We will take the maximum jump from current index as much as possible to reach the end faster, store it and try it till we reach max index
  let n = nums.length;

  let jumps = 0;
  let maxReach = 0;
  let currReach = 0;

  for (let i = 0; i < n - 1; i++) {
    maxReach = Math.max(maxReach, i + nums[i]);

    if (i == currReach) {
      jumps++;
      currReach = maxReach;
    }
  }

  return jumps;
};

// Fractional Knapsack
/*
Given weights and values of n items, we need to put these items in a knapsack of capacity w to get the maximum total value in the knapsack.
Note: Unlike 0/1 knapsack, you are allowed to break the item here.

Example 1:
Input:
n = 3
w = 50
value[] = {60,100,120}
weight[] = {10,20,30}
Output:
240.000000
Explanation:
Take the item with value 60 and weight 10, value 100 and weight 20 and split the third item with value 120 and weight 30, to fit it into weight 20. so it becomes (120/30)*20=80, so the total value becomes 60+100+80.0=240.0
Thus, total maximum value of item we can have is 240.00 from the given capacity of sack.
*/
/*
class Item{
    constructor(value, weight){
        this.value = value;
        this.weight = weight;
    }
}
*/

class Solution {
  fractionalKnapsack(w, arr, n) {
    // We will try to pick that element first whose value/weight is greater
    // means if weight = 10 and value = 60, value/weight = 6 so it will be beneficial to put this element in the knapsack
    // Here we can take portion of any element also like we can take 1/3rd of value = 120, weight = 30 if we need to make w weight
    // Approach
    // We will think greedily and sort the array based on decreasing values of value/weight such that value/weight is greatest for first elemene
    // We start traversing the array and pick the element if our weight permits
    // otherwise we take porion of it and as soon as we take that portion, we break out as our w weight is full
    // we return the maxValue
    // TC: O(nlogn) + O(n), SC: O(1)
    arr.sort((a, b) => {
      let r1 = a.value / a.weight;
      let r2 = b.value / b.weight;
      return r2 - r1;
    });

    let currWeight = 0,
      currValue = 0;
    for (let i = 0; i < n; i++) {
      if (currWeight + arr[i].weight <= w) {
        // we can add whole weight as we have the capacity
        currWeight += arr[i].weight;
        currValue += arr[i].value;
      } else {
        // we need to take portion of it
        let remaining = w - currWeight;
        // taking the portion of it, (value of 1 unit weight) * remaining weight
        currValue += (arr[i].value / arr[i].weight) * remaining;
        break;
      }
    }

    return currValue;
  }
}

// Number of Coins
/*
Given a value V and array coins[] of size M, the task is to make the change for V cents, given that you have an infinite supply of each of coins{coins1, coins2, ..., coinsm} valued coins. Find the minimum number of coins to make the change. If not possible to make change then return -1.

Example 1:
Input: V = 30, M = 3, coins[] = {25, 10, 5}
Output: 2
Explanation: Use one 25 cent coin
and one 5 cent coin
*/
function minCoins(coins, V, M) {
  // We are given 'V', we need to make V amount using all denominations given in the coins array
  // We are can use a particular coin any number of times
  // We will think greedily and take largest coin possible as many times as possible
  // For that we will sort the array first and then we will start traversing from end of array
  // if we can take that coin we will take it, otherwise leave it
  // go till 0th index and return the resulting array
  // One observation is all denominations > V are discarded automatically
  let arr = [];
  coins.sort((a, b) => a - b);
  for (let i = M - 1; i >= 0; i--) {
    while (V >= coins[i]) {
      V = V - coins[i];
      arr.push(coins[i]);
    }
  }

  return arr;
}

// N meetings in one room
/*
There is one meeting room in a firm. There are N meetings in the form of (start[i], end[i]) where start[i] is start time of meeting i and end[i] is finish time of meeting i.
What is the maximum number of meetings that can be accommodated in the meeting room when only one meeting can be held in the meeting room at a particular time?

Note: Start time of one chosen meeting can't be equal to the end time of the other chosen meeting.

Example 1:
Input:
N = 6
start[] = {1,3,0,5,8,5}
end[] =  {2,4,6,7,9,9}
Output:
4
Explanation:
Maximum four meetings can be held with
given start and end timings.
The meetings are - (1, 2),(3, 4), (5,7) and (8,9)
*/
function maxMeetings(start, end, n) {
  // We have been given starting and finishing time of the meeting
  // We need to do maximum number of meetings possible so for that we need to do those meetings first whose finishing time is lesser so that they finish faster and we can accomodate as many meetings as we can
  // So we will make a data structure which we will sort based on increasing finishing time
  // if any 2 meetings has same finishing time, we keep the one first who occur first
  // Once we have sorted meetings
  // we will store the ending time of current meeting and compare it with starting time of next meeting and based on it, we choose whether we can keep that meeting or not
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push([start[i], end[i]]);
  }

  arr.sort((a, b) => {
    if (a[1] < b[1]) {
      // if a is smaller than b, do nothing
      return -1;
    } else if (a[1] > b[1]) {
      // if a is greater than b, sort it
      return 1;
    } else {
      // if both same, do nothing
      return 0;
    }
  });

  let currMeetingEndTime = arr[0][1];
  let count = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0] > currMeetingEndTime) {
      count++;
      currMeetingEndTime = arr[i][1];
    }
  }

  return count;
}

// Job Sequencing Problem
/*
Given a set of N jobs where each jobi has a deadline and profit associated with it.

Each job takes 1 unit of time to complete and only one job can be scheduled at a time. We earn the profit associated with job if and only if the job is completed by its deadline.

Find the number of jobs done and the maximum profit.

Note: Jobs will be given in the form (Jobid, Deadline, Profit) associated with that Job. Deadline of the job is the time before which job needs to be completed to earn the profit.

Example 1:
Input:
N = 4
Jobs = {(1,4,20),(2,1,10),(3,1,40),(4,1,30)}
Output:
2 60
Explanation:
Job1 and Job3 can be done with
maximum profit of 60 (20+40).
*/
function JobScheduling(arr, n) {
  // We are given with (id, deadline, profit) of each job
  // We need to return maximum number of jobs count, maximum profit we can make
  // We can think greedily and first approach that comes to our mind is, take the job will maximum profit first so for that we need to sort the array based on descending order of profit
  // Now we see whats the highest deadline we have, max the deadline more the time we have to perform maximum jobs
  // let say a job has deadline  =6, so we will prefer to do that job at 6th second and we will use 1,2,3,4,5th second to perform other jobs as it is given that each job takes 1 unit to finish
  // This way we can accomodate maximum jobs
  // We will store the maximum deadline we have in a variable
  // we will declare an array of size maxDeadline initialised with -1 say res
  // We will start tarversing array from first element and store res[i] = jobID to say that current ith unit of time is already allocated
  // we check if res[deadline] is already filled or not, if not filled, fill res[deadline] = jobId[i] or else, we check previous res[deadline-1] block if its available and we keep on checking until we can store that job in our res array
  // once our res array is completely filled, these are max job we can accomodate
  arr.sort((a, b) => {
    return b.profit - a.profit;
  });

  let maxDeadline = arr[0].dead;
  for (let i = 1; i < n; i++) {
    maxDeadline = Math.max(maxDeadline, arr[i].dead);
  }

  // deadlines start from 1 so we make n+1 size
  let res = Array(maxDeadline + 1).fill(-1);

  res[arr[0].dead] = arr[0].id;
  let maxProfit = arr[0].profit;
  let count = 1;

  for (let i = 1; i < n; i++) {
    // we keep j>0 because we do not need to fill 0th index of res as deadline start from 1
    for (let j = arr[i].dead; j > 0; j--) {
      if (res[j] == -1) {
        res[j] = arr[i].id;
        maxProfit += arr[i].profit;
        count++;
        break;
      }
    }
  }

  return [count, maxProfit];
}

// Merge Intervals
/*
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example 1:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
*/
var merge = function (intervals) {
  // We are given the intervals, we need to combine all overlapping intervals into one interval and return all non-overlapping intervals
  // we will find overlapping intervals like, if ending of current is greater than starting of next interval means they can be merged
  // Approach
  // We will sort the array first, we know sorting will be done on ascending order of first element of intervals and if first element for 2 are same then sorting will be done based on ascending order of second element
  // Once we have sorted, we start traversing from first element of array
  // we keep a start variable = intervals[i][0], end variable = intervals[i][1]
  // we will make a ans array to store resultant non-overlapping intervals, we will see if our ans last element ka end contains ending of current intervals[i]
  // if yes, means our last element of res already contains current intervals[i] so continue
  // if not, then we check for j = i+1 till end index, if start of interval[j] comes before ending of intervals[i] means they are overlapping so update ending to intervals[j][1]
  // At last if we do not found any overlapping, means one pair is found break out
  intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1]; // If first elements are the same, sort by the second element
    }
    return a[0] - b[0]; // Otherwise, sort by the first element
  });

  let n = intervals.length;
  let res = [];
  for (let i = 0; i < n; i++) {
    let start = intervals[i][0];
    let end = intervals[i][1];

    if (res.length != 0 && res[res.length - 1][1] >= end) {
      continue;
    }

    for (let j = i + 1; j < n; j++) {
      if (intervals[j][0] <= end) {
        // merge them so our end pointer updates
        end = Math.max(end, intervals[j][1]);
      } else {
        // no need of merging, its already overlapping
        break;
      }
    }
    // this is start,end of a non-overlapping interval so store it
    res.push([start, end]);
  }

  return res;
};

// Valid Parenthesis String
/*
Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

Example 1:
Input: s = "()"
Output: true
*/
var checkValidString = function (s) {
  // Brute force: Recursion, trying all possible ways
  // Problem statement is very simple
  // For every ( there should be a ) which appears before it
  // We can modify * to be a ( or ) or ' ' and check which way it makes the string valid
  // let say we forget about * and we have s = ((())), how do we solve it?
  // We take a count = 0, we start from 0th index and for each '(' we do count++, for each ')' we do count-- and at the end. if our count = 0, means we have equal number of ( and )
  // but if anytime our count < 0 means we have an extra ( or ) so return false at that very moment.
  // Let us now analyze what will be our approach if * is also present there
  // Let say we start from ind = 0, count = 0 initially
  // We start recursively, if s[ind] == '(' we do count++
  // if s[ind] == ')' we do count--
  // if s[ind] == '*', we try out all possible ways, we first try '(' in place of * and do count++ then we try ')' and do count-- and then we try ' ' empty string and do count as it is (no change) and whatever gives us true, we return true and do not check for further combinations.
  // if we reach the end of string this way and count==0 means return true else return false, if we reach anytime count<0 return false simply
  // TC: 3^n as 3 branches forming in each case, SC: O(n) as we go till last index and make n number of calls
  // After applying DP, TC: O(N^2), SC: O(N^2)
  let dp = Array.from({ length: s.length }, () => Array(s.length).fill(-1));
  return helper(0, 0, s, dp);
};

function helper(ind, count, s, dp) {
  // base case
  if (count < 0) {
    return false;
  }

  if (ind == s.length) {
    return count == 0;
  }

  if (dp[ind][count] != -1) {
    return dp[ind][count];
  }

  if (s[ind] == "(") {
    return (dp[ind][count] = helper(ind + 1, count + 1, s, dp));
  }

  if (s[ind] == ")") {
    return (dp[ind][count] = helper(ind + 1, count - 1, s, dp));
  }

  // else its a * so consider all three cases
  return (dp[ind][count] =
    helper(ind + 1, count + 1, s, dp) ||
    helper(ind + 1, count - 1, s, dp) ||
    helper(ind + 1, count, s, dp));
}

// Optimised
var checkValidString = function (s) {
  // Optimised Approach
  // Till now, we were maintaining a count variable and we do count++ for ( and count-- for )
  // In the recursion, as soon as we encounter *, we draw 3 posssible scenerios, where we do count++ or count-- or count stays the same
  // Now instead of maintaining count, we will maintain a range using 2 variables min and max which are 0 initially
  // if we encounter ( we do min++, max++
  // if we encounter ) we do min--, max--
  // At any time, we do not consider min<0 values so if anytime min becomes < 0 we make min = 0
  // if we encounter *, we know either count goes -1, 0 or +1 based on if we choose ( or ) or ' '
  // We are ignoring -1 values so min = min--, max = max++ and make a check if min<0, make min = 0 which say the range of value of count which can go till now
  // edge case, if our s starts from ')' then our min<0 and max<0 at that case straight away return false as we cannot have a valid string if first index contains ')' because to make a string valid, we need '(' before ')'
  // At the end of array if our range contains 0 in min means yes, there is a valid string
  // TC: O(n), SC:O(1)
  let min = 0,
    max = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      // if its ( then simply ++ both
      min = min + 1;
      max = max + 1;
    } else if (s[i] == ")") {
      // if its ) then simply -- both
      min = min - 1;
      max = max - 1;
    } else {
      // * can give us count+1, count-1 or count means -1,0,+1
      // we are ignoring -1 values, so min = -1 if its ), max = +1 if its ( and check min<0 then make min=0
      min = min - 1;
      max = max + 1;
    }

    if (min < 0) {
      min = 0;
    }

    if (max < 0) {
      return false;
    }
  }

  return min == 0;
};

// Candy
/*
There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:

Each child must have at least one candy.
Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to have to distribute the candies to the children.

Example 1:
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
*/
var candy = function (ratings) {
  // We need to distribute candies in such a way that if any element has greater rating than its neighbour, give him candies more than its neighbours
  // In process of distributing candies in such a way, distribute minimum candies possible following the conditions
  // each element should have atleast 1 candy
  // What we can do is, we can maintain a left array where left[0] = 1 already and we start from index 1 to n and if only check left neightbour of each element
  // if neighbour < current, candy = candy[i-1]+1
  // if neighbour > current, candy = 1 (because we need to distribute minimum candies in such a way keeping all conditions in mind)
  // Now we maintain a right array where we fill right[n-1] = 1
  // we start traversing from n-2th index to 0th index
  // we check only the right neighbour and if right_neighbour > current, candy = 1
  // else candy = candy[i+1] + 1
  // Now we need to take maximum candies so that all condition satisfies so we take a sum = 0, run a loop and add max(left[i],right[i]) in sum and return it
  // TC: O(3N), SC: O(2N)
  let n = ratings.length;
  let left = Array(n),
    right = Array(n);
  (left[0] = 1), (right[n - 1] = 1);
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      left[i] = left[i - 1] + 1;
    } else {
      left[i] = 1;
    }
  }

  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      right[i] = right[i + 1] + 1;
    } else {
      right[i] = 1;
    }
  }

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += Math.max(left[i], right[i]);
  }

  return sum;
};

// Optimised, Slope Method
var candy = function (ratings) {
  // Optimised approach
  // We can try the slope method where we draw a slope of the array
  // Now slope can be of 3 types, increasing, decreasing, flat
  // On increasing slope we see rating[i] > rating[i-1] so each time we give one more candy than previous one and we take a variable peak which tells the peak of that increasing slope we just encountered
  // it might happen that after an increasing slope, we encounter decreasing slope or flat slope so
  // for flat slope we do nothing means rating[i]==rating[i-1] so just give one one candy to each guy
  // for decreasing slope, we again start distributing candies +1 everytime we reach end of decreasing slope, order does not matter to us because we just need summation, we maintain a variable down which stores the least element of that decreasing slope
  // Now one element will be there which will be considered in both increasing and decreasing slope and its candy value should be such that the candy distribution should satisfy both its neighbours so
  // if peak > down, we do not do anything, means we have already considered maximum value for that element but if down > peak, we need to consider the maximum value of that element so sum += down-peak
  // We will add that extra value in it to make it satisfy the condition
  // This way we reach the end of array
  // TC: O(n), SC: O(1)
  let sum = 1; // considering we start from index = 1 as 0th index will always get one candy
  let i = 1;
  let n = ratings.length;
  while (i < n) {
    if (ratings[i] == ratings[i - 1]) {
      sum += 1;
      i++;
      continue;
    }

    // this initialises to 1 for every new increasing slope
    let peak = 1;
    while (i < n && ratings[i] > ratings[i - 1]) {
      // increasing slope
      // we need to distribute one candy more than previous so peak++ then sum += peak
      peak++;
      sum += peak;
      i++;
    }

    // this initialises to 1 for every new decreasing slope
    let down = 1;
    while (i < n && ratings[i] < ratings[i - 1]) {
      // decreasing slope
      // again we start distributing from 1 candy and do ++ till we reach end of this decreasing slope, order does not matter because we need summation at the end
      sum += down;
      down++;
      i++;
    }

    if (down > peak) {
      sum += down - peak;
    }
  }

  return sum;
};

// Insert Interval
/*
You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Note that you don't need to modify intervals in-place. You can make a new array and return it.

Example 1:
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
*/
var insert = function (intervals, newInterval) {
  // It is given that the intervals is sorted in ascending order
  // array of non-overlapping intervals intervals
  // means intervals is non-overlapping initially so this breaks out our problem into 3 parts
  // where we have non-overlapping part
  // overlapping part with newInterval on which we will work upon
  // again a non-overlapping part which remains as it is
  // We pick the overlapping part starting ka first element and ending ka last element and merge them all into one interval and insert it
  // if there do not overlap, we insert them keeping the order sorted as it is
  let res = [];
  let i = 0;
  let n = intervals.length;

  // there is non-overlapping part on left, then add it as it is
  while (i < n && intervals[i][1] < newInterval[0]) {
    // if ending of current is happening before starting of newInterval means its non over-lapping
    res.push(intervals[i]);
    i++;
  }

  // overlapping part if any
  while (i < n && intervals[i][0] <= newInterval[1]) {
    // if starting of new interval is smaller than ending of current interval means they overlap so
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
    i++;
  }

  res.push(newInterval);

  // there is non-overlapping part on right, then add it as it is
  while (i < n) {
    res.push(intervals[i]);
    i++;
  }

  return res;
};

// Minimum Increment to Make Array Unique
/*
You are given an integer array nums. In one move, you can pick an index i where 0 <= i < nums.length and increment nums[i] by 1.

Return the minimum number of moves to make every value in nums unique.

The test cases are generated so that the answer fits in a 32-bit integer.

Example 1:
Input: nums = [1,2,2]
Output: 1
Explanation: After 1 move, the array could be [1, 2, 3].

Example 2:
Input: nums = [3,2,1,2,1,7]
Output: 6
Explanation: After 6 moves, the array could be [3, 4, 1, 2, 5, 7].
It can be shown with 5 or less moves that it is impossible for the array to have all unique values.
*/
var minIncrementForUnique = function (nums) {
  // Optimised Solution
  // We will apply greedy method
  // Sort the array first, [3,2,1,2,1,7] becomes [1,1,2,2,3,7]
  // Now we start traversing from index = 1
  // We check if index[i-1]==index[i],
  // if yes, nums[i] = nums[i+1], count++
  // if nums[i] < nums[i-1], say array looks like [1,2,3,2 (this should be 4 ideally buts its 2, so 3-2 = 1, if we do nums[i-1] + diff that is 3+1 = 4 and count = diff + 1),3,7]
  let count = 0;
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] == nums[i - 1]) {
      nums[i] += 1;
      count += 1;
    } else if (nums[i] < nums[i - 1]) {
      let diff = Math.abs(nums[i] - nums[i - 1]);
      nums[i] += diff + 1;
      count += diff + 1;
    }
  }

  return count;
};

// Most Profit Assigning Work
/*
You have n jobs and m workers. You are given three arrays: difficulty, profit, and worker where:

difficulty[i] and profit[i] are the difficulty and the profit of the ith job, and
worker[j] is the ability of jth worker (i.e., the jth worker can only complete a job with difficulty at most worker[j]).
Every worker can be assigned at most one job, but one job can be completed multiple times.

For example, if three workers attempt the same job that pays $1, then the total profit will be $3. If a worker cannot complete any job, their profit is $0.
Return the maximum profit we can achieve after assigning the workers to the jobs.

Example 1:
Input: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
Output: 100
Explanation: Workers are assigned jobs of difficulty [4,4,6,6] and they get a profit of [20,20,30,30] separately.

Example 2:
Input: difficulty = [85,47,57], profit = [24,66,99], worker = [40,25,25]
Output: 0
*/
var maxProfitAssignment = function (difficulty, profit, worker) {
  // Means we have been given the work of units in worker[] for each worker
  // Difficulty[] gives us the unit of that ith job for the worker to perform
  // profit[] gives us the profit worker will get for completing ith job
  // one job can be finished by multiple workers
  // We need to return the maximum profit
  // We see to maximise our profit, we need to pick the job with highest profit such that difficulty[] is wiithin worker[j] ability
  // First of all let us store [profit[i],difficulty[i]] as a pair and sort the array based on profit[i] in descending order say array name is arr
  // sort the worker array also
  // Once we have sorted it, let us start picking from the first value of our arr array and match if difficulty is below ability of worker? if yes, add it in the maxProfit
  let arr = [];
  let n = profit.length;
  // Storing [difficulty[i],profit[i]]
  for (let i = 0; i < n; i++) {
    arr.push([profit[i], difficulty[i]]);
  }

  // sorting it in descending order of profit so max profit remains at top
  arr.sort((a, b) => {
    if (a[0] == b[0]) {
      return a[1] - b[1];
    } else {
      return b[0] - a[0];
    }
  });

  // sort the workers on ascending order so that maximum able can be assigned first
  worker.sort((a, b) => b - a);

  // pick each worker and check its ability, compare it with difficulty of work
  let maxProfit = 0;
  for (let i = 0; i < worker.length; i++) {
    let j = 0;
    while (j < arr.length && arr[j][1] > worker[i]) {
      j++;
    }

    // if we did not find any work accoriding to workers ability means add 0 in the profit as no work can be assigned to that worker
    if (j == arr.length) {
      maxProfit += 0;
    } else {
      // else add the profit
      maxProfit += arr[j][0];
    }
  }

  // return the profit
  return maxProfit;
};
