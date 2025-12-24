import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import type { UUID } from 'crypto';
import { ProfilesGuard } from './profiles.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  //   @Get()
  //   findAll(@Query('age') age: number) {
  //     return [{ age }];
  //   }

  @Get()
  findALl() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: UUID) {
    try {
      return this.profilesService.getById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('An unknown error occurred');
    }
  }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.createProfile(createProfileDto);
  }

  //   @Post()
  //   create(@Body() createProfileDto: CreateProfileDto) {
  //     return {
  //       name: createProfileDto.name,
  //       description: createProfileDto.description,
  //     };
  //   }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateProfile(id, updateProfileDto);
  }

  //   @Delete(':id')
  //   @HttpCode(HttpStatus.NO_CONTENT)
  //   remove(@Param('id') id: string) {
  //     return { message: `Profile with id ${id} has been removed.` };
  //   }

  @Delete(':id')
  @UseGuards(ProfilesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    this.profilesService.removeProfile(id);
  }
}
