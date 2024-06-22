// Basic Maths in JS

// Count Digits
function countDigit(num) {
  let count = 0;
  while (num) {
    let lastDigit = num % 10;
    count++;
    num = num / 10;
  }

  return count;
}

// Reverse Integer
// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
var reverse = function (x) {
  // We will take care of case when number is negative also
  const isNegative = x < 0;
  let n = Math.abs(x);
  let res = 0;
  while (n) {
    const lastdigit = n % 10;
    n = Math.floor(n / 10);
    res = res * 10 + lastdigit;
  }

  // If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
  if (res > Math.pow(2, 31)) return 0;
  return isNegative ? res * -1 : res;
};

// Palindrome Number
// Given an integer x, return true if x is a palindrome, and false otherwise.
var isPalindrome = function (x) {
  let str = x.toString();
  let i = 0;
  let j = str.length - 1;
  while (i <= j) {
    if (str[i] != str[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
};

// Armstrong Number
// 153 = 1*1*1 + 5*5*5 + 3*3*3
// 1634 = 1*1*1*1 + 6*6*6*6* + 3*3*3*3 + 4*4*4*4
function checkArmstrong(n) {
  let temp = n;
  let countDigit = 0;
  while (temp) {
    // Counting the number of digits
    let last = temp % 10;
    countDigit++;
    temp = Math.floor(temp / 10);
  }

  let sum = 0;
  temp = n;
  while (temp) {
    let last = temp % 10;
    // Multiply the number, number of digit many times
    sum += Math.pow(last, countDigit);
    temp = Math.floor(temp / 10);
  }

  return sum === n;
}

// Sum of all divisors
// Divisors means numbers which completely divide the number
// We know divisor of any number n will always be between 1 to n
function checkDivisors(n) {
  // TC: O(n)
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      sum += i;
    }
  }

  return sum;
}

/*
* We can reduce the above time complexity like
* say n = 36 then we know we have divisors as
1 x 36  i.e 1 x 36/1
2 x 18  i.e 2 x 36/2
3 x 12  i.e 3 x 36/3
4 x 9   i.e 4 x 36/4
6 x 6   i.e 6 x 36/6
9 x 4  --> Repeat
12 x 3  --> Repeat
18 x 2 --> Repeat
36 x 1 --> Repeat
* So if we take only loop from 1 to sqrt(n) then also our purpose fulfills
* Just that if n%i == 0 then n/10 is also a divisor
* But in case of 6 x 6, 6 gets repeated so keeping in mind, if(n/i !== i) then i and n/i both are divisors.
* Our divisors may not come in sorted order so to make them sorted we use an array and sort it
*/

function checkDivisorsOptimised(n) {
  // TC: O(sqrt(n))
  let sum = 0;
  for (let i = 1; i <= Math.sqrt(n); i++) {
    // Instead of Math.sqrt we can write i*i <= n because Math.sqrt is an function in itself which will run and take time
    if (n % i === 0) {
      sum += i;
      if (n / i != i) {
        sum += n / i;
      }
    }
  }

  return sum;
}

// Check if a number is Prime Number or not
// Prime Numbers are the ones which are divisble by 1 and itself only like 2,3,5,7,11
// We follow same approach as above like looping from 1 to n and check if n%i == 0 means count++ and at end of loop check if count==2 means its prime else not
// Its about factors so as we have seen in previous questions, here also we can just loop till Math.sqrt(n) and get the work done
function checkPrime(n) {
  let count = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      count++;
      /*
* We can reduce the above time complexity like
* say n = 36 then we know we have divisors as
1 x 36  i.e 1 x 36/1
2 x 18  i.e 2 x 36/2
3 x 12  i.e 3 x 36/3
4 x 9   i.e 4 x 36/4
6 x 6   i.e 6 x 36/6
9 x 4  --> Repeat
12 x 3  --> Repeat
18 x 2 --> Repeat
36 x 1 --> Repeat
* So if we take only loop from 1 to sqrt(n) then also our purpose fulfills
* Just that if n%i == 0 then n/10 is also a divisor
* But in case of 6 x 6, 6 gets repeated so keeping in mind, if(n/i !== i) then i and n/i both are divisors.
* Our divisors may not come in sorted order so to make them sorted we use an array and sort it
*/
      if (n / i != i) {
        count++;
      }
    }
  }

  if (count == 2) {
    return true;
  }

  return false;
}

