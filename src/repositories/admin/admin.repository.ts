interface IAdmin {
    id?: string;
    email: string;
    password: string;
    adminKey: string;
}

interface IAdminRepo {
    findAdmin: (id: string) => Promise<IAdmin>;
    createAdmin: (admin: IAdmin) => Promise<IAdmin>;
}

export { IAdminRepo, IAdmin };
