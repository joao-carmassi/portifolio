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

export default function Demo6() {
  return (
    <>
      <FieldValidationDemo />
    </>
  );
}
