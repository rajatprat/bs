export const weekOnePracticeQuestions=[
 {id:'oct-22-gcd',exam:'Quiz 1 · Oct 2022',type:'mcq',prompt:'What does this function compute?',code:`def fun(m, n):
    if m == n:
        return n
    if m > n:
        return fun(m - n, n)
    return fun(m, n - m)`,options:['m + n using repeated subtraction','m mod n using repeated subtraction','The greatest common divisor of m and n','The least common multiple of m and n'],answer:2,solution:'Each recursive call subtracts the smaller positive number from the larger one. That operation preserves the common divisors, and the calls stop once both values are equal. The equal value is the GCD.'},
 {id:'oct-22-prime',exam:'Quiz 1 · Oct 2022',type:'mcq',prompt:'For which input does prime_bad return an incorrect output?',code:`def prime_bad(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5)):
        if n % i == 0:
            return False
    return True`,options:['36','25','64','17'],answer:1,solution:'For n = 25, int(sqrt(25)) is 5, but range(2, 5) tries only 2, 3 and 4. It never tests 5, so it incorrectly returns True. The loop needs to include the square root.'},
 {id:'feb-25-reverse',exam:'Quiz 1 · Feb 2025',type:'mcq',prompt:'Suppose fun(D, 1, 3) is applied to D = [1, 2, 3, 4, 5, 6]. What will D be after it finishes?',code:`def fun(D, s1, s2):
    if s1 < s2:
        D[s1], D[s2] = D[s2], D[s1]
        fun(D, s1 + 1, s2 - 1)`,options:['[1, 4, 3, 2, 5, 6]','[6, 5, 4, 3, 2, 1]','[1, 3, 2, 4, 5, 6]','[1, 2, 3, 4, 5, 6]'],answer:0,solution:'The first call swaps indices 1 and 3, changing the list to [1, 4, 3, 2, 5, 6]. The next call has s1 = s2 = 2, so the condition fails. Only the selected slice is reversed.'},
 {id:'jul-25-call-count',exam:'Quiz 1 · Jul 2025',type:'nat',prompt:'How many recursive calls are made while evaluating fun(4), excluding the initial call?',code:`def fun(n):
    if n <= 1:
        return 0
    return fun(n - 1) + fun(n - 2)`,answer:'8',solution:'The initial fun(4) calls fun(3) and fun(2). Their recursive call counts are 4 and 2 respectively, and those two direct calls also count: 1 + 4 + 1 + 2 = 8.'},
 {id:'oct-25-even-divisors',exam:'Quiz 1 · Oct 2025',type:'nat',prompt:'What is g(48) − g(36) for the function below?',code:`def g(n):
    count = 0
    for i in range(1, n + 1):
        if n % i == 0 and i % 2 == 0:
            count = count + 1`,answer:'2',solution:'g counts even divisors. 48 has 8 even divisors: 2, 4, 6, 8, 12, 16, 24, 48. 36 has 6: 2, 4, 6, 12, 18, 36. Therefore 8 − 6 = 2.'},
 {id:'oct-25-fib-calls',exam:'Quiz 1 · Oct 2025',type:'nat',prompt:'How many recursive calls are made to evaluate fun(6), excluding the initial call?',code:`def fun(n):
    if n <= 1:
        return 0
    return fun(n - 1) + fun(n - 2)`,answer:'24',solution:'Let C(n) be the number of calls in the full call tree, including fun(n). C(0) = C(1) = 1 and C(n) = 1 + C(n−1) + C(n−2). Thus C(6) = 25, so excluding the initial call gives 24.'},
 {id:'mar-26-odd-divisors',exam:'Quiz 1 · Mar 2026',type:'nat',prompt:'What is f(60) − f(59) for the function below?',code:`def f(n):
    s = 0
    for i in range(2, n):
        if n % i == 0 and i % 2 == 1:
            s = s + 1
    return s`,answer:'3',solution:'The odd proper divisors of 60 are 3, 5 and 15, so f(60) = 3. The prime 59 has no divisors in the tested range, so f(59) = 0. The difference is 3.'},
 {id:'jul-26-gcd',exam:'Quiz 1 · Jul 2026',type:'nat',prompt:'What value does compute_metric(45, 75) return?',code:`def compute_metric(x, y):
    if x == y:
        return x
    if x < y:
        return compute_metric(x, y - x)
    return compute_metric(x - y, y)`,answer:'15',solution:'Repeated subtraction gives (45, 75) → (45, 30) → (15, 30) → (15, 15). The function returns 15, the GCD.'},
 {id:'aug-22-max',exam:'End Term · Aug 2022',type:'mcq',prompt:'Select the input list for which maxbad produces incorrect output.',code:`def maxbad(L):
    mymax = 0
    for i in range(len(L)):
        if L[i] > mymax:
            mymax = L[i]
    return mymax`,options:['[-1, 3, 4, -2]','[-1, 0, 1, 2]','[-1, -2, -3, -4]','[4, 3, 2, -3]'],answer:2,solution:'Starting mymax at 0 fails when every element is negative: no element replaces it, so the function returns 0 instead of −1. Initialising from the first element fixes it.'},
 {id:'apr-24-max',exam:'End Term · Apr 2024',type:'mcq',prompt:'Select the input list for which max_bad produces incorrect output.',code:`def max_bad(L):
    mymax = 0
    for i in range(len(L)):
        if L[i] > mymax:
            mymax = L[i]
    return mymax`,options:['[11, 22, 33, 44]','[-11, 0, 21, -32]','[-11, -22, -33, -44]','[44, 33, 22, 11]'],answer:2,solution:'Again, the all-negative list is the failing case. The true maximum is −11, but max_bad returns its incorrect initial value 0.'},
 {id:'dec-24-reverse',exam:'End Term · Dec 2024',type:'mcq',prompt:'What does this function do?',code:`def fun(D, s1, s2):
    if s1 < s2:
        D[s1], D[s2] = D[s2], D[s1]
        fun(D, s1 + 1, s2 - 1)`,options:['Finds the smallest element from s1 through s2','Reverses D between s1 and s2, both inclusive','Performs an in-place merge sort between s1 and s2','Swaps only D[s1] and D[s2]'],answer:1,solution:'It swaps the two outside elements, then moves both indices inward and repeats. That reverses every element in the inclusive interval.'},
 {id:'dec-25-odd',exam:'End Term · Dec 2025',type:'mcq',prompt:'Select the input list for which bad_count_odd produces incorrect output.',code:`def bad_count_odd(L):
    count = 0
    for i in L:
        if i % 2 != 0:
            count += 1
        else:
            break
    return count`,options:['[5, 31, 71, 41]','[15, 7, 3, 6, 8, 34]','[11, 3, 15, 31]','[5, 4, 13, 30]'],answer:3,solution:'The function stops at the first even value. For [5, 4, 13, 30], it returns 1 even though there are two odd values (5 and 13).'},
 {id:'dec-25-even',exam:'End Term · Dec 2025',type:'mcq',prompt:'Select the input list for which bad_count_even produces incorrect output.',code:`def bad_count_even(L):
    count = 0
    for i in L:
        if i % 2 == 0:
            count += 1
        else:
            break
    return count`,options:['[56, 4, 70, 40]','[6, 8, 34, 13, 5, 9]','[6, 11, 4, 30]','[6, 4, 2, 30]'],answer:2,solution:'The loop stops at the first odd value. In [6, 11, 4, 30], it returns 1, but the list contains three even values: 6, 4 and 30.'},
 {id:'may-26-gcd-calls',exam:'End Term · May 2026',type:'nat',prompt:'How many recursive calls does fun(48, 18) make, excluding the first main call?',code:`def fun(m, n):
    if m == n:
        return n
    if m > n:
        return fun(m - n, n)
    return fun(m, n - m)`,answer:'4',solution:'The calls are fun(48,18) → fun(30,18) → fun(12,18) → fun(12,6) → fun(6,6). There are four calls after the initial one.'},
 {id:'sep-26-powers',exam:'Quiz 1 · Sep 2026',type:'nat',prompt:'What does f(1000, 2) return?',code:`def f(m, n):
    ans = 1
    count = 0
    while ans <= m:
        count = count + 1
        ans = ans * n
    return count`,answer:'10',solution:'The loop counts 1, 2, 4, 8, …, 512: ten powers of 2 not exceeding 1000. It then makes ans 1024 and stops.'}
];
