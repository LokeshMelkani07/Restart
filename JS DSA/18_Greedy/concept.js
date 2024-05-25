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
