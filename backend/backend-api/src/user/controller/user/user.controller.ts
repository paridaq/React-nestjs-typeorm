import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/CreateUser.dto';
import { VerifyUserDto } from 'src/user/dtos/verifyUser.dto';
import { Userservice } from 'src/user/service/user.service';

@Controller('user')
export class UserController {
   
    
    constructor(private userService:Userservice){}

    @Post('register')
    async createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto)
    }

    @Post('login')
    async loginUser(@Body() verifyUserDto:VerifyUserDto){
        const isValid = await this.userService.verifyUser({
            email: verifyUserDto.email,
            password: verifyUserDto.password
        });
        
        if (isValid) {
            return { success: true, message: 'Login successful' };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    }
}
