import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{

    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

    @Column()
    username:string;

    @Column()
    email :string;

    @Column()
    passwrod:string;

    


}