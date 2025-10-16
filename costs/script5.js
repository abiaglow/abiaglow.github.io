      // https://javascript.plainenglish.io/building-a-vanilla-js-calculator-with-full-keyboard-support-from-scratch-a-beginners-guide-66d41e71734f

      const display = document.getElementById("display");
      let currentValue = "0";
      let previousValue = null;
      let operator = null;
      let operatorClicked = false;
      let activeOperatorButton = null;

      // Function to update the display
      function updateDisplay() {
        setTimeout(() => {
          display.value = currentValue;
        }, 0);
      }

      // Function to handle number and point input
      function handleNumber(num) {
        if (operatorClicked) {
          currentValue = num;
          operatorClicked = false;
        } else {
          if (num === "." && currentValue.includes(".")) return;
          currentValue =
            currentValue === "0" && num !== "." ? num : currentValue + num;
        }
        updateDisplay();
      }

      // Function to handle operator input
      function handleOperator(op, button) {
        if (previousValue === null) {
          previousValue = currentValue;
        } else if (operator && !operatorClicked) {
          currentValue = calculate(previousValue, currentValue, operator);
          previousValue = currentValue;
        }

        operatorClicked = true;
        operator = op;

        // Highlight the current operator button
        if (activeOperatorButton) {
          activeOperatorButton.classList.remove("active");
        }
        if (button) {
          button.classList.add("active");
          activeOperatorButton = button;
        }
      }







        // Function to calculate the result
        function calculate(a, b, operator) {
            const num1 = parseFloat(a);
            const num2 = parseFloat(b);

            switch (operator) {
                case "+": return (num1 + num2).toFixed(2);
                case "-": return (num1 - num2).toFixed(2);
                case "*": return (num1 * num2).toFixed(2);
                case "/": return (num1 / num2).toFixed(2);
                case "%": return ((num1 * num2) / 100).toFixed(2);
                case "c1": return (num1 * num2).toFixed(2);
                case "c2": return (num1 * num2).toFixed(2);
                case "c3": return (num1 * num2).toFixed(2);
                case "c4": return (num1 * num2).toFixed(2);
            default:  return b;  
            }
        }







        // Function to clear all values
        function clearCalculator() {
            currentValue = "0";
            previousValue = null;
            operator = null;
            operatorClicked = false;
            if (activeOperatorButton) {
                activeOperatorButton.classList.remove("active");
                activeOperatorButton = null;
            }
            updateDisplay();
        }



      // Function to handle equal (=) button click
      function handleEqual() {
        if (previousValue !== null && operator !== null) {
          currentValue = calculate(previousValue, currentValue, operator);
          previousValue = null;
          operator = null;
          operatorClicked = false;

          // Remove operator highlight after calculation
          if (activeOperatorButton) {
            activeOperatorButton.classList.remove("active");
            activeOperatorButton = null;
          }

          updateDisplay();
        }
      }

      // Function to handle +/- button
      function toggleSign() {
        currentValue = (parseFloat(currentValue) * -1).toString();
        updateDisplay();
      }

      // Function to handle backspace (delete last character)
      function handleBackspace() {
        if (operatorClicked) return;
        if (currentValue.length > 1) {
          currentValue = currentValue.slice(0, -1);
        } else {
          currentValue = "0";
        }
        updateDisplay();
      }

      // Unified input handler
      function handleInput(input) {
        if (input === "ac") {
          clearCalculator();
        } else if (input === "plus-minus") {
          toggleSign();
        } else if (input === "=") {
          handleEqual();
        } else if (["c1", "c2", "c3", "c4", "+", "-", "*", "/", "%"].includes(input)) {
          const operatorButton = document.querySelector(
            `.operator[data-action="${input}"]`
          );
          handleOperator(input, operatorButton);
        } else if (input === "backspace") {
          handleBackspace();
        } else if (!isNaN(input) || input === ".") {
          handleNumber(input);
        }
      }

      // Mouse click event listeners
      document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (e) => {
          const { id } = e.target;
          if (id === "ac") return handleInput("ac");
          if (id === "plus-minus") return handleInput("plus-minus");
          if (id === "equals") return handleInput("=");
          if (e.target.classList.contains("operator")) {
            const op = e.target.getAttribute("data-action");
            handleInput(op);
          } else {
            handleInput(e.target.textContent);
          }
        });
      });

      // Keyboard event listener with visual feedback
      document.addEventListener("keydown", (e) => {
        let key = e.key;
        if (key === "Enter") key = "=";
        if (key === "Escape") key = "ac";
        if (key === "Backspace") {
          e.preventDefault();
          handleInput("backspace");
          return;
        }
        if (key === "Delete") {
          e.preventDefault();
          handleInput("ac");
          return;
        }
        if (
          ["c1", "c2", "c3", "c4", "+", "-", "*", "/", "%", ".", "=", "ac", "plus-minus"].includes(
            key
          ) ||
          (!isNaN(key) && key !== " ")
        ) {
          e.preventDefault();
          handleInput(key);

          // Visual feedback for keyboard input
          const button = document.querySelector(`button[data-key="${key}"]`);
          if (button) {
            button.classList.add("key-active");
            setTimeout(() => {
              button.classList.remove("key-active");
            }, 150);
          }
        }
      });
 

