export type CreateUserParams = {
  username: string;
  email:string;
  password: string;
};
export type verifyUser = {
    email:string;
    password:string;
}

export type filterProduct = {
    productname:string;
    productprice:number;
    productavalible:number;
}