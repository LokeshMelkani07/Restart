// 1D DP
// Notes: https://drive.google.com/file/d/1t23sV3fzju-kjmtw243CjMRWKr7juq98/view?usp=sharing

// Climbing Stairs
/*
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?


Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
*/
var climbStairs = function (n) {
  // Top Down Approach
  // We will start from the last step given and try to move to top
  // Either we can take 1 step or 2 step
  // Base case is when we reach ind==0 or ind==1 as in both cases we can finish at the top because 1 or 2 step are allowed
  // It is told to count the number of ways so we use + of both ways
  let dp = Array(n + 1).fill(-1);
  return helper(n, dp);
};

function helper(ind, dp) {
  if (ind == 0) {
    return 1;
  }

  if (ind == 1) {
    return 1;
  }

  if (dp[ind] != -1) {
    return dp[ind];
  }

  let left = helper(ind - 1, dp);
  let right = helper(ind - 2, dp);

  return (dp[ind] = left + right);
}

// Geek Jump
/*
 Geek wants to climb from the 0th stair to the (n-1)th stair. At a time the Geek can climb either one or two steps. A height[N] array is also given. Whenever the geek jumps from stair i to stair j, the energy consumed in the jump is abs(height[i]- height[j]), where abs() means the absolute difference. return the minimum energy that can be used by the Geek to jump from stair 0 to stair N-1.

Example:
Input:
n = 4
height = {10 20 30 10}
Output:
20
Explanation:
Geek jump from 1st to 2nd stair(|20-10| = 10 energy lost).
Then a jump from the 2nd to the last stair(|10-20| = 10 energy lost).
so, total energy lost is 20 which is the minimum.
*/

// Top Down Approach
class Solution {
  minimumEnergy(height, n) {
    // Top Down Approach
    // We will start from n-1th stair and try to reach 0 index as we are considering 0-based indexing
    // We will take 1 step or 2 step at a time
    // return min(1 step, 2 step)
    // Base case is when we reach index = 0 means top
    let dp = Array(n).fill(-1);
    return this.helper(n - 1, height, dp);
  }

  helper(ind, height, dp) {
    // base case
    if (ind == 0) {
      return 0;
    }

    if (dp[ind] != -1) {
      return dp[ind];
    }

    let oneStep =
      this.helper(ind - 1, height, dp) +
      Math.abs(height[ind] - height[ind - 1]);

    // 2 step only allowed if ind>1
    let twoStep = 1e9;
    if (ind > 1) {
      twoStep =
        this.helper(ind - 2, height, dp) +
        Math.abs(height[ind] - height[ind - 2]);
    }

    return (dp[ind] = Math.min(oneStep, twoStep));
  }
}

// Bottom Up Approach
function tabulationminimumEnergy(height, n) {
  // Bottom Up Approach
  let dp = Array(n).fill(0);

  // fill the base case
  dp[0] = 0;

  // run loop from ind = 1 as ind = 0 already covered
  for (let ind = 1; ind < n; ind++) {
    let oneStep = dp[ind - 1] + Math.abs(height[ind] - height[ind - 1]);

    // 2 step only allowed if ind>1
    let twoStep = 1e9;
    if (ind > 1) {
      twoStep = dp[ind - 2] + Math.abs(height[ind] - height[ind - 2]);
    }

    dp[ind] = Math.min(oneStep, twoStep);
  }

  return dp[n - 1];
}

// Minimal Cost
/*
There are n stones and an array of heights and Geek is standing at stone 1 and can jump to one of the following: Stone i+1, i+2, ... i+k stone and cost will be [hi-hj] is incurred, where j is the stone to land on. Find the minimum possible total cost incurred before the Geek reaches Stone N.

Example 1:
Input:
n = 5, k = 3
heights = {10, 30, 40, 50, 20}
Output:
30
Explanation:
Geek will follow the path 1->2->5, the total cost
would be | 10-30| + |30-20| = 30, which is minimum
*/

