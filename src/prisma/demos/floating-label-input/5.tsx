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

export default function Demo5() {
  return (
    <>
      <div className='w-72'>
        <Field data-invalid>
          <FloatingLabel>
            <FloatingLabel.Input
              className='bg-muted!'
              id='demo-field-error'
              type='email'
              aria-invalid
            />
            <FloatingLabel.Label className='bg-muted' htmlFor='demo-field-error'>
              Email
            </FloatingLabel.Label>
          </FloatingLabel>
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
      </div>
    </>
  );
}
