import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Department } from '../../shared/models/department.model';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const departments: Department[] = [
      {
        id: 1,
        name: 'Cardiology',
        description:
          'Specializes in diagnosing and treating diseases of the heart and blood vessels.',
      },
      {
        id: 2,
        name: 'Pediatrics',
        description: 'Provides healthcare for infants, children, and adolescents.',
      },
      {
        id: 3,
        name: 'Orthopedics',
        description: 'Focuses on conditions involving the musculoskeletal system.',
      },
    ];
    return { departments };
  }

  post(reqInfo: RequestInfo): Observable<ResponseOptions> | undefined {
    if (reqInfo.url.endsWith('/api/login')) {
      return this.handleLogin(reqInfo);
    }
    return undefined;
  }

  get(reqInfo: RequestInfo): Observable<ResponseOptions> | undefined {
    if (reqInfo.url.endsWith('/api/departments')) {
      return this.handleItems(reqInfo);
    }
    return undefined;
  }

  private handleLogin(reqInfo: RequestInfo): Observable<ResponseOptions> {
    const { email, password } = reqInfo.utils.getJsonBody(reqInfo.req) ?? {};

    if (password && String(password).trim() !== '') {
      const body = {
        token: 'fake-jwt-token-12345',
        user: { email },
      };
      const options: ResponseOptions = { status: STATUS.OK, body };
      return reqInfo.utils.createResponse$(() => options);
    }

    const options: ResponseOptions = {
      status: STATUS.UNAUTHORIZED,
      body: { error: 'Invalid credentials' },
    };
    return reqInfo.utils.createResponse$(() => options);
  }

  private handleItems(reqInfo: RequestInfo): Observable<ResponseOptions> {
    const req = reqInfo.req as Request;
    const authHeader = req.headers.get('Authorization');

    if (authHeader !== 'Bearer fake-jwt-token-12345') {
      const unauthorized: ResponseOptions = {
        status: STATUS.UNAUTHORIZED,
        body: { error: 'Missing or invalid token' },
      };
      return reqInfo.utils.createResponse$(() => unauthorized);
    }

    const db = reqInfo.utils.getDb() as { departments: Department[] };
    const departments = db?.departments ?? [];

    const options: ResponseOptions = {
      status: STATUS.OK,
      body: departments,
    };
    return reqInfo.utils.createResponse$(() => options);
  }
}
