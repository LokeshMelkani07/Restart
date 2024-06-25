// Notes: https://drive.google.com/file/d/1SGV46LgE8X4N5-cbBR54hQb2dFHphT2E/view?usp=sharing
// DP on Subsequences

// Subset Sum Problem
/*
You are given an array/list ‘ARR’ of ‘N’ positive integers and an integer ‘K’. Your task is to check if there exists a subset in ‘ARR’ with a sum equal to ‘K’.

Note: Return true if there exists a subset with sum equal to ‘K’. Otherwise, return false.

For Example :
If ‘ARR’ is {1,2,3,4} and ‘K’ = 4, then there exists 2 subsets with sum = 4. These are {1,3} and {4}. Hence, return true.
Returns true if there exists a subsequence of `A[0…n]` with the given sum
*/
function subsetSumToK(arr, n, k) {
  let dp = Array.from({ length: n }, () => Array(k + 1).fill(-1));

  function helper(n, k, dp) {
    if (k === 0) return true;
    if (n === 0) return arr[0] == k;

    if (dp[n][k] !== -1) return dp[n][k];

    let notPick = helper(n - 1, k, dp);
    let pick = false;
    if (arr[ind] >= k) {
      // then only we can pick
      pick = helper(n - 1, k - arr[n], dp);
    }

    return (dp[n][k] = pick | notPick);
  }

  return helper(n, k);
}

// bottom up

// Function to check if a subset of an array can sum up to a target value
function subsetSumToKTabulation(n, k, arr) {
  // Create a 2D array 'dp' to memoize subproblem results
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(k + 1).fill(false);
  }

  // Base case: If the target is 0, an empty subset is always a valid solution
  for (let i = 0; i < n; i++) {
    dp[i][0] = true;
  }

  // Fill the dp array using dynamic programming
  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      // Check if the current element can be included in the subset
      const notTaken = dp[i - 1][j];
      const taken = arr[i] <= j ? dp[i - 1][j - arr[i]] : false;
      dp[i][j] = notTaken || taken;
    }
  }

  // The final result is stored in dp[n-1][k]
  return dp[n - 1][k];
}

// Space Optimisation

function subsetSumToK(n, k, arr) {
  // Initialize a boolean array 'prev' to store the previous row of the DP table
  const prev = new Array(k + 1).fill(false);

  // Base case: If the target is 0, an empty subset is always a valid solution
  prev[0] = true;

  // Initialize the first element of 'prev' based on the value of the first element in 'arr'
  if (arr[0] <= k) {
    prev[arr[0]] = true;
  }

  // Loop through the elements of 'arr' and calculate the DP table row by row
  for (let ind = 1; ind < n; ind++) {
    // Initialize a new boolean array 'cur' for the current row
    const cur = new Array(k + 1).fill(false);

    // Base case: An empty subset is always a valid solution
    cur[0] = true;

    for (let target = 1; target <= k; target++) {
      // Check if the current element can be included in the subset
      const notTaken = prev[target];
      const taken = arr[ind] <= target ? prev[target - arr[ind]] : false;
      cur[target] = notTaken || taken;
    }

    // Set 'cur' as the new 'prev' for the next iteration
    prev = curr;
  }

  // The final result is stored in prev[k]
  return prev[k];
}

// Partition Equal Subset Sum
/*
Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

Example 1:
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
*/
var canPartition = function (nums) {
  // find total sum
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
  }

  // if total sum is odd, return false
  if (total % 2) return false;

  let targetSum = total / 2;
  // otherwise if we can find any subset with sum = total/2 in nums, then we can do partition

  //Initialising DP matrix
  var dp = new Array(nums.length + 1)
    .fill(-1)
    .map(() => new Array(targetSum + 1).fill(-1));

  //Calling helper function
  return helper(targetSum, nums, dp, nums.length);
};

//Helper function for finding a particular subset sum
//(in this case sum = sum of array/2)
var helper = function (sum, nums, dp, n) {
  //we reached end of array but sum didn't get zero, so false
  if (n == 0 && sum != 0) return false;

  //if sum became zero, then true
  if (sum == 0) return true;

  //Memoization check
  if (dp[n][sum] != -1) return dp[n][sum];

  //Either select the number and decrease sum, or don't select the number and continue, if any recursive call gives true it's true.
  return (dp[n][sum] =
    helper(sum - nums[n - 1], nums, dp, n - 1) || helper(sum, nums, dp, n - 1));
};

