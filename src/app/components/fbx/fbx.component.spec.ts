import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbxComponent } from './fbx.component';

describe('FbxComponent', () => {
  let component: FbxComponent;
  let fixture: ComponentFixture<FbxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
