// Notes: https://drive.google.com/file/d/15LjBp-uEJkbKnYrC0NoVS5hizBz8tDhY/view?usp=sharing
// DP on Stocks

// Best Time to Buy and Sell Stock
/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
*/
var maxProfit = function (prices) {
  // Get the first guy as mini
  // start looping from 1st index
  // get cost for each index using prices[i] - mini
  // store maxProfit
  // update mini with minimum element
  // TC: O(n)
  let maxProfit = 0;
  let mini = prices[0];
  for (let i = 1; i < prices.length; i++) {
    let cost = prices[i] - mini;
    maxProfit = Math.max(maxProfit, cost);
    mini = Math.min(mini, prices[i]);
  }

  return maxProfit;
};

// Best Time to Buy and Sell Stock II
/*
You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return the maximum profit you can achieve.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Total profit is 4 + 3 = 7.
*/
var maxProfit = function (prices) {
  // Top Down Approach
  let n = prices.length;
  let dp = Array.from({ length: n }, () => Array(2).fill(-1));
  return profitBuySell(0, 1, prices, n, dp);
};

function profitBuySell(ind, buy, prices, n, dp) {
  if (ind == n) {
    return 0;
  }

  if (dp[ind][buy] != -1) {
    return dp[ind][buy];
  }

  let profit = 0;
  if (buy) {
    // we can buy or not buy
    // if we buy we do profit-- so -ve prices[i], buy = 0 as now we need to sell first
    // if we do not buy, we just do buy = 1 and we move ahead to buy
    // get max of both cases
    profit = Math.max(
      -prices[ind] + profitBuySell(ind + 1, 0, prices, n, dp),
      0 + profitBuySell(ind + 1, 1, prices, n, dp)
    );
  } else {
    // we can sell or not sell
    // if we sell we do profit + prices[i] and move to next index with buy = 1 as we can now buy
    // if we do not sell this time due to high price or something, we move to next index and buy = 0 as we still have not sell it
    // get max such profit
    profit = Math.max(
      prices[ind] + profitBuySell(ind + 1, 1, prices, n, dp),
      0 + profitBuySell(ind + 1, 0, prices, n, dp)
    );
  }

  return (dp[ind][buy] = profit);
}

// Bottom Up
var maxProfit = function (prices) {
  // Bottom Up Approach
  let n = prices.length;
  let dp = Array.from({ length: n + 1 }, () => Array(2).fill(0));
  dp[n][0] = 0;

  for (let ind = n - 1; ind >= 0; ind--) {
    for (let buy = 0; buy <= 1; buy++) {
      let profit = 0;
      if (buy) {
        profit = Math.max(-prices[ind] + dp[ind + 1][0], 0 + dp[ind + 1][1]);
      } else {
        profit = Math.max(prices[ind] + dp[ind + 1][1], 0 + dp[ind + 1][0]);
      }
      dp[ind][buy] = profit;
    }
  }

  return dp[0][1];
};

// Space Optimisation
var maxProfit = function (prices) {
  // Space Optimisation
  let n = prices.length;
  // ahead = ind+1 array, curr = ind array
  let ahead = Array(2).fill(0),
    curr = Array(2).fill(0);
  ahead[0] = ahead[1] = 0;

  for (let ind = n - 1; ind >= 0; ind--) {
    for (let buy = 0; buy <= 1; buy++) {
      let profit = 0;
      if (buy) {
        profit = Math.max(-prices[ind] + ahead[0], 0 + ahead[1]);
      } else {
        profit = Math.max(prices[ind] + ahead[1], 0 + ahead[0]);
      }
      curr[buy] = profit;
    }
    ahead = curr;
  }

  return ahead[1];
};

// Best Time to Buy and Sell Stock III
/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete at most two transactions.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:
Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
*/
var maxProfit = function (prices) {
  // Top Down Approach
  let n = prices.length;
  // we keep an extra variable now for number of transactions also
  // so we declare a 3D DP
  let dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: 2 }, () => Array(3).fill(-1))
  );
  return profitBuySell(0, 1, 2, prices, n, dp);
};

