export const Paginate = (data, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;

  // Check if data is defined and has a valid length
  if (!data || data.length === 0) return [];

  return data.slice(startIndex, startIndex + pageSize);
};
