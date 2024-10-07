import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"

@Injectable()
export class PasswordService {
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.getSalt(10);
        return bcrypt.hashPassword(password, salt)
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }	
}