// Partition Array Into Two Arrays to Minimize Sum Difference
/*
You are given an integer array nums of 2 * n integers. You need to partition nums into two arrays of length n to minimize the absolute difference of the sums of the arrays. To partition nums, put each element of nums into one of the two arrays.

Return the minimum possible absolute difference.

Example 1:
Input: nums = [3,9,7,3]
Output: 2
Explanation: One optimal partition is: [3,9] and [7,3].
The absolute difference between the sums of the arrays is abs((3 + 9) - (7 + 3)) = 2.
*/
var minimumDifference = function (nums) {
  let total = 0;
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    total += nums[i];
  }

  let dp = Array.from({ length: n }, () => Array(total + 1).fill(0));
  let k = total;
  for (let i = 0; i < n; i++) {
    dp[i][0] = true;
  }

  if (nums[0] <= k) dp[0][nums[0]] = true;

  for (let ind = 1; ind < n; ind++) {
    for (let target = 1; target <= k; target++) {
      let notPick = dp[ind - 1][target];
      let pick = false;
      if (nums[ind] <= target) {
        pick = dp[ind - 1][target - nums[ind]];
      }

      dp[ind][target] = pick | notPick;
    }
  }

  // we have dp table filled
  // We fill the dp table for "subset sum equal to k"
  // In the table dp[n][k] means for nth index, sum = k possible or not
  // So to solve current problem, we make use of that filled dp table
  // Iterate over all value of k in last row, such that everytime we pick s1 = k, s2 = target - s1 and take |s1-s2| and take minimum as output
  // To optimise it further and avoid repeating values, we can iterate only till k/2
  let mini = 1e9;
  for (let i = 0; i <= total / 2; i++) {
    if (dp[n - 1][i] == true) {
      let s1 = i;
      let s2 = total - s1;
      mini = Math.min(mini, Math.abs(s1 - s2));
    }
  }

  return mini;
};

// Perfect Sum Problem
/*
Given an array arr of non-negative integers and an integer sum, the task is to count all subsets of the given array with a sum equal to a given sum.

Note: Answer can be very large, so, output answer modulo 109+7.

Example 1:
Input:
N = 6
arr = [5, 2, 3, 10, 6, 8]
sum = 10
Output:
3
Explanation:
{5, 2, 3}, {2, 8}, {10} are possible subsets.
*/
class Solution {
  perfectSum(arr, n, sum) {
    let dp = Array.from({ length: n }, () => Array(sum + 1).fill(-1));
    return this.helper(n - 1, arr, n, sum, dp);
  }

  helper(ind, arr, n, sum, dp) {
    // Top Down Approach
    if (sum == 0) {
      return 1;
    }

    if (ind == 0) {
      return arr[0] == sum;
    }

    if (dp[ind][sum] != -1) {
      return dp[ind][sum];
    }

    // pick not pick
    let notPick = this.helper(ind - 1, arr, n, sum, dp);
    let pick = 0;
    if (arr[ind] <= sum) {
      pick = this.helper(ind - 1, arr, n, sum - arr[ind], dp);
    }

    return (dp[ind][sum] = pick + notPick);
  }
}

// Bottom Up
function perfectSum(arr, n, s) {
  // Bottom up
  let dp = Array.from({ length: n }, () => Array(s + 1).fill(0));

  for (let i = 0; i < n; i++) {
    dp[i][0] = 1;
  }

  if (arr[0] <= s) {
    dp[0][arr[0]] = 1;
  }

  for (let ind = 1; ind < n; ind++) {
    for (let sum = 1; sum <= s; sum++) {
      // pick not pick
      let notPick = dp[ind - 1][sum];
      let pick = 0;
      if (arr[ind] <= sum) {
        pick = dp[ind - 1][sum - arr[ind]];
      }

      dp[ind][sum] = pick + notPick;
    }
  }

  return dp[n - 1][s];
}

