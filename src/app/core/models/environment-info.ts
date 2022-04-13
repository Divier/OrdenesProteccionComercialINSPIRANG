export class ConstantEnv {
  code: string;
  value: string
  constructor(obj?: any) {
    this.code = (obj && obj.code) || undefined;
    this.value = (obj && obj.value) || undefined;
  }
}

export class ServiceEnv {
  name: string;
  url: string;
  timeOut: string;
  constructor(obj?: any) {
    this.name = (obj && obj.name) || undefined;
    this.url = (obj && obj.url) || undefined;
    this.timeOut = (obj && obj.timeOut) || undefined;
  }
}

export class EnvironmentInfo {
  service: ServiceEnv[];
  constant: ConstantEnv[];
  constructor(obj?: any) {
    this.service = (obj && obj.service) || [];
    this.constant = (obj && obj.constant) || [];
  }
}
