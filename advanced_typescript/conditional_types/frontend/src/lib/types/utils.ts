import { User, UserRole } from "./roles";



// Utiltity to check if a User has a specific role
export type IsUserRole<T extends UserRole, U extends User> =
    U extends User<T> ? true : false;


    // Conditional types to extract properties available
    export type ExtractRoleProperties<
    T extends UserRole,
    U extends User
    > = U extends User<T> ? U : never; 



// Type guard Function
// export function isUserRole<T extends UserRole>(
//   user: User<UserRole>,
//   role: T
// ): user is User<T> {
//   if (user.role !== role) return false;
  
//   if (role === 'admin') {
//     return 'canDeleteUsers' in user && 'canConfigureSystem' in user;
//   }
  
//   if (role === 'editor') {
//     return 'canPublishPosts' in user && 'draftLimit' in user;
//   }
  
//   return 'canComment' in user && 'canLike' in user;
// }


// Conditional type for route permissions
export type RoutePermissions<T extends UserRole> = {
    canAccess: boolean;
    redirectTo?: string;
} & (T extends 'admin' ? {
    auditLog: boolean
}: {});


// Generic permission checker
export function checkPermission<T extends UserRole>(
    user: User,
    requiredRole: T
): RoutePermissions<T> {
    const basePermissions = {
        canAccess: user.role === requiredRole,
        redirectTo: user.role === 'admin' ? '/admin' : user.role === 'editor' ? '/editor' : '/'
    };

    if(user.role === 'admin' && requiredRole === 'admin') {
        return{
            ...basePermissions,
            auditLog: true,
        } as RoutePermissions<T>;
    }

    return basePermissions as RoutePermissions<T>;
}




