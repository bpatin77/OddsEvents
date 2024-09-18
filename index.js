// TODO: this file! :)
//State
const bank=[];
const odds=[];
const evens=[];

/** Adds the given `num` to the bank */
function addToBank(num) {
  bank.push(num);
}

/** Sorts the first number from the bank to the corresponding odds or evens bucket */
function sortFromBank() {
  const num = bank.shift(); // shift removes the first element
  if (num % 2 === 0) {
    evens.push(num);
  } else {
    odds.push(num);
  }
}

// === Render ===
/** Renders the given `numbers` as spans in the given `element`. */
function renderNumbers(numbers, $element) { //1. What does $element & $num mean and where does it connect to in the code? Does it do anything special? I see in the notes its a indicator that the variable is a DOM variable but why do we have to indicate this?
  const $nums = numbers.map((num) => {
    //2. Does numbers.map() create a new array?
    const $num = document.createElement("span"); //3. For document.createElement("span"); how does VS Code know how many columns to add?
    $num.textContent = num; //4. Can you explain what is going on for $num.textContent = num;
    return $num;
  });
  $element.replaceChildren(...$nums);
}

/** Renders all three arrays of numbers */
function render() {
  // Notice we can use `renderNumbers` to render all three arrays of numbers,
  // rather than repeating the logic 3 times
  const $bank = document.querySelector("#numberBank output");//5. why did we include output at the end of numberBank, odds, and evens in the render function ? Are we doing something else besides connecting to the html file?
  renderNumbers(bank, $bank); //6. What is the difference between bank and $bank?
  const $odds = document.querySelector("#odds output");
  renderNumbers(odds, $odds);
  const $evens = document.querySelector("#evens output");
  renderNumbers(evens, $evens);
}

// === Script ===
render(); // Initial render

//7. Ik you said we are supposed to render when there is a change to the state function but how is addToBank(num) being changed?

// Add number to bank when form submitted
const $form = document.querySelector("form"); //8. Why is the querySelector returning form? 
$form.addEventListener("submit", (event) => { //9. What is the the parameters for EventListener saying?
  event.preventDefault();

  const $input = document.querySelector("#number");
  const input = $input.value;

  // Guard against empty or non-number inputs
  if (input.length === 0 || isNaN(input)) {
    console.error("Input must be a number");
    return;
  }

  $input.value = "";

  addToBank(input);
  render();
});

// Sort one number from bank
const $sortOne = document.querySelector("#sortOne"); 
$sortOne.addEventListener("click", () => {
  sortFromBank();
  render();
});

// Sort all numbers from bank
const $sortAll = document.querySelector("#sortAll");
$sortAll.addEventListener("click", () => {
  // We keep sorting _while_ there are numbers in the bank
  while (bank.length > 0) {
    sortFromBank();
  }
  render();
});