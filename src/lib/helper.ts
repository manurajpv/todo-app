export const generateRandomId = () => {
  const minCeiled = Math.ceil(1000);
  const maxFloored = Math.floor(9999);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
