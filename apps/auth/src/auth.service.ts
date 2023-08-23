import { HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { IJwtPayload, ISignUpTokens, IUserPayload } from "./interfaces/auth.interface";
import { GenericDocumentRepository } from "@app/shared-kernel/infrastructure/database/generic-document.repository";
import { throwApplicationError } from "@app/shared-kernel/utils/exception.instance";
import { Result } from "@app/shared-kernel/domain";
import { saltRounds } from "apps/book/src/constants/contstants";

/**
 *Authentication service class
 *
 * @exports
 * @class AuthService
 * @implements {IAuthService}
 */
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  /**
   * method to generate access and refresh token
   *
   * @param {IUserPayload} payload
   * @returns {Promise<ISignUpTokens>}
   * @memberof AuthService
   */
  protected async generateAuthTokens(payload: IUserPayload): Promise<ISignUpTokens> {
    const { userId, email, role } = payload;
    const jwtPayload: IJwtPayload = {
      sub: userId,
      email,
      role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(jwtPayload),
      this.signRefreshToken(jwtPayload),
    ]);

    return {
      refreshToken,
      accessToken,
    };
  }

  /**
   * method to sign access token
   *
   * @param {IJwtPayload} jwtPayload
   * @returns {Promise<string>}
   * @memberof AuthService
   */
  protected async signAccessToken(jwtPayload: IJwtPayload): Promise<string> {
    return this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
      expiresIn: this.configService.get<string>("JWT_ACCESS_TOKEN_EXPIRATION_TIME"),
    });
  }

  /**
   * method to sign refresh token
   *
   * @param {IJwtPayload} jwtPayload
   * @returns {Promise<string>}
   * @memberof AuthService
   */
  protected async signRefreshToken(jwtPayload: IJwtPayload): Promise<string> {
    return this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
      expiresIn: this.configService.get<string>("JWT_REFRESH_TOKEN_EXPIRATION_TIME"),
    });
  }

  /**
   * method to hash tokens
   *
   * @param {string} prop
   * @param {number} saltRound
   * @returns {Promise<string>}
   * @memberof AuthService
   */
  protected async hashData(prop: string, saltRounds: number): Promise<string> {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hash(prop, salt);
  }

  /**
   * Generic method to update refresh token
   *
   * @param {GenericDocumentRepository<any>} model
   * @param {Types.ObjectId} userId
   * @param {string} refreshToken
   * @returns {Promise<{ accessToken: string }>}
   * @memberof AuthService
   */
  protected async updateRefreshToken(
    model: GenericDocumentRepository<any, any>,
    userId: Types.ObjectId,
    refreshToken: string
  ): Promise<{ accessToken: string }> {
    const result: Result<any> = await model.findById(userId);

    if (result.isSuccess === false) {
      throwApplicationError(HttpStatus.FORBIDDEN, "Access denied");
    }
    const userEntity = await result.getValue();
    const { refreshTokenHash, role, email } = userEntity;
    const verifyToken = await bcrypt.compare(refreshToken, refreshTokenHash);

    if (!verifyToken) {
      throwApplicationError(HttpStatus.FORBIDDEN, "Access denied");
      this.nullifyRefreshToken(model, userId);
    }

    const payload = { userId, email, role };
    const newTokens = await this.generateAuthTokens(payload);
    const tokenHash = await this.hashData(newTokens.refreshToken, saltRounds);

    await model.findOneAndUpdate({ _id: userEntity.id }, { refreshTokenHash: tokenHash });

    return {
      accessToken: newTokens.accessToken,
    };
  }

  /**
   * method to log Out On Security Breach
   *
   * @param {GenericDocumentRepository<any>} model
   * @param {Types.ObjectId} userId
   * @returns {void}
   * @memberof AuthService
   */
  protected async nullifyRefreshToken(model: GenericDocumentRepository<any, any>, userId: Types.ObjectId) {
    const docResult: Result<any> = await model.findById(userId);

    if (docResult) {
      await model.findOneAndUpdate(
        {
          _id: userId,
        },
        { refreshTokenHash: null }
      );
    }
  }

  /**
   * method to log Out On Security Breach
   *
   * @param {GenericDocumentRepository<any>} model
   * @param {Types.ObjectId} userId
   * @returns {void}
   * @memberof AuthService
   */
  async logOut(model: GenericDocumentRepository<any, any>, userId: Types.ObjectId) {
    let result: Result<any | null> = await model.findById(userId);

    if (result.isSuccess === false) {
      throwApplicationError(HttpStatus.NOT_FOUND, "User does not exist");
    }
    const user = await result.getValue();

    if (result && user.refreshTokenHash !== undefined && user.refreshTokenHash !== null) {
      result = await model.findOneAndUpdate(
        {
          _id: userId,
        },
        { refreshTokenHash: null }
      );
      if (result.isSuccess === false) {
        throwApplicationError(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to update data");
      }
    }
  }
}
