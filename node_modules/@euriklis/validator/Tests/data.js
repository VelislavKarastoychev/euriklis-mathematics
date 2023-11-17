export const print = (method, t1, t2) => {
  console.log(`Testing of ${method} method/s:`);
  console.table({ "@euriklis/validator": t1, "inner js methods": t2 });
};
export const booleanArray = Array.from({ length: 1000000 }).map((_) =>
  Math.random() > 0.5
);
export const numericArray = Array.from({ length: 1000000 }).map(Math.random);
export const intArray = numericArray.map((item) => item * 100 | 0);
export const negativeNumericArray = numericArray.map((item) => -item);
export const negativeIntArray = intArray.map((item) => item ? -item : -1);
export const stringArray = numericArray.map((el) => el + "");
export const functionArray = numericArray.map((_, i) => () => console.log(i));
export const objectArray = numericArray.map((_) => {
  return {};
});
// objArr.push([]);
export const matrix = Array.from({ length: 100 }).map((_) =>
  Array.from({ length: 1000 }).map(Math.random)
);
export const matrix1 = Array.from({ length: 100 }).map((_) =>
  Array.from({ length: 1000 }).map(Math.random)
);
export const addMatrices = (m1, m2) => {
  if (!m1 || !m2) {
    const error = new Error();
    error.name = "Matrix funciton error message";
    error.message = "Incorrectly defined matrices in the add function.";
  }
  const n = m1.length;
  const m = m1[0].length;
  const sum = [];
  for (let i = 0; i < n; i++) {
    sum[i] = [];
    for (let j = 0; j < m; j++) {
      sum[i][j] = m1[i][j] + m2[i][j];
    }
  }
  return sum;
};
export const integerMatrix = matrix.map((row) =>
  row.map((el) => el * 100 >> 0)
);
export const stringMatrix = integerMatrix.map((row) =>
  row.map((el) => String.fromCharCode(el))
);
export const objectMatrix = Array.from({ length: 1000 }).map((_) =>
  Array.from({ length: 1000 }).map((_) => ({
    id: Math.random(),
    number: Math.random() * Math.E,
  }))
);
export const map = new Map([["a", 1], ["b", 2]]);
