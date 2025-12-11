import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { CreateUserParams, verifyUser } from "src/utills/types";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';





@Injectable()
export class Userservice{

constructor(
        @InjectRepository(User) private userRepository:Repository<User>
){}

    private readonly SALT_ROUNDS = 10;

    async hashPassword(plainPassword: string): Promise<string>{
        return bcrypt.hash(plainPassword, this.SALT_ROUNDS);
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>{
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    async createUser(userDetails:CreateUserParams): Promise<User>{
        const { password, ...rest } = userDetails;
        const hashed = await this.hashPassword(password);

        // Note: the entity currently uses the field name `passwrod` (typo).
        // We store the hashed password there to match the entity.
        const user = this.userRepository.create({ ...rest, passwrod: hashed } as User);
        return  await this.userRepository.save(user);
    }
    async verifyUser(userDetails:verifyUser){
        const {password, email} = userDetails;
        const user = await this.userRepository.findOne({
            where: { email }
        });
        
        if (!user || !user.passwrod) {
            return false; // User not found or password hash is missing
        }
        
        // Compare plaintext password with the stored hash (do NOT hash again)
        const isPasswordValid = await this.comparePassword(password, user.passwrod);
        return isPasswordValid;
    }

}