// Space Optimisation
function perfectSumSpaceOptimised(arr, n, s) {
  // Space Optimisation
  let prev = Array(s + 1).fill(0),
    curr = Array(s + 1);
  prev[0] = curr[0] = 1;
  if (arr[0] <= s) {
    prev[arr[0]] = 1;
  }

  for (let ind = 1; ind < n; ind++) {
    for (let sum = 1; sum <= s; sum++) {
      // pick not pick
      let notPick = prev[sum];
      let pick = 0;
      if (arr[ind] <= sum) {
        pick = prev[sum - arr[ind]];
      }

      curr[sum] = pick + notPick;
    }

    prev = curr;
  }

  return prev[s];
}

// Partitions with Given Difference
/*
Given an array arr, partition it into two subsets(possibly empty) such that each element must belong to only one subset. Let the sum of the elements of these two subsets be S1 and S2.
Given a difference d, count the number of partitions in which S1 is greater than or equal to S2 and the difference between S1 and S2 is equal to d. Since the answer may be large return it modulo 109 + 7.

Example 1:
Input:
n = 4
d = 3
arr[] =  { 5, 2, 6, 4}
Output: 1
Explanation:
There is only one possible partition of this array. Partition : {6, 4}, {5, 2}. The subset difference between subset sum is: (6 + 4) - (5 + 2) = 3.
*/
class Solution {
  perfectSum(arr, n, sum) {
    let dp = Array.from({ length: n }, () => Array(sum + 1).fill(-1));
    return this.helper(n - 1, arr, n, sum, dp);
  }

  helper(ind, arr, n, sum, dp) {
    // handling the {0,0,1} case
    if (ind == 0) {
      if (sum == 0 && arr[0] == 0) return 2;
      if (sum == 0 || arr[ind] == sum) return 1;
      return 0;
    }

    if (dp[ind][sum] != -1) {
      return dp[ind][sum];
    }

    // pick not pick
    let notPick = this.helper(ind - 1, arr, n, sum, dp);
    let pick = 0;
    if (arr[ind] <= sum) {
      pick = this.helper(ind - 1, arr, n, sum - arr[ind], dp);
    }

    return (dp[ind][sum] = pick + notPick);
  }

  countPartitions(n, d, arr) {
    let total = 0;
    for (let i = 0; i < n; i++) {
      total += arr[i];
    }

    if (total - d < 0 || (total - d) % 2 == 1) return 0;
    return this.perfectSum(arr, n, (total - d) / 2);
  }
}

// 0 - 1 Knapsack Problem
/*
You are given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. Note that we have only one quantity of each item.
In other words, given two integer arrays val[0..N-1] and wt[0..N-1] which represent values and weights associated with N items respectively. Also given an integer W which represents knapsack capacity, find out the maximum value subset of val[] such that sum of the weights of this subset is smaller than or equal to W. You cannot break an item, either pick the complete item or dont pick it (0-1 property).

Example 1:
Input:
N = 3
W = 4
values[] = {1,2,3}
weight[] = {4,5,1}
Output: 3
Explanation: Choose the last item that weighs 1 unit and holds a value of 3.
*/

// Top Down Approach
class Solution {
  //Function to return max value that can be put in knapsack of capacity W.
  knapSack(W, wt, val, n) {
    // Top down approach
    let dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(-1));
    return this.helper(n - 1, W, wt, val, n, dp);
  }

  helper(ind, W, wt, val, n, dp) {
    // base case
    if (ind == 0) {
      if (wt[0] <= W) {
        return val[0];
      } else {
        return 0;
      }
    }

    if (dp[ind][W] != -1) {
      return dp[ind][W];
    }

    // pick / not pick
    let notPick = this.helper(ind - 1, W, wt, val, n, dp);
    let pick = -Infinity;
    if (wt[ind] <= W) {
      pick = val[ind] + this.helper(ind - 1, W - wt[ind], wt, val, n, dp);
    }

    return (dp[ind][W] = Math.max(pick, notPick));
  }
}

