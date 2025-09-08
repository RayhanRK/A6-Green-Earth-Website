## ✅ Answer of the following questions-

#### 1) What is the difference between var, let, and const?
#### Ans: 
- var → It is old java script.Its variables are function-scoped, 
        can be re-declared, hoisted with undefined.

- let → block-scoped, can be reassigned but cannot be re-declared.

- const → block-scoped, cannot be reassigned or re-declared.

#### 2) What is the difference between map(), forEach(), and filter()? 
#### Ans: 
- map() → It goes through each item and returns a new array with transformed values.

- forEach() → It goes through each item but doesn’t return anything.It is used just to run code for each element.

- filter() → It goes through each item, returns a new array only when the items that match a condition.

#### 3) What are arrow functions in ES6?
#### Ans: Arrow functions are Shorter way to write functions using => instead of the function keyword.
    - Syntax: const functionName = (parameters) => expression
    - example: const add = (a, b) => a + b; 
                console.log(add(2,3)); //output: 5

#### 4) How does destructuring assignment work in ES6?
#### Ans: Destructuring assignment extracts values from arrays / objects and assigns them to variables easily.
    - Array destructuring: const [a, b, c] = [1, 2, 3]
    - Object destructuring: const {name, age} = {name: "Rayhan", age: 21}

#### 5) Explain template literals in ES6. How are they different from string concatenation?
#### Ans: Template Literals (ES6): It is a way to write strings using backticks (`) instead of quotes that use ${} for interpolation, making the code cleaner and easier to read.

**Difference from Concatenation:**

- Template literals: cleaner, ${} for variables, multiline supported.

- Concatenation: uses +, harder to read for multiple variables.

  **Example:** const name = "Rayhan";
             `Hello, ${name}`   // Template literal
             "Hello, " + name    // Concatenation


## 🔗 Submission
 **Live Link (Netlify) :** https://a6-green-earth-website.netlify.app/

