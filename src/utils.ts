export const getItemInitialState = (item: string) => {
  const localState = localStorage.getItem(item);
  if (localState) {
    const parse = JSON.parse(localState);
    return parse;
  }
  return [];
};
