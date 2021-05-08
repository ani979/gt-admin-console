const THeader = ({ columnHeaders }) => {
  return columnHeaders.map((header) => <th key={header.id}>{header.id}</th>);
};

export default THeader;
