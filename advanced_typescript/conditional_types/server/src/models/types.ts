export type UserRole = 'admin' | 'editor' | 'viewer';

export type userPermissions<T extends UserRole> = 
    T extends 'admin' ? {canEdit: true; canDelete: true}:
    T extends 'editor' ? {candEdit: true; canDelete: false} :
    {canEdit: false; canDelete: false};

export type userWithPermissions<T extends UserRole> = {
    id: number;
    username: string;
    role: T;
} & userPermissions<T>;

// Conditional document access
export type DocumentAccess<T extends boolean > = 
    T extends true ? {content: string} : {error: "unauthorized"};







