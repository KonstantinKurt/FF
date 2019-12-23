import {User} from "../interface/user.interface";

export function checkIpInDB(user: User, ip: string): boolean {
    return user.ip.some(element => element === ip);
}
