function factorial(n) {
  if (n === 1) return 1; // Last in
  return n * factorial(n - 1);
}

factorial(4);