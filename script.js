const calories = document.querySelector(".macro-calculator .result .calories");
const proteincals = document.querySelector(".macro-calculator .result .proteincals");
const carbcals = document.querySelector(".macro-calculator .result .carbcals");
const fatcals = document.querySelector(".macro-calculator .result .fatcals");

const proteingrams = document.querySelector(".macro-calculator .result .proteingrams");
const carbgrams = document.querySelector(".macro-calculator .result .carbgrams");
const fatgrams = document.querySelector(".macro-calculator .result .fatgrams");

const calculateBtn = document.querySelector(".macro-calculator .calculate .calculate-btn");
const age = document.querySelector(".macro-calculator form #age");
const height = document.querySelector(".macro-calculator form #height");
const weight = document.querySelector(".macro-calculator form #weight");
const errorMessage = document.querySelector(".macro-calculator .calculate .error-message");
const result = document.querySelector(".macro-calculator .result");
const activity = document.querySelector(".macro-calculator form #activity");
const goal = document.querySelector(".macro-calculator form #goal");


const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// BUTTON OPENS MORE INFO MODALLY
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "CLOSE" BUTTON CLOSES MORE INFO
closeButton.addEventListener("click", () => {
  dialog.close();
});


// BMR CALCULATION
const calculateBMR = (weight, height, age, gender) => {
  if (gender == "male") {
    return 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
  }

  return 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
};


// ACTIVITY CALCULATION
const calcActivity = (activity) => {

  if (activity == "1") {
    return 1.2;
  } else if (activity == "2") {
    return 1.375;
  } else if (activity == "3") {
    return 1.55;
  } else if (activity == "4") {
    return 1.725;
  } else if (activity == "5") {
    return 1.9;
  } 
}; 


// GOAL CALCULATION
const calcGoal = (goal) => {
  if (goal == "1") {
    return 0;
  } else if (goal == "2") {
    return -500;
  } else if (goal == "3") {
    return -250;
  } else if (goal == "4") {
    return 250;
  } else if (goal == "5") {
    return 500;
  }
};


// ADD & REMOVE RESULTS & ERROR MESSAGE
calculateBtn.addEventListener("click", () => {
  if (
    age.classList.contains("invalid") ||
    height.classList.contains("invalid") ||
    weight.classList.contains("invalid")
  ) {
    errorMessage.classList.add("active");
    result.classList.remove("active");
    return;
  }

  errorMessage.classList.remove("active");
  result.classList.add("active");


  // FUNCTION TO CALCULATE ALL RESULTS
  let genderValue = document.querySelector(".macro-calculator form input[name='gender']:checked").value;
  let activityValue = document.querySelector(".macro-calculator form select option:checked").value
  let goalValue = document.getElementById("goal-list").value;

  let BMR = calculateBMR(weight.value, height.value, age.value, genderValue);
  let ACT = calcActivity(activityValue);
  let GOAL = calcGoal(goalValue);
  let CALS = Math.round((BMR * ACT) + GOAL);
  let proteinCals = Math.round((CALS * 0.25));
  let carbCals = Math.round((CALS * 0.5));
  let fatCals = Math.round((CALS * 0.25));
  let proteinGrams = Math.round((proteinCals / 4));
  let carbGrams = Math.round((carbCals / 4));
  let fatGrams = Math.round((fatCals / 9));

  calories.innerHTML = CALS.toLocaleString("en-US");
  proteincals.innerHTML = proteinCals.toLocaleString("en-US");
  carbcals.innerHTML = carbCals.toLocaleString("en-US");
  fatcals.innerHTML = fatCals.toLocaleString("en-US");
  proteingrams.innerHTML = proteinGrams.toLocaleString("en-US");
  carbgrams.innerHTML = carbGrams.toLocaleString("en-US");
  fatgrams.innerHTML = fatGrams.toLocaleString("en-US");
});



// VALIDATE INPUTS

age.addEventListener("input", (e) => {
  let ageValue = e.target.value;

  if (!ageValue || isNaN(ageValue) || ageValue < 10 || ageValue > 100) {
    age.classList.add("invalid");
  } else {
    age.classList.remove("invalid");
  }
});

height.addEventListener("input", (e) => {
  let heightValue = e.target.value;

  if (!heightValue || isNaN(heightValue) || heightValue < 0) {
    height.classList.add("invalid");
  } else {
    height.classList.remove("invalid");
  }
});

weight.addEventListener("input", (e) => {
  let weightValue = e.target.value;

  if (!weightValue || isNaN(weightValue) || weightValue < 0) {
    weight.classList.add("invalid");
  } else {
    weight.classList.remove("invalid");
  }
});