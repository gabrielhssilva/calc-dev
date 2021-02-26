let keys = [...document.querySelectorAll(".key")];
let displayNumber = document.getElementById("displayNumber");
let firstNumber = '';
let secondNumber = '';
let settedOperation;
let result;

keys.forEach((key) => {
  key.addEventListener("click", () => clickKey(key));
});

function clickKey(key) {
  let value = key.value;

  switch (value) {
    case "AC":
      resetCalc(true);
      break;
    case "√":
      console.log("Raiz Quadrada");
      settedOperation = value;
      break;
    case "%":
      console.log("Porcentagem");
      settedOperation = value;
      break;
    case "÷":
      console.log("Divisão");
      settedOperation = value;
      break;
    case "+":
      console.log("Soma");
      settedOperation = value;
      break;
    case "-":
      console.log("Subtração");
      settedOperation = value;
      break;
    case "×":
      console.log("Multiplicação");
      settedOperation = value;
      break;
    case "=":
      console.log("Resultado");
      performOperation(settedOperation);
      completedOperation();
      break;
    case ",":
      console.log("Vírgula");
      break;
    case "@":
      console.log("GitHub");
      break;
    default:
      if (settedOperation && firstNumber) {
        secondNumber += value;
        displayNumber.innerHTML = secondNumber;
      } else {
        if(firstNumber == result) {
          firstNumber = ''
        }
        firstNumber += value;
        displayNumber.innerHTML = firstNumber;
      }
      completedOperation();
      break;
  }
}

function resetCalc(resetResult) {
  if (resetResult) result = 0;
  displayNumber.innerHTML = 0;
  firstNumber = '';
  secondNumber = '';
  settedOperation = null;
}

function performOperation(operation){
  firstNumber = Number(firstNumber);
  secondNumber = Number(secondNumber);

  if (operation == "+") {
    if (result) {
      result += firstNumber + secondNumber;
    }
    result = firstNumber + secondNumber;
  }

  if (operation == "-") {
    if (result) {
      result += firstNumber + secondNumber;
    }
    result = firstNumber - secondNumber;
  }

  if (operation == "×") {
    if (result) {
      result += (firstNumber * secondNumber);
    }
    result = (firstNumber * secondNumber);
  }

  if (operation == "÷") {
    if (result) {
      result += (firstNumber / secondNumber);
    }
    result = (firstNumber / secondNumber);
  }

  resetCalc(false);
  result = Number(result);
  result = isDecimal(result) ? result.toFixed(2) : result;   
  displayNumber.innerHTML = result.toString().replace(".", ",");
  firstNumber = result;

  return result;
}

function completedOperation(){
  let operation = {
    firstNumber,
    secondNumber,
    settedOperation,
    result: result ? result : null
  }
}

function isDecimal(value) {
  let mod = value % 1;
  return mod != 0 && !isNaN(mod);
}