// Top Down Approach
class Solution {
  minimizeCost(height, n, k) {
    // This is same as previous problem just that here k jumps are allowed to us
    // We can make k jumps but before making any jump we need to take care of the fact that if that jump is allowed or not
    // ind - j  >= 0 then only that jump is possible where j runs from 1 to k
    let dp = Array(n).fill(-1);
    return this.helper(n - 1, height, k, dp);
  }

  helper(ind, height, k, dp) {
    if (ind == 0) {
      return 0;
    }

    if (dp[ind] != -1) {
      return dp[ind];
    }

    let minStep = +Infinity;
    for (let j = 1; j <= k; j++) {
      if (ind - j >= 0) {
        let jump =
          this.helper(ind - j, height, k, dp) +
          Math.abs(height[ind] - height[ind - j]);
        minStep = Math.min(minStep, jump);
      }
    }

    return (dp[ind] = minStep);
  }
}

// Bottom Up Approach
function tabulationminimizeCost(height, n, k) {
  // This is same as previous problem just that here k jumps are allowed to us
  // We can make k jumps but before making any jump we need to take care of the fact that if that jump is allowed or not
  // ind - j  >= 0 then only that jump is possible where j runs from 1 to k
  let dp = Array(n).fill(0);

  dp[0] = 0;

  for (let ind = 1; ind < n; ind++) {
    let minStep = +Infinity;
    for (let j = 1; j <= k; j++) {
      if (ind - j >= 0) {
        let jump = dp[ind - j] + Math.abs(height[ind] - height[ind - j]);
        minStep = Math.min(minStep, jump);
      }
    }

    dp[ind] = minStep;
  }

  return dp[n - 1];
}

// House Robber
/*
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
*/
var rob = function (nums) {
  // Top Down Approach
  // We can pick one house and then we have to avoid the adjacent one
  // So We start from last index and go till 0th index
  // We will take sum of all possible way and return the maximum of them
  // Base case if we reach index = 0 means we need to return 0th index element value
  // if we reach index<0 means return 0 as nothing to be added in the answer
  let n = nums.length;
  let dp = Array(n).fill(-1);
  return helper(n - 1, nums, dp);
};

function helper(ind, nums, dp) {
  if (ind == 0) {
    return nums[0];
  }

  if (ind < 0) {
    return 0;
  }

  if (dp[ind] != -1) {
    return dp[ind];
  }

  // We will use pick or not pick approach
  // If we pick, we need to add into the answer and move to ind-2 as adjacent indexes not allowed
  let pick = nums[ind] + helper(ind - 2, nums, dp);

  let notPick = 0 + helper(ind - 1, nums, dp);

  return (dp[ind] = Math.max(pick, notPick));
}

// Bottom Up Approach
var rob = function (nums) {
  // Bottom Up Approach
  let n = nums.length;
  let dp = Array(n).fill(0);

  dp[0] = nums[0];

  for (let ind = 1; ind < n; ind++) {
    let pick = nums[ind];
    if (ind > 1) {
      pick += dp[ind - 2];
    }

    let notPick = 0 + dp[ind - 1];

    dp[ind] = Math.max(pick, notPick);
  }

  return dp[n - 1];
};

// House Robber II
/*
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
*/
var rob = function (nums) {
  // Problem is same as previoius problem
  // Just that, this time we have first and last house as adjacent to each other
  // means all houses are arranged in a circle
  // So if we take first house, we cannot take last house
  // if we take last house, we cannot take first house
  // We will use logic of previous code only just that one time we send array after removing last element
  // next time we send array removing first element
  // At the end, max(both cases) is our answer
  if (nums.length === 1) return nums[0];

  let arr1 = nums.slice(0, nums.length - 1);
  let arr2 = nums.slice(1);

  return Math.max(robLinear(arr1), robLinear(arr2));
};

function robLinear(nums) {
  let n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  let dp = Array(n).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
  }

  return dp[n - 1];
}
