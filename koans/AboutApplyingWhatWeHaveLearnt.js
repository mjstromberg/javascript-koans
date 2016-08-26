var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = products.filter(function(product) {
        return !product.containsNuts && _(product.ingredients).all(function(ingredient) {
          return ingredient !== 'mushrooms';
        });
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1, 1000).reduce(function(res, i) {
      return (i % 3 === 0 || i % 5 === 0) ? res + i : res;
    }, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = _(products).chain().map(function(product) {
      return product.ingredients;
    }).flatten().reduce(function(count, ingredient) {
      count[ingredient] = (count[ingredient] || 0) + 1;
      return count;
    }, {}).value();

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR ADVANCED */
  
  it("should find the largest prime factor of a composite number", function () {
    var isPrime = function(n) {
      return _.range(2, n - 1).reduce(function(res, i) {
        return !res ? res : n % i !== 0;
      }, true);
    };

    var largestPrimeFactor = function(n) {
      return _.range(1, Math.ceil(n/2) + 1).reduce(function(maxPrime, i) {
        return (isPrime(i) && i > maxPrime && n % i === 0) ? i : maxPrime;
      }, 1);
    };

    expect(largestPrimeFactor(21)).toBe(7);
    expect(largestPrimeFactor(55)).toBe(11);
    expect(largestPrimeFactor(4)).toBe(2);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var largestPalindrome = function(a, b) {
      var arr = (a * b).toString().split('');
      for (var i = arr.length; i > 1; i--) {
        for (var j = 0, max = arr.length - i; j <= max; j++) {
          if (arr.slice(j, j + i).toString() === arr.slice(j, j + i).reverse().toString()) return i;
        }
      }
      return 1;
    };

    expect(largestPalindrome(123, 456)).toBe(2);
    expect(largestPalindrome(123, 457)).toBe(2);
    expect(largestPalindrome(100, 100)).toBe(4);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var primeFactors = function(n) {
      if (n <= 2) return [n];
      for (var i = 2; i < n; i++) {
        if (n % i === 0) return [].concat(i, primeFactors(n/i));
      }
      return [n];
    };

    var consolidate = function(arr) {
      return arr.reduce(function(res, n) {
        res[n] = ( res[n] || 0) + 1;
        return res;
      }, []);
    };

    var smallestDivisible = function(a, b) {
      var factors = [];

      for (var i = a; i <= b; i++) {
        consolidate(primeFactors(i)).forEach(function(count, index) {
          factors[index] = Math.max(count, (factors[index] || 0));
        });
      }
      
      return factors.reduce(function(res, count, index) {
        return res * Math.pow(index, count);
      }, 1);
    };

    expect(smallestDivisible(1, 20)).toBe(232792560)
  });
  
  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var diff = function(a, b) {
      return Math.abs((Math.pow(a + b, 2)) - (Math.pow(a, 2) + Math.pow(b, 2)));
    };

    expect(diff(1, 2)).toBe(4);
    expect(diff(6, 4)).toBe(48);
    expect(diff(-2, 5)).toBe(20);
    expect(diff(-5, -3)).toBe(30);
  });

  it("should find the 10001st prime", function () {
    var isPrime = function(n) {
      for (var i = 2, max = Math.ceil(Math.sqrt(n)); i <= max; i++) {
        if (n % i === 0) return false;
      }
      return true;
    };

    var findPrime = function(nth) {
      var count = 1, prime = 2, n = 3;
      
      while (count < nth) {
        if (isPrime(n)) {
          ++count;
          prime = n;
        }
        ++n;
      }

      return prime;
    };

    expect(findPrime(10001)).toBe(104743);
  });
});
