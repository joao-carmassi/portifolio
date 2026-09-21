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

export default function Demo4() {
  return (
    <>
      <div className='w-72'>
        <Field>
          <FloatingLabel>
            <FloatingLabel.Input
              className='bg-muted!'
              id='demo-field-email'
              type='email'
            />
            <FloatingLabel.Label className='bg-muted' htmlFor='demo-field-email'>
              Email
            </FloatingLabel.Label>
          </FloatingLabel>
          <FieldDescription>We&apos;ll never share your email.</FieldDescription>
        </Field>
      </div>
    </>
  );
}
