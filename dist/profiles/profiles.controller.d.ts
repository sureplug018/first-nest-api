import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfilesController {
    findAll(age: number): {
        age: number;
    }[];
    create(createProfileDto: CreateProfileDto): {
        name: string;
        description: string;
    };
    update(id: string, updateProfileDto: UpdateProfileDto): {
        id: string;
        name: string;
        description: string;
    };
    remove(id: string): void;
}
