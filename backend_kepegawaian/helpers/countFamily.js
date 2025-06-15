// THIS FUNCTION PURPOSE IS TO COUNT THE EMPLOYEE'S FAMILIES AND WILL BE USED IN EMPLOYEE REPORT DATA FUNCTION
function summarizeFamily(families) {
  const count = {};

  // Loop each family to count status
  families.forEach((fam) => {
    const status = fam.relation_status;
    if (status) {
      count[status] = (count[status] || 0) + 1;
    }
  });

  return Object.entries(count)
    .map(([status, total]) => `${total} ${status}`)
    .join(' ');
}

module.exports = summarizeFamily;
