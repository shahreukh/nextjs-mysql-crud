export const Search = (data, searchQuery) => {
  const searchData = data.filter((element) => {
    return element.uuid.includes(searchQuery);
  });
  return searchData;
};
