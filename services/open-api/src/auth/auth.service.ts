import {Injectable, Logger} from '@nestjs/common';
import {ClientProxy, ClientProxyFactory} from "@nestjs/microservices";
import {authClientOptions} from "../config/auth_ms_client.config";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
    private authClient: ClientProxy;

    constructor(){
        this.authClient = ClientProxyFactory.create(authClientOptions);
    }

    async login(loginData: LoginDto){
       return this.authClient.send('login', loginData);
    }
}
