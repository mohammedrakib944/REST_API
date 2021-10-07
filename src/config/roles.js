const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
  ispOwner: [],
  reseller: [],
  collector: [],
  lineman: [],
  manager: [],
}

const roles = Object.keys(allRoles)
const roleRights = new Map(Object.entries(allRoles))

module.exports = {
  roles,
  roleRights,
}