// Bottom Up Approach
function knapSackTabulation(W, wt, val, n) {
  // Bottom Up approach
  let dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  for (let i = wt[0]; i <= W; i++) {
    dp[0][i] = val[0];
  }

  for (let ind = 1; ind < n; ind++) {
    for (let j = 0; j <= W; j++) {
      // pick / not pick
      let notPick = dp[ind - 1][j];
      let pick = -Infinity;
      if (wt[ind] <= j) {
        pick = val[ind] + dp[ind - 1][j - wt[ind]];
      }

      dp[ind][j] = Math.max(pick, notPick);
    }
  }

  return dp[n - 1][W];
}

// Space Optimisation
function spaceOptimisedknapSack(W, wt, val, n) {
  // Space Optimisation
  let prev = Array(W + 1).fill(0);
  let curr = Array(W + 1).fill(0);

  for (let i = wt[0]; i <= W; i++) {
    prev[i] = val[0];
  }

  for (let ind = 1; ind < n; ind++) {
    for (let j = 0; j <= W; j++) {
      // pick / not pick
      let notPick = 0 + prev[j];
      let pick = -Infinity;
      if (wt[ind] <= j) {
        pick = val[ind] + prev[j - wt[ind]];
      }

      curr[j] = Math.max(pick, notPick);
    }
    prev = curr;
  }

  return prev[W];
}

// Coin Change
/*
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Example 1:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
*/
var coinChange = function (coins, amount) {
  let n = coins.length;
  let dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(-1));
  let minCoins = helper(n - 1, coins, amount, dp);
  return minCoins === 1e9 ? -1 : minCoins;
};

function helper(ind, coins, target, dp) {
  // base case
  if (ind == 0) {
    if (target % coins[ind] == 0) {
      return target / coins[ind];
    } else {
      return 1e9;
    }
  }

  if (dp[ind][target] != -1) {
    return dp[ind][target];
  }

  let res = -1;

  // take or not take
  let notTake = 0 + helper(ind - 1, coins, target, dp);
  let take = +Infinity;
  if (coins[ind] <= target) {
    take = 1 + helper(ind, coins, target - coins[ind], dp);
  }

  res = Math.min(take, notTake);
  return (dp[ind][target] = res);
}

// Bottom Up
var coinChange = function (coins, amount) {
  // Bottom Up approach
  let n = coins.length;
  let dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(-1));

  for (let T = 0; T <= amount; T++) {
    if (T % coins[0] == 0) {
      dp[0][T] = T / coins[0];
    } else {
      dp[0][T] = 1e9;
    }
  }

  for (let ind = 1; ind < n; ind++) {
    for (let target = 0; target <= amount; target++) {
      // take or not take
      let notTake = 0 + dp[ind - 1][target];
      let take = +Infinity;
      if (coins[ind] <= target) {
        take = 1 + dp[ind][target - coins[ind]];
      }

      res = Math.min(take, notTake);
      dp[ind][target] = res;
    }
  }

  if (dp[n - 1][amount] === 1e9) {
    return -1;
  } else {
    return dp[n - 1][amount];
  }
};

// Space Optimisation
var coinChange = function (coins, amount) {
  // Space Optimisation
  let n = coins.length;
  let prev = Array(amount + 1).fill(-1);
  let curr = Array(amount + 1);
  for (let T = 0; T <= amount; T++) {
    if (T % coins[0] == 0) {
      prev[T] = T / coins[0];
    } else {
      prev[T] = 1e9;
    }
  }

  for (let ind = 1; ind < n; ind++) {
    for (let target = 0; target <= amount; target++) {
      // take or not take
      let notTake = 0 + prev[target];
      let take = +Infinity;
      if (coins[ind] <= target) {
        take = 1 + curr[target - coins[ind]];
      }

      res = Math.min(take, notTake);
      curr[target] = res;
    }
    prev = curr;
  }

  if (prev[amount] === 1e9) {
    return -1;
  } else {
    return prev[amount];
  }
};

// Target Sum
/*
You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

Example 1:
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
*/
var findTargetSumWays = function (nums, target) {
  // below is the code for "Partitions with Given Difference" we just copy paste the code, thats it
  return countPartitions(nums.length, target, nums);
};

