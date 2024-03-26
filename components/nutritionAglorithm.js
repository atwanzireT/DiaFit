// Function to check if blood glucose level is within target range
function checkBloodGlucoseLevel(currentLevel, targetRange) {
    return currentLevel >= targetRange[0] && currentLevel <= targetRange[1];
}

// Function to calculate recommended protein intake
function calculateProteinIntake(weight) {
    return weight * 0.8; // grams per kg of body weight
}

// Function to calculate recommended carbohydrate intake
function calculateCarbIntake(calories, carbPercentage) {
    return (calories * carbPercentage) / 400; // 4 calories per gram of carbohydrate
}

// Function to calculate recommended calcium intake
function calculateCalciumIntake(age) {
    return age >= 19 ? 1000 : 1300; // mg per day for adults, 1300 mg per day for ages 9-18
}

// Example usage
const currentGlucoseLevel = 120; // mmol/L
const targetGlucoseRange = [80, 130]; // mmol/L

console.log("Is blood glucose level within target range?", checkBloodGlucoseLevel(currentGlucoseLevel, targetGlucoseRange));

const weight = 70; // kg
const calories = 2000; // kcal
const carbPercentage = 50; // percentage of total calories

console.log("Recommended protein intake:", calculateProteinIntake(weight), "grams per day");
console.log("Recommended carbohydrate intake:", calculateCarbIntake(calories, carbPercentage), "grams per day");

const age = 25; // years

console.log("Recommended calcium intake:", calculateCalciumIntake(age), "mg per day");
