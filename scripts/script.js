// Features para adicionar
// Adicionar a funcionalidade => 10 + 10 + 10
// Adicionar a funcionalidade da vírgula

// O projeto pode ser visualizado em: https://vanillacalc.netlify.app
// O repositório do projeto pode sem encontrado em: https://github.com/gabrielhssilva/simple-calc

let keys = [...document.querySelectorAll(".key")];
let displayNumber = document.getElementById("displayNumber");
let firstNumber = "";
let secondNumber = "";
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
    case "÷":
    case "+":
    case "-":
    case "×":
      settedOperation = value;
      backupOperation = settedOperation;
      break;
    case "%":
    case "√":
      settedOperation = value;
      performOperation(settedOperation);
      break;
    case "=":
      performOperation(settedOperation);
      break;
    case ",":
      console.log("Vírgula");
      break;
    case "@":
      window.open("https://github.com/gabrielhssilva/simple-calc");
      break;
    default:
      if (settedOperation && firstNumber) {
        secondNumber += value;
        displayNumber.innerHTML = secondNumber;
      } else {
        if (
          firstNumber == result ||
          (firstNumber && isNaN(result) && secondNumber)
        ) {
          firstNumber = "";
        }
        firstNumber += value;
        displayNumber.innerHTML = firstNumber;
      }
      break;
  }
}

function resetCalc(resetResult) {
  if (resetResult) result = 0;
  displayNumber.innerHTML = 0;
  firstNumber = "";
  secondNumber = "";
  settedOperation = null;
}

function performOperation(operation) {
  firstNumber = Number(firstNumber);
  secondNumber = Number(secondNumber);

  switch (operation) {
    case "+":
      if (result) {
        result += firstNumber + secondNumber;
      }
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "×":
      result = firstNumber * secondNumber;
      break;
    case "÷":
      result = firstNumber / secondNumber;
      break;
    case "%":
      result = calcPercentage(backupOperation);
      result = getResult(result, true);
      break;
    case "√":
      result = Math.sqrt(firstNumber);
      break;
  }

  if (!operation) {
    result = firstNumber;
  }

  if (operation !== "%") {
    result = getResult(result, false);
  }
}

function calcPercentage(operation) {
  switch (operation) {
    case "+":
      result = firstNumber + (firstNumber * secondNumber) / 100;
      break;
    case "-":
      result = firstNumber - (firstNumber * secondNumber) / 100;
      break;
    case "×":
      result = firstNumber * (secondNumber / 100);
      break;

    case "÷":
      result = firstNumber / (secondNumber / 100);
      break;

    default:
      break;
  }

  return result;
}

function getResult(result, percentage) {
  let formattedResult;
  resetCalc(false);
  formattedResult = Number(result);
  formattedResult = isDecimal(formattedResult)
    ? formattedResult.toFixed(2)
    : formattedResult;
  displayNumber.innerHTML = formattedResult.toString().replace(".", ",");
  if (isNaN(result)) displayNumber.innerHTML = "Op. Inválida!";
  firstNumber = result;

  return formattedResult;
}

function isDecimal(value) {
  let mod = value % 1;
  return mod != 0 && !isNaN(mod);
}
