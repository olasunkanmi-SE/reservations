import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy, RefreshTokenStrategy } from "./strategies";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [JwtModule.register({})],
  providers: [AccessTokenStrategy, RefreshTokenStrategy, AuthService, ConfigService],
})
export class AuthModule {}
