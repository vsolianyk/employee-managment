function getSimpleUserDetails(user) {
  const { firstName, lastName, email, _id } = user;
  return { firstName, lastName, email, _id };
}

module.exports = {
  getSimpleUserDetails
};
  