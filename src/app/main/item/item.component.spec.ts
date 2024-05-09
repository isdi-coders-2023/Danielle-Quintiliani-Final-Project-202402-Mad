import { ComponentFixture, TestBed } from '@angular/core/testing';

import ItemComponent from './item.component';
import { StateService } from '../../core/state/state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockStateService = jasmine.createSpyObj('StateService', [
  'loadItems',
  'getState',
]);
describe('ItemComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent, HttpClientTestingModule],
      providers: [{ provide: StateService, useValue: mockStateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
