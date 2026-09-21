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

export default function Demo7() {
  return (
    <>
      <div className='w-80'>
        <FieldSet>
          <FieldLegend>Account Information</FieldLegend>
          <FieldDescription>Fill in your account details below.</FieldDescription>
          <FieldGroup>
            <Field>
              <FloatingLabel>
                <FloatingLabel.Input className='bg-muted!' id='demo-fs-name' />
                <FloatingLabel.Label className='bg-muted' htmlFor='demo-fs-name'>
                  Full Name
                </FloatingLabel.Label>
              </FloatingLabel>
            </Field>
            <Field>
              <FloatingLabel>
                <FloatingLabel.Input
                  className='bg-muted!'
                  id='demo-fs-email'
                  type='email'
                />
                <FloatingLabel.Label className='bg-muted' htmlFor='demo-fs-email'>
                  Email
                </FloatingLabel.Label>
              </FloatingLabel>
              <FieldDescription>We&apos;ll send a confirmation to this address.</FieldDescription>
            </Field>
            <Field>
              <FloatingLabel>
                <FloatingLabel.Input
                  className='bg-muted!'
                  id='demo-fs-password'
                  type='password'
                />
                <FloatingLabel.Label
                  className='bg-muted'
                  htmlFor='demo-fs-password'
                >
                  Password
                </FloatingLabel.Label>
              </FloatingLabel>
              <FieldDescription>Must be at least 8 characters.</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </>
  );
}