function profitBuySell(ind, buy, cap, prices, n, dp) {
  if (ind == n || cap == 0) {
    return 0;
  }

  if (dp[ind][buy][cap] != -1) {
    return dp[ind][buy][cap];
  }

  let profit = 0;
  if (buy) {
    // we can buy or not buy
    // if we buy we do profit-- so -ve prices[i], buy = 0 as now we need to sell first
    // if we do not buy, we just do buy = 1 and we move ahead to buy
    // get max of both cases
    // In this case, transation is not happening, transaction happening is considered when we buy + sell so we keep cap as same
    profit = Math.max(
      -prices[ind] + profitBuySell(ind + 1, 0, cap, prices, n, dp),
      0 + profitBuySell(ind + 1, 1, cap, prices, n, dp)
    );
  } else {
    // we can sell or not sell
    // if we sell we do profit + prices[i] and move to next index with buy = 1 as we can now buy
    // if we do not sell this time due to high price or something, we move to next index and buy = 0 as we still have not sell it
    // get max such profit
    // In case of successfull selling we do transaction - 1 as one complete successful transaction has happened, if we did not sell means transaction remains same
    profit = Math.max(
      prices[ind] + profitBuySell(ind + 1, 1, cap - 1, prices, n, dp),
      0 + profitBuySell(ind + 1, 0, cap, prices, n, dp)
    );
  }

  return (dp[ind][buy][cap] = profit);
}

// Bottom Up
var maxProfit = function (prices) {
  // Bottom Up Approach
  let n = prices.length;
  // we keep an extra variable now for number of transactions also
  // so we declare a 3D DP
  let dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: 2 }, () => Array(3).fill(0))
  );

  // We have already filled DP array with 0 so no need to write base cases as in base cases we are returning 0 only
  for (let ind = n - 1; ind >= 0; ind--) {
    for (let buy = 0; buy <= 1; buy++) {
      // cap start from 1 as in case base cap[0] is already covered as 0
      for (let cap = 1; cap <= 2; cap++) {
        if (buy) {
          profit = Math.max(
            -prices[ind] + dp[ind + 1][0][cap],
            0 + dp[ind + 1][1][cap]
          );
        } else {
          profit = Math.max(
            prices[ind] + dp[ind + 1][1][cap - 1],
            0 + dp[ind + 1][0][cap]
          );
        }

        dp[ind][buy][cap] = profit;
      }
    }
  }

  return dp[0][1][2];
};

// Space Optimisation
var maxProfit = function (prices) {
  // Space Optimisation Approach
  // We will take 2, 2D arrays to store buy and cap values
  let n = prices.length;
  // we keep an extra variable now for number of transactions also
  // so we declare a 3D DP
  let after = Array.from({ length: 2 }, () => Array(3).fill(0));
  let curr = Array.from({ length: 2 }, () => Array(3).fill(0));

  for (let ind = n - 1; ind >= 0; ind--) {
    for (let buy = 0; buy <= 1; buy++) {
      // cap start from 1 as in case base cap[0] is already covered as 0
      for (let cap = 1; cap <= 2; cap++) {
        if (buy) {
          profit = Math.max(-prices[ind] + after[0][cap], 0 + after[1][cap]);
        } else {
          profit = Math.max(prices[ind] + after[1][cap - 1], 0 + after[0][cap]);
        }

        curr[buy][cap] = profit;
      }
    }

    after = curr;
  }

  return after[1][2];
};

