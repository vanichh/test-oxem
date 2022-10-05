export const monthlyPayment = (
  price: number,
  initial: number,
  months: number,
  bet = 0.035
) => {
  return Math.ceil(
    (price - initial) *
      ((0.035 * Math.pow(1 + 0.035, months)) /
        (Math.pow(1 + 0.035, months) - 1))
  );
};
