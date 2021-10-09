const allRoles = {
  admin: ['getUsers', 'manageUsers'],
  superadmin: [],
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
