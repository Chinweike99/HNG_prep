import express from 'express'
const app = express();
const port = process.env.PORT || 3000;

// Helper functions for mathematical properties
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isPerfect = (num) => {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) sum += i;
  }
  return sum === num;
};

const isArmstrong = (num) => {
  const digits = String(num).split("");
  const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), digits.length), 0);
  return sum === num;
};

const digitSum = (num) => {
  return String(num)
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);
};

// Predefined fun facts
const funFacts = {
  371: "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371.",
  7: "7 is considered a lucky number in many cultures.",
  42: "42 is the answer to the Ultimate Question of Life, the Universe, and Everything.",
};

// API endpoint
app.get("/api/number", (req, res) => {
  const num = parseInt(req.query.num);

  // Validate input
  if (isNaN(num)) {
    return res.status(400).json({
      number: req.query.num,
      error: true,
    });
  }

  // Calculate properties
  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  if (num % 2 !== 0) properties.push("odd");
  if (num % 2 === 0) properties.push("even");

  const response = {
    number: num,
    prime: isPrime(num),
    perfect: isPerfect(num),
    properties: properties,
    digit_sum: digitSum(num),
    fun_fact: funFacts[num] || "No fun fact available for this number.",
  };

  res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});