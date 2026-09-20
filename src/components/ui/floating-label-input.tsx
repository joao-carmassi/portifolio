import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from './textarea';

/*
 * @author: @joao-carmassi
 * @description: Floating label input — the label floats above the input when focused or filled.
 * Uses a compound component pattern: FloatingLabel as root, .Input and .Label as children.
 * Compatible with shadcn Field component for descriptions, errors, and accessible form layouts.
 * @version: 2.1.0
 * @date: 2026-02-04
 * @license: MIT
 * @reference: https://shadcnui-expansions.typeart.cc/docs/floating-label-input
 */

// the floating label punches a bg-card hole through the field's border, so the
// field has to be that same colour. Input/Textarea tint themselves in dark.
const FILL = 'dark:bg-transparent';

function FloatingInput({
  className,
  ...props
}: React.ComponentProps<'input'>): React.ReactNode {
  return (
    <Input placeholder=' ' className={cn('peer', FILL, className)} {...props} />
  );
}

function FloatingTextarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>): React.ReactNode {
  return (
    <Textarea
      placeholder=' '
      className={cn('peer', FILL, className)}
      {...props}
    />
  );
}

function FloatingLabelText({
  className,
  ...props
}: React.ComponentProps<'label'>): React.ReactNode {
  return (
    // the old project wrapped Radix's Label here; a plain <label> renders the
    // same element and keeps the click-to-focus that htmlFor already gives
    <label
      data-slot='label'
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        'absolute inset-s-2 top-0.5 z-10 origin-left -translate-y-3 translate-x-1 scale-75 transform bg-card px-2 text-sm text-muted-foreground duration-300',
        'peer-placeholder-shown:top-4.5 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-x-0',
        'peer-focus:top-0.5 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-foreground peer-focus:translate-x-1',
        'cursor-text',
        className,
      )}
      {...props}
    />
  );
}

function FloatingLabelRoot({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>): React.ReactNode {
  return (
    <div className={cn('relative', className)} {...props}>
      {children}
    </div>
  );
}

const FloatingLabel = Object.assign(FloatingLabelRoot, {
  Input: FloatingInput,
  Textarea: FloatingTextarea,
  Label: FloatingLabelText,
});

export { FloatingLabel };
