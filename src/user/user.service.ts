import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { GenericService } from 'src/common/services/generic.service';
import { PasswordService } from 'src/common/services/password.service';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {
    super(userRepository);
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    const newUser = {...createUserDto, password: hashedPassword}
    return this.userRepository.save(newUser);
  }

  async findAllUser(): Promise<User[]> {
    return super.findAll()
  }

  async findOneUser(id: string): Promise<User> {
    return super.findById(id)
  }

  async updateUser(id: string, updatedUserDto: UpdateUserDto): Promise<User> {
    return super.update(id, updatedUserDto)
  }

  async deleteUser(id: string): Promise<User> {
    return super.delete(id)
  }
}
