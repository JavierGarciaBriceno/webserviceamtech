import { konsole } from "./js";

export class Util {

  static unqualify(str: string): string {
    return str ? str.substring(str.lastIndexOf("/") + 1, str.length) : "";
  }

  static extractAmtechType(str: string): string {
    return str ? str.substring(str.lastIndexOf("/", str.lastIndexOf("/") - 1) + 1, str.lastIndexOf("/")) : "";
  }

  static areEmpties(data: any, props: any[]) {
    if (!data || !props) {
      return true;
    }
    konsole.debug(`${JSON.stringify(data)}`)
    console.log(props);


    for (let prop of props) {
      konsole.debug(`empty ${prop} ${data[prop]}  ?`)

      if (!data[prop]) {
        return true;
      }
    }
    return false;
  }
  static areSEmpties(...props: any[]) {


    if (!props) {
      return true;
    }
    for (let prop in props) {
      konsole.debug(`empty ${prop} ?`)
      if (!prop) {
        return true;
      }
    }
    konsole.debug(`Not empty ${props}`)
    return false;
  }


  static isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  static isValidDate(date): boolean {
    //@ts-ignore
    return !isNaN(new Date(date));
  }

  static parseBoolean(obj: any): Boolean {
    return obj && (obj.constructor.name === 'Boolean' ? obj : obj === 'true');
  }
}
