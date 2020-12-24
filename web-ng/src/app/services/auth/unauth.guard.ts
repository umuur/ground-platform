/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const DEFAULT_ROUTE = ['p', ':new'];

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUser$().pipe(
      map(response => {
        if (environment.useEmulators) {
          this.router.navigate(DEFAULT_ROUTE);
          return false;
        }
        if (response.isAuthenticated) {
          this.router.navigate(DEFAULT_ROUTE);
          return false;
        }
        return true;
      }),
      catchError(() => {
        return of(true);
      })
    );
  }
}
