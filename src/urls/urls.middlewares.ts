import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../users/users.model';

// Si bien el token se refresca, por mucho que el token tenga un segundo de expiracion, el token se refresca cada vez que se hace una peticion
// Esto es contraproducente, ya que la idea es que se devuelva un error cuando el token expire
// Para solucionar esto, se puede crear un middleware que verifique si el token esta expirado o no
// Si el token expiro el usuario debe volver a iniciar sesion
// Si el token no expiro, se puede refrescar el token nuevamente
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    return res.status(401).json({
      ok: false,
      status: 401,
      message: 'Token is required',
    });
  }

  try {
    const token = bearerHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret, {
      ignoreExpiration: true,
    });

    if (decoded && typeof decoded === 'object' && decoded.exp !== undefined) {
      const expirationTimestamp = decoded.exp * 1000;
      const currentTimestamp = Date.now();

      if (expirationTimestamp < currentTimestamp) {
        const findUser = await User.findOne({
          where: {
            id: decoded.id,
            email: decoded.email,
          },
        });

        if (!findUser) {
          res.status(404).json({
            ok: false,
            status: 404,
            message: 'User not found',
          });
          return;
        }

        const refreshToken = jwt.sign(
          {
            id: findUser.id,
            email: findUser.email,
          },
          process.env.JWT_SECRET as Secret,
          {
            expiresIn: '24h',
          }
        );

        res.status(200).json({
          ok: true,
          status: 200,
          message: 'User found and token refreshed',
          data: {
            user: {
              id: findUser.id,
              username: findUser.username,
              email: findUser.email,
              token: refreshToken,
            },
          },
        });
      }
    }
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: `Internal server error: ${error.message}`,
      });
    }
  }
};

export const urlsMiddlewares = {
  verifyToken,
};
