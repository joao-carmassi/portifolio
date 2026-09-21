'use client';

import { FloatingLabel } from '@/prisma/ui/floating-label-input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from '@/prisma/ui/field';
import { FieldValidationDemo } from '@/prisma/demos/floating-label-field-validation';

export default function Demo1() {
  return (
    <>
      <div className='w-72'>
        <FloatingLabel>
          <FloatingLabel.Input className='bg-muted!' id='demo-email' type='email' />
          <FloatingLabel.Label className='bg-muted' htmlFor='demo-email'>
            Email
          </FloatingLabel.Label>
        </FloatingLabel>
      </div>
    </>
  );
}
