import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCompany } from './my-company';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('MyCompany', () => {
  let component: MyCompany;
  let fixture: ComponentFixture<MyCompany>;
  let mockFormBuilder: FormBuilder;
  let mockLocation: Partial<Location>;

  beforeEach(async () => {
    mockFormBuilder = new FormBuilder();
    mockLocation = { back: () => {} };

    await TestBed.configureTestingModule({
      imports: [MyCompany, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: Location, useValue: mockLocation }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCompany);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the company form as disabled', () => {
    expect(component.companyForm).toBeDefined();
    expect(component.companyForm.disabled).toBeTrue();
  });

  it('should enable form and change label to Salvar when entering edit mode', () => {
    component.onSubmit(); 
    expect(component.isEditing).toBeTrue();
    expect(component.sendLabel).toBe('Salvar');
    expect(component.companyForm.enabled).toBeTrue();
  });

  it('should disable form and change label to Entrar em modo de edição when exiting edit mode', () => {
    component.isEditing = true; 
    component.companyForm.enable();
    component.onSubmit(); 
    expect(component.isEditing).toBeFalse();
    expect(component.sendLabel).toBe('Entrar em modo de edição');
    expect(component.companyForm.disabled).toBeTrue();
  });

  it('should reset form and disable it when onCancel is called in edit mode', () => {
    component.isEditing = true;
    component.companyForm.controls['name'].setValue('New Name');
    component.onCancel();
    expect(component.isEditing).toBeFalse();
    expect(component.sendLabel).toBe('Entrar em modo de edição');
    expect(component.companyForm.disabled).toBeTrue();
    expect(component.companyForm.controls['name'].value).toBe('Minha Empresa S.A.'); 
  });

  it('should call location.back() when onCancel is called not in edit mode', () => {
    const backSpy = spyOn(mockLocation, 'back');
    component.isEditing = false;
    component.onCancel();
    expect(backSpy).toHaveBeenCalled();
  });
});