function perfectSum(arr, n, sum) {
  let dp = Array.from({ length: n }, () => Array(sum + 1).fill(-1));
  return helper(n - 1, arr, n, sum, dp);
}

function helper(ind, arr, n, sum, dp) {
  // handling the {0,0,1} case
  if (ind == 0) {
    if (sum == 0 && arr[0] == 0) return 2;
    if (sum == 0 || arr[ind] == sum) return 1;
    return 0;
  }

  if (dp[ind][sum] != -1) {
    return dp[ind][sum];
  }

  // pick not pick
  let notPick = helper(ind - 1, arr, n, sum, dp);
  let pick = 0;
  if (arr[ind] <= sum) {
    pick = helper(ind - 1, arr, n, sum - arr[ind], dp);
  }

  return (dp[ind][sum] = pick + notPick);
}

function countPartitions(n, d, arr) {
  let total = 0;
  for (let i = 0; i < n; i++) {
    total += arr[i];
  }

  if (total - d < 0 || (total - d) % 2 == 1) return 0;
  return perfectSum(arr, n, (total - d) / 2);
}

// Coin Change II
/*
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.
You may assume that you have an infinite number of each kind of coin.
The answer is guaranteed to fit into a signed 32-bit integer.

Example 1:
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
*/
var change = function (amount, coins) {
  let n = coins.length;
  let memo = Array.from({ length: n }, () => Array(amount + 1).fill(-1));
  return helper(n - 1, amount, coins, memo);
};

function helper(ind, target, coins, memo) {
  // Base case: if the target is 0, there is one way to make the amount (by choosing no coins)
  if (target == 0) return 1;

  // Base case: if there are no coins left and the target is not 0, there is no way to make the amount
  if (ind < 0) return 0;

  // Check if the result is already computed
  if (memo[ind][target] != -1) return memo[ind][target];

  // Recurrence relation: exclude the current coin
  let notPick = helper(ind - 1, target, coins, memo);

  // Recurrence relation: include the current coin
  let pick = 0;
  if (coins[ind] <= target) {
    pick = helper(ind, target - coins[ind], coins, memo);
  }

  // Store the result in memo table
  memo[ind][target] = pick + notPick;

  return memo[ind][target];
}

// Bottom Up
var change = function (amount, coins) {
  // Tabulation
  let n = coins.length;
  let dp = Array.from({ length: n }, () => Array(amount + 1).fill(0));

  for (let i = 0; i < n; i++) {
    dp[i][0] = 1;
  }

  for (let T = 0; T <= amount; T++) {
    dp[0][T] = T % coins[0] == 0;
  }

  for (let ind = 1; ind < n; ind++) {
    for (let target = 0; target <= amount; target++) {
      // Recurrence relation: exclude the current coin
      let notPick = dp[ind - 1][target];

      // Recurrence relation: include the current coin
      let pick = 0;
      if (coins[ind] <= target) {
        pick = dp[ind][target - coins[ind]];
      }

      // Store the result in memo table
      dp[ind][target] = pick + notPick;
    }
  }

  return dp[n - 1][amount];
};

// Knapsack with Duplicate Items
/*
Given a set of N items, each with a weight and a value, represented by the array w and val respectively. Also, a knapsack with weight limit W.
The task is to fill the knapsack in such a way that we can get the maximum profit. Return the maximum profit.
Note: Each item can be taken any number of times.

Example 1:
Input:
N = 2
W = 3
val = {1, 1}
wt = {2, 1}
Output:
3
Explanation:
1.Pick the 2nd element thrice.
2.Total profit = 1 + 1 + 1 = 3. Also the total weight = 1 + 1 + 1  = 3 which is <= 3.
*/
class Solution {
  // Top Down Approach
  knapSack(N, W, val, wt) {
    let dp = Array.from({ length: N }, () => Array(W + 1).fill(-1));
    return this.helper(N - 1, W, val, wt, dp);
  }

  helper(ind, W, val, wt, dp) {
    if (ind == 0) {
      return parseInt(W / wt[0]) * val[0];
    }

    if (dp[ind][W] != -1) {
      return dp[ind][W];
    }

    // pick or not pick
    let notPick = 0 + this.helper(ind - 1, W, val, wt, dp);
    let pick = -Infinity;
    if (wt[ind] <= W) {
      pick = val[ind] + this.helper(ind, W - wt[ind], val, wt, dp);
    }

    return (dp[ind][W] = Math.max(pick, notPick));
  }
}

