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
