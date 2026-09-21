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

export default function Demo3() {
  return (
    <>
      <div className='w-72'>
        <FloatingLabel>
          <FloatingLabel.Input
            id='styled-demo'
            className='rounded-full border-primary/50 px-5 focus:border-primary bg-muted!'
          />
          <FloatingLabel.Label
            htmlFor='styled-demo'
            className='left-3 text-primary bg-muted'
          >
            Username
          </FloatingLabel.Label>
        </FloatingLabel>
      </div>
    </>
  );
}
