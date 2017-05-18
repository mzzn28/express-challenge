## Fibonacci's API
![fib](https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Fibonacci_spiral_34.svg/220px-Fibonacci_spiral_34.svg.png)

The Fibonacci Sequence is an integer sequence commonly used in places where increasing sequences are needed, like login throttling or coding interview questions :smile:. Formally it's defined as:

```
fib(n) = fib(n-1) + fib(n-2)
```

For this exercise we'll use the following base cases:
```
fib(0) = 0
fib(1) = 1
```


### What do I do?

This is a simple test of basic CS fundamentals as well as basic API knowledge.
You'll be creating an API route using [Node.js](https://nodejs.org/en/about/) and [Express](http://expressjs.com/en/guide/routing.html) that returns the `n`th fibonacci number

The spec is as follows:

- [ ] A single API route that will return a JSON object containing the `n`th fibonacci number
- [ ] The route must contain a parameter representing the `n`th fibonacci number (e.g. `localhost:3000/fibonacci/5`)
- [ ] The JSON response returns a valid HTTP response code, as well as the following properties:
  - [ ] `nth` - the index of the number in the fibonacci sequence
  - [ ] `value` - the `n`th value of the fibonacci sequence
  - [ ] `timestamp` - the date/time when the response was sent, as an ISO string
  - [ ] `elapsed` - the time it took to calculate the `n`th fibonacci number, in milliseconds

### For consideration:

- Performance is important here. Make sure to watch how frequently you're evaluating a `fib()` function such that you're only running it as needed.
- Update the last section of this `README.md` with any thoughts or explanations you may have.
- You can choose to use either recursion or iteration for your implementation, but please let us know why you chose the one you did in the README.

### Extra Credit

- Implement iterative _and_ recursive fib functions, and allow for a `method` query parameter that can specify which method to use
- Automated tests included for the project. Use your framework of choice for testing and include dependencies such that we can run the tests here.


### Solution Discussion:
- No doubt it's an interesting challeneg and fun, if Fabonacci is solved through iterration it has linear complexity and that is pretty good to solve this problem compared to simple recursive aproach that has exponential complexity due to double calls of fib function, so as n increase it become worst. So I uased chache object to save the calls and thus it improved it to linear.
- To optimize the performance further I also used node cache, if a user request a number twice it will nor re compute rather use cache to get the fabonacci value, time out for chache is 300 sec/5min
- Only first part of extra credir is done with nth vlaue and method string passed as url parameters, e.g: http://localhost:3000/fibonacci/?nth=12&method=iterative
- Tested the n up to 200 and get the result in max 4 seconds, automated case is not implemented due to lack of knowledge, can be impemenetd if spend more time on it.
- might have stack overflow if tested agressively, not sure about the limitation of cache I used, implementation mainly focused on optimization of fib calls.