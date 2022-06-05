interface IAdmin {
    id: string;
    email: string;
    adminKey: string;
}

interface IAdminRepo {
    findAdmin: (id: string) => Promise<IAdmin>;
}

export { IAdminRepo, IAdmin };
