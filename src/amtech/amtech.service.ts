import { Injectable, HttpService, forwardRef, Inject } from '@nestjs/common';
import { Observable, empty } from 'rxjs';
import { catchError, startWith } from "rxjs/operators";
import { AxiosResponse } from 'axios';

import { konsole } from '../utils/js';
import { ConfigService } from '../config/config.service';
import { MessageConnection } from './mqtt/messages';
import { Util } from 'src/utils/general';

@Injectable()
export class AmtechService {
    private sc: MessageConnection;

    constructor(
        public readonly http: HttpService,
        public readonly config: ConfigService,
    ) {
        this.startMqttConnetion();
    }

    startMqttConnetion() {
        let platformConfig = this.config.getPlatformConfig();
        let credentials = platformConfig.credentials;
        let topics = platformConfig.topics;

        const self = this;
        this.sc = new MessageConnection({
            username: credentials.username,
            password: credentials.password,
            tenant: credentials.tenant,
            registration: {
                topics: topics,
                messageCallback: (data) => {
                    konsole.debug("data: " + JSON.stringify(data));
                    delete data['_id'];
                    if (data && data['@type']) {
                        const type = Util.unqualify(data["@type"]);
                        if (type.startsWith('observationresourcecrud')) {
                            konsole.info('AmtechService-observationresourcecrud');
                            const resourcetype = data["resourcetype"].split("/");
                            const elementtype = resourcetype[resourcetype.length - 1]
                            const resourceuri = data["resourceuri"].split("/");
                            const elementname = resourceuri[resourceuri.length - 1]
                            konsole.debug('elementtype: ' + elementtype);
                        }
                        if (type.startsWith('smartThingStatus')) {
                            konsole.info('AmtechService-smartThingStatus');
                        }
                        if (type.startsWith('stSummaryObs')) {
                            konsole.info('AmtechService-stSummaryObs');
                            konsole.debug(`event inserted ${data['producer']} -> ${data['seenTracker']}`);
                        }
                        if (type.startsWith('pgSpottedDevice')) {
                            konsole.info('AmtechService-pgSpottedDevice');
                            konsole.debug(`event undated ${data['eventType']}: ${data['producer']} -> ${data['seenDevice']}`);
                        }
                    }
                },
                context: "",
                paramName: "topic",
                client: null
            },
            baseURL: platformConfig.mqtt
        });
    }

    stopMqttConnetion() {
        if (this.sc) {
            this.sc.closeAll();
        }
    }

    public requestError = (error: Response | Error): Observable<any> => {
        if (error['response'] && error['response']['status'] == 401) {
            konsole.debug("Credenciales Inválidas");
            konsole.trace(error['response']);
        } else {
            konsole.trace(error);
            konsole.debug("Error inesperado, validar conexión");
        }
        return empty().pipe(startWith(0));
    };
}
