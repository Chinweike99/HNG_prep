export type UserRole = 'admin' | 'editor' | 'viewer';


export interface BaseUser {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

// COnditional type for different roles
export type User<T extends UserRole = UserRole> = BaseUser & {
    role: T;
} & (T extends 'admin'? {
    canDeleteUsers: boolean;
    canConfigureSytem: boolean;
 } : T extends 'editor' ? {
    canPublishPosts: boolean;
    draftLimit: number;
 }: {
    canComment: boolean;
    canLike: boolean;
 });

 // Utility type to extract permissions for a role

 export type PermissionsForRole<T extends UserRole> = 
    T extends 'admin' ? Adminpermissions:
    T extends 'editot' ? EditorPermissions :
    ViewwerPermissions;


type Adminpermissions = {
    canDeleteUsers: boolean;
    canConfigureSystem: boolean;
    canEditAllPosts: boolean;
    canPublish: boolean;
};

type EditorPermissions = { 
    canPublishPosts: boolean;
    canEditOwnPosts: boolean;
    draftLimit: number;
};

type ViewwerPermissions = {
    canComment: boolean;
    canLike: boolean;
}


// Conditionals return type based on input role
export type UserAPIResponse<T extends UserRole> = {
    user: User<T>;
    permissions: PermissionsForRole<T>;
}

// Generic type for role-guarded functions
export type RoleGuardedFunction<
    T extends UserRole,
    Args extends any[],
    ReturnType
> = (user: User<T>, ...args: Args) => ReturnType;



// type BaseUser = {
//     id: string;
//     name: string;
//     email: string;
//   };
  
//   export type UserRole = 'admin' | 'editor' | 'viewer';
  
//   export type User<T extends UserRole = UserRole> = BaseUser & {
//     role: T;
//   } & (T extends 'admin' ? {
//       canDelete: true;
//       canCreate: true;
//       canEditAll: true;
//     } : T extends 'editor' ? {
//       canCreate: true;
//       canEditOwn: true;
//     } : {
//       canComment: true;
//     });
  
//   export type Permissions = {
//     canCreate: boolean;
//     canEdit: boolean;
//     canDelete: boolean;
//   };
  
//   export const getPermissions = <T extends UserRole>(role: T): Permissions => {
//     return {
//       canCreate: role === 'admin' || role === 'editor',
//       canEdit: role === 'admin' || role === 'editor',
//       canDelete: role === 'admin',
//     } as Permissions;
//   };


