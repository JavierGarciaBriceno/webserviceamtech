import { machineIdSync } from 'node-machine-id';
import { konsole } from '../../utils/js';

import { Client, connect, IClientOptions, Packet } from 'mqtt';

export let id = machineIdSync();
export const dry = true;

export const finalId = id + (dry ? "dry" : "");

export class Registration {
   topics: string[];
   paramName: string = "topic";
   context: string = "/amtech/push/things/events";
   messageCallback: Function;
   client: Client;
}

export class SocketData {
   registration: Registration;
   tenant: string;
   username: string;
   password: string;
   baseURL: string;
}

export class MessageConnection {
   data: SocketData;
   constructor(data: SocketData) {
      this.data = data;
      this.register(data.registration);
   }

   register(registration: Registration) {

      const self = this;
      const n = registration.topics;

      const options: IClientOptions = {
         clientId: finalId,
         username: `${this.data.username}/${this.data.tenant}`,
         password: this.data.password,
         reconnectPeriod: 5000,
         clean: false
      }

      registration.client = connect(this.data.baseURL, options);
      const client = registration.client;

      client.on('error', function (err) {
         konsole.error(err);
         konsole.error(`${self.data.tenant}:${n} Queue error`);
      });
      client.on('connect', function () {
         client.subscribe(registration.topics, { qos: 2 })
         konsole.info(`${self.data.tenant}:${n} Queue connection established`);
      });
      client.on('message', (t: string, payload: Buffer, packet: Packet) => {
         const object = JSON.parse(payload.toString());
         registration.messageCallback(object);
      });
   }

   closeAll() {
      if (this.data && this.data.registration) {
         let registration = this.data.registration;
         konsole.info(`Closing ws for ${registration.topics}`);
         if (registration.client) {
            registration.client.end();
         }
      }
   }
}