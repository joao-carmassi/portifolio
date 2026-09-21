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

export default function Demo2() {
  return (
    <>
      <div className='flex w-72 flex-col gap-4'>
        <FloatingLabel>
          <FloatingLabel.Input className='bg-muted!' id='demo-name' />
          <FloatingLabel.Label className='bg-muted' htmlFor='demo-name'>
            Full Name
          </FloatingLabel.Label>
        </FloatingLabel>
        <FloatingLabel>
          <FloatingLabel.Input
            className='bg-muted!'
            id='demo-email-2'
            type='email'
          />
          <FloatingLabel.Label className='bg-muted' htmlFor='demo-email-2'>
            Email
          </FloatingLabel.Label>
        </FloatingLabel>
        <FloatingLabel>
          <FloatingLabel.Input
            className='bg-muted!'
            id='demo-password'
            type='password'
          />
          <FloatingLabel.Label className='bg-muted' htmlFor='demo-password'>
            Password
          </FloatingLabel.Label>
        </FloatingLabel>
      </div>
    </>
  );
}
