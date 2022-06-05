interface IAdmin {
    id: string;
    email: string;
    password: string;
    adminKey: string;
}

interface IAdminRepo {
    findAdmin: (id: string) => Promise<IAdmin>;
}

export { IAdminRepo, IAdmin };