// Best Time to Buy and Sell Stock IV
/*
You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.

Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:
Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
*/
var maxProfit = function (k, prices) {
  // Same code as "Best Time to Buy and Sell Stock 3" just that there we have atmost 2 transations here we have 'k'
  // replace k everywhere in place of 2, thats it
  // Space Optimisation Approach
  // We will take 2, 2D arrays to store buy and cap values
  let n = prices.length;
  // we keep an extra variable now for number of transactions also
  // so we declare a 3D DP
  let after = Array.from({ length: 2 }, () => Array(k + 1).fill(0));
  let curr = Array.from({ length: 2 }, () => Array(k + 1).fill(0));

  for (let ind = n - 1; ind >= 0; ind--) {
    for (let buy = 0; buy <= 1; buy++) {
      // cap start from 1 as in case base cap[0] is already covered as 0
      for (let cap = 1; cap <= k; cap++) {
        if (buy) {
          profit = Math.max(-prices[ind] + after[0][cap], 0 + after[1][cap]);
        } else {
          profit = Math.max(prices[ind] + after[1][cap - 1], 0 + after[0][cap]);
        }

        curr[buy][cap] = profit;
      }
    }

    after = curr;
  }

  return after[1][k];
};

// Best Time to Buy and Sell Stock with Cooldown
/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]
*/
var maxProfit = function (prices) {
  // Top Down Approach
  let n = prices.length;
  let dp = Array.from({ length: n }, () => Array(2).fill(-1));
  return profitBuySell(0, 1, prices, n, dp);
};

function profitBuySell(ind, buy, prices, n, dp) {
  if (ind >= n) {
    return 0;
  }

  if (dp[ind][buy] != -1) {
    return dp[ind][buy];
  }

  let profit = 0;
  if (buy) {
    profit = Math.max(
      -prices[ind] + profitBuySell(ind + 1, 0, prices, n, dp),
      0 + profitBuySell(ind + 1, 1, prices, n, dp)
    );
  } else {
    profit = Math.max(
      prices[ind] + profitBuySell(ind + 2, 1, prices, n, dp),
      0 + profitBuySell(ind + 1, 0, prices, n, dp)
    );
  }

  return (dp[ind][buy] = profit);
}

// Bottom Up
var maxProfit = function (prices) {
  // Bottom Up Approach
  let n = prices.length;
  // We are dealing with ind+2 so we need to take case of it so declare n+2 size dp
  let dp = Array.from({ length: n + 2 }, () => Array(2).fill(0));
  // No need to write base case as in base case everything is 0 already

  for (let ind = n - 1; ind >= 0; ind--) {
    for (let buy = 0; buy <= 1; buy++) {
      let profit = 0;
      if (buy) {
        profit = Math.max(-prices[ind] + dp[ind + 1][0], 0 + dp[ind + 1][1]);
      } else {
        profit = Math.max(prices[ind] + dp[ind + 2][1], 0 + dp[ind + 1][0]);
      }
      dp[ind][buy] = profit;
    }
  }

  return dp[0][1];
};

// Best Time to Buy and Sell Stock with Transaction Fee
/*
You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

Note:

You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
The transaction fee is only charged once for each stock purchase and sale.

Example 1:
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
*/
var maxProfit = function (prices, fee) {
  // Top Down Approach
  let n = prices.length;
  let dp = Array.from({ length: n }, () => Array(2).fill(-1));
  return profitBuySell(0, 1, prices, fee, n, dp);
};

function profitBuySell(ind, buy, prices, fee, n, dp) {
  if (ind >= n) {
    return 0;
  }

  if (dp[ind][buy] != -1) {
    return dp[ind][buy];
  }

  let profit = 0;
  if (buy) {
    profit = Math.max(
      -prices[ind] + profitBuySell(ind + 1, 0, prices, fee, n, dp),
      0 + profitBuySell(ind + 1, 1, prices, fee, n, dp)
    );
  } else {
    // when we are selling, we complete one transaction so we do - fee thats it, rest remains same as part 2 same problem
    profit = Math.max(
      prices[ind] - fee + profitBuySell(ind + 1, 1, prices, fee, n, dp),
      0 + profitBuySell(ind + 1, 0, prices, fee, n, dp)
    );
  }

  return (dp[ind][buy] = profit);
}
