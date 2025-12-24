import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  private profiles = [
    { id: randomUUID(), name: 'John Doe', description: 'A sample profile' },
    {
      id: randomUUID(),
      name: 'Jane Smith',
      description: 'Another sample profile',
    },
  ];

  findAll() {
    return this.profiles;
  }

  getById(id: string) {
    const matchingProfile = this.profiles.find((profile) => profile.id === id);

    if (!matchingProfile)
      throw new Error(`Profile with the ID ${id} not found.`);

    return matchingProfile;
  }

  createProfile(createProfileDto: CreateProfileDto) {
    const newProfile = {
      id: randomUUID(),
      //   name: createProfileDto.name,
      //   description: createProfileDto.description,
      ...createProfileDto,
    };
    this.profiles.push(newProfile);
    return newProfile;
  }

  updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    const matchingProfile = this.profiles.find(
      (existingProfile) => existingProfile.id === id,
    );

    if (!matchingProfile) {
      throw new NotFoundException(`Profile with the ID ${id} not found.`);
    }

    matchingProfile.name = updateProfileDto.name;
    matchingProfile.description = updateProfileDto.description;

    return matchingProfile;
  }

  removeProfile(id: string): void {
    const matchingProfile = this.profiles.findIndex(
      (profile) => profile.id === id,
    );

    if (matchingProfile === -1) {
      throw new NotFoundException(`Profile with the ID ${id} not found.`);
    }

    this.profiles.splice(matchingProfile, 1);
  }
}
