import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Product{

    @PrimaryGeneratedColumn({type:"bigint"})
    id :number;

    @Column()
    productname:string;

    @Column()
    productprice: number;

    @Column({default:0})
    productavalible:number;
}