// GCD/HCF
// GCD = Greatest Common Divisor
// HCF = Highest Common Factor
// Say we have n1 and n2 GCD(n1,n2) means Out of all divisors of n1 and n2, HCF will be the greatest common divisor present in both n1 and n2
// n1 = 9 -> 1, 3, 9
// n2 = 12 -> 1, 2, 6, 2, 4, 12
// GCD(n1,n2) = max(1,3) = 3
// We can find the factor using looping from 1 to min(n1,n2) because if n1 = 9, n2 = 20. We cannot get GCD(9,20) beyond 9 so its better to loop till the minimum of both
function GCD(n1, n2) {
  // O(min(n1,n2))
  let GCD = 0;
  for (let i = 1; i <= Math.min(n1, n2); i++) {
    if (n1 % i === 0 && n2 % i === 0) {
      // As we are moving from 1 to min(n1,n2), its already in increasing fashion so last digit that satisfies this condition will always be greatest one
      GCD = i;
    }
  }

  return GCD;
}

// We can also think of another way where we start looping from min(n1, n2) and move till i == 1 but complexity remains same for worst cases
function GCDanotherWay(n1, n2) {
  // O(min(n1,n2))
  let GCD = 0;
  for (let i = Math.min(n1, n2); i >= 1; i--) {
    if (n1 % i === 0 && n2 % i === 0) {
      GCD = i;
    }
  }

  return GCD;
}

// Euclidean Algorithm
// This is a better way of finding GCD with lesser complexity
// It says, GCD(a,b) = GCD(a-b,b) where a>b
// gcd(20,15) = gcd(5,15)
// gcd(15,5) = gcd(10,5) = gcd(5,5) = gcd(0,5)
// The moment one of them becomes 0 means other is our GCD
// We observe and see that GCD(20,15) truncates to GCD(0,5) which is same as GCD(20%15,15) satisfying a>b till one of them becomes 0, other becomes GCD
function Euclidean(a, b) {
  // TC: O(log(min(a,b))
  while (a > 0 && b > 0) {
    // Loop runs till one of them becomes 0
    if (a > b) a = a % b;
    else b = b % a;
  }

  if (a == 0) {
    // if a is 0, b becomes gcd
    return b;
  } else {
    return a;
  }
}

// Prime Factors of a Number
// Means all the factors/Divisors of a number which are prime
// We know prime number starts from 2 so we run a loop from 2 to n and check if n%i ===0, if yes, we check if its prime means yes its a prime factor
function primeFactor(n) {
  let ans = [];
  for (let i = 2; i <= n; i++) {
    if (n % i === 0) {
      // Yes its divisor
      if (checkPrime(i)) {
        // Yes its Prime
        ans.push(i);
      }
    }
  }
  return ans;
}

// We can use a better method to find divisor
function primeFactorOptimised(n) {
  let res = [];
  for (let i = 2; i * i <= n; i++) {
    if (n % i == 0) {
      if (checkPrime(i)) {
        res.push(i);
      }
      if (n / i != i) {
        if (checkPrime(n / i)) {
          res.push(n / i);
        }
      }
    }
  }
  return res;
}

// Power Exponentiation
// Pow(2,5) = 32
// Pow(x,n)
function powerExponentation(x, n) {
  // Brute Force
  let ans = 1;
  for (let i = 1; i <= n; i++) {
    ans = ans * x;
  }
  return ans;
}

