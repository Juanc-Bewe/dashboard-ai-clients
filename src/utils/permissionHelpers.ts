/**
 * Validates if a user has a specific permission
 * @param permission - The permission to check for
 * @param permissions - Array of user permissions
 * @returns true if user has the permission or has "*" (all permissions), false otherwise
 */
export const hasPermission = (permission: string, permissions: string[]): boolean => {
  // If user has wildcard permission, they have access to everything
  if (permissions.includes("*")) {
    return true;
  }
  
  // Check if user has the specific permission
  return permissions.includes(permission);
};

/**
 * Validates if a user has any of the specified permissions
 * @param permissionList - Array of permissions to check for
 * @param permissions - Array of user permissions
 * @returns true if user has any of the permissions or has "*" (all permissions), false otherwise
 */
export const hasAnyPermission = (permissionList: string[], permissions: string[]): boolean => {
  // If user has wildcard permission, they have access to everything
  if (permissions.includes("*")) {
    return true;
  }

  // Check if user has any of the specific permissions
  return permissionList.some(permission => permissions.includes(permission));
};

/**
 * Validates if a user has all of the specified permissions
 * @param permissionList - Array of permissions to check for
 * @param permissions - Array of user permissions
 * @returns true if user has all permissions or has "*" (all permissions), false otherwise
 */
export const hasAllPermissions = (permissionList: string[], permissions: string[]): boolean => {
  // If user has wildcard permission, they have access to everything
  if (permissions.includes("*")) {
    return true;
  }
  
  // Check if user has all of the specific permissions
  return permissionList.every(permission => permissions.includes(permission));
}; 