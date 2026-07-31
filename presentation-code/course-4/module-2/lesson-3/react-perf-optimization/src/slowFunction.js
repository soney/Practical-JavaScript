export default function slowFunction(n) {

  console.log("Computing...");

  // Artificially expensive loop (~100–300ms depending on machine)

  let total = 0;

  for (let i = 0; i < 3_000_000_000; i++) {

    total += i;

  }

  return n * 2;

}