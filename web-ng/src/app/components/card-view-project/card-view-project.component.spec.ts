/**
 * Copyright 2021 Google LLC
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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NEVER } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { ProjectService } from '../../services/project/project.service';

import { CardViewProjectComponent } from './card-view-project.component';
import { UserProfilePopupComponent } from '../user-profile-popup/user-profile-popup.component';

@Component({ selector: 'gnd-header-layout', template: '' })
class HeaderLayoutComponent {}

describe('CardViewProjectComponent', () => {
  let component: CardViewProjectComponent;
  let fixture: ComponentFixture<CardViewProjectComponent>;
  const dialog: Partial<MatDialog> = {};
  const dialogRef: Partial<MatDialogRef<UserProfilePopupComponent>> = {};

  beforeEach(
    waitForAsync(() => {
      const projectService = jasmine.createSpyObj('ProjectService', [
        'getAllProjects',
      ]);

      const navigationService = {
        newProject: () => NEVER,
      };

      TestBed.configureTestingModule({
        declarations: [CardViewProjectComponent, HeaderLayoutComponent],
        providers: [
          { provide: MatDialog, useValue: dialog },
          { provide: MatDialogRef, useValue: dialogRef },
          { provide: ProjectService, useValue: projectService },
          { provide: NavigationService, useValue: navigationService },
          { provide: AngularFirestore, useValue: {} },
          { provide: AngularFireAuth, useValue: {} },
          {
            provide: AuthService,
            useValue: { getUser$: () => NEVER, isAuthenticated$: () => NEVER },
          },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
      fixture = TestBed.createComponent(CardViewProjectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