// Optimised Way
// For 3^9, say ans = 1 initlaised
// 3 * 3^8 to make power even, we put ans = 1*3
// Now we have 3^8 -> can be written as (3^2)^8/2
// becomes 9^4 -> (9^2)^4/2 -> 81^2 -> (81^2)^2/2 = (6561)^1 -> Make power even so 6561 * 6561^0
// ans = 1*3*6561
// 6561^0 = (6561^2)^0/2 which is 1 eventually
// So ans of 3^9 = 19683
// So we take ans = 1, everytime we have even power we write it as (num/2)^pow/2, everytime we have odd power, we make it even by seperating number and multiplying it to ans, till power becomes 0
function powerExponentationOptimised(x, n) {
  // power can be negative also so 2^-5 = 1/2^5
  let m = n;
  n = Math.abs(n);
  let ans = 1;
  while (n > 0) {
    if (x % 2 == 1) {
      ans = ans * x;
      x = x - 1;
    } else {
      n = n / 2;
      x = x * x;
    }
  }

  return m < 0 ? 1 / ans : ans;
}

// Sieve of Eratosthenes
// This is a Technique to find the prime numbers till a number n
// say n = 30, we need all prime numbers till 30
// We make a array[31] = {1} initialised with 1 initially
// We know prime number start from 2 so we start from 2 and mark all multiple of 2 like 4,6,8,10,12,14,16,18,20,22,24,26,28,30 as 0
// Now we go to 3, we see 3 is marked as 1 means its prime as it was not multiple of anybody before it
// We mark all multiple of 3 as 0 like 6,9..30
// We check 4 is marked as 0 means its not prime leave it
// We check 5 is prime so mark its multiple as 0
// We keep on doing this till 30
// At the end our array has all prime numbers between 1 to 30 marked with 1 and non-prime marked with 0
// To check if 5 is prime or not, we just do prime[5]
// and this way we find the prime numbers in O(1) time using some smart pre-computations

function sieve(n) {
  let arr = Array.from(n + 1).fill(1);
  for (let i = 2; i <= n; i++) {
    if (arr[i] === 1) {
      for (let j = 2 * i; j <= n; j += i) {
        // Mark all multiples as 0
        arr[j] = 0;
      }
    }
  }
  return arr;
}

// When we are marking the multiples, we see that 2x3 = 6 is marked by 2 already so we do not need to mark 3x2 again, we can start from 3x3
// sameway 5x2, 5x3, 5x4 already marked by previous guys so we can start from 5x5
// sameway for 7x2, 7x3, 7x4, 7x5, 7x6 already done, start from 7x7
// So instead of j = 2*i we can start computing multiples from j = i*i
// if i = 7, j = i*i = 49 and condition j<=30 fails so we need go till only sqrt(n) in outer loop instead till n

function sieveOptimised(n) {
  // TC: O(N) + O(Nlog(logn))
  let arr = Array.from(n + 1).fill(1);
  for (let i = 2; i * i <= n; i++) {
    if (arr[i] === 1) {
      for (let j = i * i; j <= n; j += i) {
        // Mark all multiples as 0
        arr[j] = 0;
      }
    }
  }
  return arr;
}

// Prime Numbers in a Range
// Let say we have a range L to R, we need to know, Number of prime numbers between L to R
// How to do it?
// We have array of prime numbers marked with 1 and non-prime marked with 0 using sieve
// We make changes it it only, we take count = 0, everytime we take count += prime[i] and add that value into prime[i]
// We only have 0 and 1 inside prime array so this way we have number of prime numbers till any index in that array
// Now we need between L and R so prime[R] - prime[L] gives us the answer
function rangePrime(queries) {
  // arr has L and R and has queries
  let arr = sieveOptimised(Math.pow(10, 6));
  // 10^6 is maximum we need so we compute sieve for it
  let count = 0;
  for (let i = 2; (i <= 10) ^ 6; i++) {
    count = count + arr[i];
    arr[i] = count;
  }

  for (let i = 0; i < queries.size(); i++) {
    let L = queries[i][0];
    let R = queries[i][1];
    // answer is
    console(arr[R] - arr[L - 1]);
  }
}
