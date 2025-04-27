import { RoleUSER } from "../../prisma/role.enum";

export class JwtPayload {
  id: number;
  userType: keyof typeof RoleUSER;
}