// Bottom Up
function bottomUpknapSack(N, W, val, wt) {
  let dp = Array.from({ length: N }, () => Array(W + 1).fill(0));

  // base case
  for (let w = 0; w <= W; w++) {
    dp[0][w] = parseInt(w / wt[0]) * val[0];
  }

  for (let ind = 1; ind < N; ind++) {
    for (let target = 0; target <= W; target++) {
      // pick or not pick
      let notPick = 0 + dp[ind - 1][target];
      let pick = -Infinity;
      if (wt[ind] <= target) {
        pick = val[ind] + dp[ind][target - wt[ind]];
      }

      dp[ind][target] = Math.max(pick, notPick);
    }
  }

  return dp[N - 1][W];
}

// Space Optimisation
function spaceOptimisedknapSack(N, W, val, wt) {
  let prev = Array(W + 1).fill(0),
    curr = Array(W + 1);
  // base case
  for (let w = 0; w <= W; w++) {
    prev[w] = parseInt(w / wt[0]) * val[0];
  }

  for (let ind = 1; ind < N; ind++) {
    for (let target = 0; target <= W; target++) {
      // pick or not pick
      let notPick = 0 + prev[target];
      let pick = -Infinity;
      if (wt[ind] <= target) {
        pick = val[ind] + curr[target - wt[ind]];
      }

      curr[target] = Math.max(pick, notPick);
    }

    prev = curr;
  }

  return prev[W];
}

// Rod Cutting
/*
Given a rod of length N inches and an array of prices, price[]. price[i] denotes the value of a piece of length i. Determine the maximum value obtainable by cutting up the rod and selling the pieces.
Note: Consider 1-based indexing.

Example 1:
Input:
N = 8
Price[] = {1, 5, 8, 9, 10, 17, 17, 20}
Output:
22
Explanation:
The maximum obtainable value is 22 by
cutting in two pieces of lengths 2 and
6, i.e., 5+17=22.
*/
// Top Down
class Solution {
  cutRod(price, n) {
    let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(-1));
    return this.helper(n - 1, price, n, dp);
  }

  helper(ind, price, N, dp) {
    if (ind == 0) {
      return N * price[0];
    }

    if (dp[ind][N] != -1) {
      return dp[ind][N];
    }

    // pick, not pick
    let notPick = 0 + this.helper(ind - 1, price, N, dp);
    let pick = -Infinity;
    let rodLength = ind + 1;
    if (rodLength <= N) {
      pick = price[ind] + this.helper(ind, price, N - rodLength, dp);
    }

    return (dp[ind][N] = Math.max(pick, notPick));
  }
}

// Bottom Up
function tabulationcutRod(price, n) {
  let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(-1));

  for (let i = 0; i <= n; i++) {
    dp[0][i] = i * price[0];
  }

  for (let ind = 1; ind < n; ind++) {
    for (let N = 0; N <= n; N++) {
      // pick, not pick
      let notPick = 0 + dp[ind - 1][N];
      let pick = -Infinity;
      let rodLength = ind + 1;
      if (rodLength <= N) {
        pick = price[ind] + dp[ind][N - rodLength];
      }

      dp[ind][N] = Math.max(pick, notPick);
    }
  }

  return dp[n - 1][n];
}

// Space Optimisation
function spaceOptimisedcutRod(price, n) {
  let prev = Array(n + 1).fill(0);
  let curr = Array(n + 1);
  for (let i = 0; i <= n; i++) {
    prev[i] = i * price[0];
  }

  for (let ind = 1; ind < n; ind++) {
    for (let N = 0; N <= n; N++) {
      // pick, not pick
      let notPick = 0 + prev[N];
      let pick = -Infinity;
      let rodLength = ind + 1;
      if (rodLength <= N) {
        pick = price[ind] + curr[N - rodLength];
      }

      curr[N] = Math.max(pick, notPick);
    }

    prev = curr;
  }

  return prev[n];
}
