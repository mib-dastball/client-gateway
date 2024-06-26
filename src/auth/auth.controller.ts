import { Controller,Body, Get, Logger, Inject ,Post} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() registerUserDto : RegisterUserDto){
    return this.client.send('auth.register.user', registerUserDto);

  }
  @Post('login')
  login(@Body() loginUserDto :LoginUserDto){
    return this.client.send('auth.login.user', loginUserDto);

  }

  @Get('verify')
  async verify(){
    this.logger.log('auth');
    
    return this.client.send('auth.verify.token', {});

  }
}


