"use client";

import * as React from "react";
import { Controller, FieldPath, FieldValues, FormProvider, useFormContext, UseFormReturn } from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";

// import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, type InputProps } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import { Radio } from "@/components/ui/radio";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TextArea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
// import { CaretSortIcon } from "@radix-ui/react-icons";
// import { formatDateLocale } from "@/lib/formatters";

// const Form = FormProvider;

interface FormProps {
   form: UseFormReturn<any, any>;
}
const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement> & FormProps>(
   ({ className, form, ...props }, ref) => {
      return (
         <FormProvider {...form}>
            <form
               ref={ref}
               className={cn("gap-2 sm:gap-4", !className?.includes("flex") && "grid grid-cols-1", className)}
               {...props}
            />
         </FormProvider>
      );
   },
);
Form.displayName = "Form";

type FormFieldContextValue<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
   name: TName;
};

type FormFieldProps = React.HTMLAttributes<HTMLDivElement> &
   FormFieldContextValue & {
      orientation?: "horizontal" | "vertical";
      asChild?: boolean;
   };
const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
   ({ className, name, orientation = "vertical", asChild, ...props }, ref) => {
      const Comp = asChild ? Slot : "div";

      return (
         <FormFieldContext.Provider value={{ name }}>
            <Comp
               ref={ref}
               aria-orientation={orientation}
               className={cn("flex", orientation == "vertical" ? "flex-col gap-0.5" : "items-center gap-2", className)}
               {...props}
            />
         </FormFieldContext.Provider>
      );
   },
);
FormField.displayName = "FormField";

const useFormField = () => {
   const fieldContext = React.useContext(FormFieldContext);
   const { getFieldState, formState } = useFormContext();

   const fieldState = getFieldState(fieldContext.name, formState);

   if (!fieldContext) {
      throw new Error("useFormField should be used within <FormField>");
   }

   return {
      name: fieldContext.name,
      ...fieldState,
   };
};

const FormLabel = React.forwardRef<React.ElementRef<typeof Label>, React.ComponentPropsWithoutRef<typeof Label>>(
   ({ ...props }, ref) => {
      const { error, name } = useFormField();

      return <Label ref={ref} id={`${name}-form-item-label`} {...props} />;
   },
);
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
   ({ ...props }, ref) => {
      const { error } = useFormField();

      return <Slot ref={ref} aria-invalid={!!error} {...props} />;
   },
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
   ({ className, ...props }, ref) => {
      const { name } = useFormField();

      return (
         <p
            ref={ref}
            id={`${name}-form-item-description`}
            className={cn("text-xs text-zinc-500 dark:text-zinc-400", className)}
            {...props}
         />
      );
   },
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
   ({ className, children, ...props }, ref) => {
      const { error, name } = useFormField();
      const body = error ? String(error?.message) : children;
      if (!body) {
         return null;
      }
      return (
         <p
            ref={ref}
            id={`${name}-form-item-message`}
            className={cn("text-xs font-medium text-red-500 dark:text-red-600", className)}
            {...props}>
            {body}
         </p>
      );
   },
);
FormMessage.displayName = "FormMessage";

const FormCheckbox = ({ name, ...props }: React.ComponentPropsWithoutRef<typeof Checkbox>) => {
   const { register } = useFormContext();
   const { error, name: fieldName } = useFormField();
   const registered = register(name ?? fieldName);

   return (
      <Checkbox
         aria-invalid={!!error}
         {...props}
         {...registered}
         onChange={(ev) => {
            registered.onChange(ev);
            props.onChange?.(ev);
         }}
         onClick={(ev) => {
            registered?.onChange?.(ev);
            props?.onClick?.(ev);
         }}
      />
   );
};
const FormRadio = ({ name, ...props }: React.ComponentPropsWithoutRef<typeof Radio>) => {
   const { register } = useFormContext();
   const { error, name: fieldName } = useFormField();
   const registered = register(name ?? fieldName);

   return (
      <Radio
         aria-invalid={!!error}
         {...props}
         {...registered}
         onChange={(ev) => {
            registered.onChange(ev);
            props.onChange?.(ev);
         }}
         onClick={(ev) => {
            // props?.onClick?.(ev);
         }}
      />
   );
};

const FormInput = ({ className, name, ...props }: InputProps) => {
   const { register } = useFormContext();
   const { error, name: fieldName } = useFormField();
   const registered = register(name ?? fieldName);
   return (
      <Input
         aria-invalid={!!error}
         aria-describedby={`${name ?? fieldName}-input`}
         {...props}
         {...registered}
         className={cn(className, error && "border-red-500 dark:border-red-600")}
         onChange={(ev) => {
            registered.onChange(ev);
            props.onChange?.(ev);
         }}
      />
   );
};

const FormPassword = ({ className, name, ...props }: InputProps) => {
   const { register } = useFormContext();
   const { error, name: fieldName } = useFormField();
   const registered = register(name ?? fieldName);

   return (
      <InputPassword
         aria-invalid={!!error}
         aria-describedby={`${name ?? fieldName}-input`}
         {...props}
         {...registered}
         className={cn(className, error && "border-red-500 dark:border-red-600")}
         onChange={(ev) => {
            registered.onChange(ev);
            props.onChange?.(ev);
         }}
      />
   );
};

interface FormInputMaskProps extends React.ComponentPropsWithoutRef<typeof Input> {
   mask: (value: string) => string | undefined;
}
const FormInputMask = ({ className, name, mask, ...props }: FormInputMaskProps) => {
   const { control } = useFormContext();
   const { name: fieldName } = useFormField();

   return (
      <Controller
         control={control}
         name={name ?? fieldName}
         render={({ field }) => (
            <Input
               {...props}
               ref={field.ref}
               defaultValue={mask(field.value)}
               name={field.name}
               onChange={(ev) => {
                  ev.currentTarget.value = mask?.(ev.currentTarget.value) ?? "";
                  field.onChange(ev);
               }}
               onBlur={(ev) => {
                  ev.currentTarget.value = mask?.(ev.currentTarget.value) ?? "";
                  field.onBlur();
                  props.onBlur?.(ev);
               }}
               value={mask(field.value)}
            />
         )}
      />
   );
};

interface FormSelectProps {
   children?: React.ReactNode;
   className?: string;
   placeholder?: string;
   name?: string;
   defaultValue?: string;
   onValueChange?: (d: any) => void;
}
const FormSelect = ({ children, className, name, defaultValue, ...props }: FormSelectProps) => {
   const { control } = useFormContext();
   const { error, name: fieldName } = useFormField();

   return (
      <Controller
         control={control}
         name={name ?? fieldName}
         render={({ field }) => (
            <Select
               aria-invalid={!!error}
               aria-describedby={`${name ?? fieldName}-select`}
               onValueChange={(v) => {
                  field.onChange?.(v);
                  props?.onValueChange?.(v);
               }}
               defaultValue={field.value?.toString() ?? defaultValue?.toString()}
               value={field.value?.toString()}>
               <SelectTrigger className={cn("truncate", className, error && "border-red-500 dark:border-red-600")}>
                  <SelectValue placeholder={props?.placeholder ?? "Select an option"} />
               </SelectTrigger>
               <SelectContent>{children}</SelectContent>
            </Select>
         )}
      />
   );
};

const FormOption = React.forwardRef<
   React.ElementRef<typeof SelectItem>,
   React.ComponentPropsWithoutRef<typeof SelectItem>
>(({ ...props }, ref) => {
   return <SelectItem ref={ref} {...props} value={props?.value?.toString()} />;
});
FormOption.displayName = "FormOption";

const FormTextarea = ({ className, name, ...props }: React.ComponentPropsWithoutRef<typeof TextArea>) => {
   const { register } = useFormContext();
   const { error, name: fieldName } = useFormField();

   return (
      <TextArea
         aria-invalid={!!error}
         aria-describedby={`${name ?? fieldName}-textarea`}
         intent="primary"
         {...props}
         {...register(name ?? fieldName)}
         className={cn(className, error && "border-red-500 dark:border-red-600")}
      />
   );
};
FormTextarea.displayName = "FormTextarea";

interface FormComboBoxProps {
   children?: React.ReactNode;
   className?: string;
   placeholder?: string;
   name?: string;
   defaultValue?: string;

   data: any[];
   dataIndex?: string;
   displayedData?: string | ((d: any) => string);
}

const ComboBoxContext = React.createContext(
   {} as {
      value: string | number | undefined;
      setValue: (value: string | number | undefined) => void;
      setOpen: (open: boolean) => void;
   },
);
// const FormComboBox = ({
//    children,
//    className,
//    name,
//    defaultValue,
//    data,
//    dataIndex = "id",
//    displayedData,
//    ...props
// }: FormComboBoxProps) => {
//    const { control } = useFormContext();
//    const { error, name: fieldName } = useFormField();
//    const [value, setValue] = React.useState<string | number | undefined>(defaultValue);
//    const [open, setOpen] = React.useState(false);

//    return (
//       <ComboBoxContext.Provider value={{ value, setValue, setOpen }}>
//          <Controller
//             control={control}
//             name={name ?? fieldName}
//             defaultValue={defaultValue}
//             render={({ field }) => (
//                <Popover open={open} onOpenChange={setOpen}>
//                   <PopoverTrigger asChild>
//                      <Button
//                         role="combobox"
//                         intent="opaque"
//                         className="relative justify-start px-3 pr-7 text-left font-normal shadow-none">
//                         {!!field.value ? (
//                            <div className="truncate">
//                               {typeof displayedData == "string"
//                                  ? data?.find((x) => x.id == field.value)?.[displayedData]
//                                  : displayedData?.(data?.find((x) => x?.[dataIndex] == field.value))}
//                            </div>
//                         ) : props?.placeholder ? (
//                            t(props?.placeholder!)
//                         ) : (
//                            t("select")
//                         )}
//                         <CaretSortIcon
//                            className="absolute right-2 aspect-square h-4 w-4 shrink-0 text-zinc-700"
//                            height={16}
//                            width={16}
//                         />
//                      </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-[--radix-popper-anchor-width] border border-zinc-300 p-0">
//                      <Command
//                         aria-invalid={!!error}
//                         aria-describedby={`${name}-form-item-description ${name}-form-item-message`}
//                         defaultValue={field.value ?? defaultValue}>
//                         <CommandInput />
//                         <CommandEmpty>{t("empty")}</CommandEmpty>
//                         <CommandGroup>{children}</CommandGroup>
//                      </Command>
//                   </PopoverContent>
//                </Popover>
//             )}
//          />
//       </ComboBoxContext.Provider>
//    );
// };

// const FormComboBoxItem = React.forwardRef<
//    React.ElementRef<typeof CommandItem>,
//    React.ComponentPropsWithoutRef<typeof CommandItem>
// >(({ ...props }, ref) => {
//    const { setValue } = useFormContext();
//    const { name } = useFormField();
//    const { setOpen } = React.useContext(ComboBoxContext);
//    return (
//       <CommandItem
//          ref={ref}
//          onSelect={() => {
//             setValue(name!, props?.value);
//             setOpen(false);
//          }}
//          {...props}
//       />
//    );
// });
// FormComboBoxItem.displayName = "FormComboBoxItem";

// const FormDatePicker = ({ name, ...props }: { name?: string } & React.ComponentProps<typeof Calendar>) => {
//    const { control } = useFormContext();
//    const { error, name: fieldName } = useFormField();
//    return (
//       <Controller
//          control={control}
//          name={name ?? fieldName!}
//          render={({ field }) => (
//             <Popover>
//                <PopoverTrigger asChild>
//                   <Button
//                      intent="opaque"
//                      className={cn(
//                         "justify-start text-left font-normal",
//                         !field.value && "text-zinc-500 focus:text-zinc-700",
//                      )}>
//                      <CalendarIcon className="mr-2 h-4 w-4" />
//                      <span className="truncate">
//                         {field.value
//                            ? formatDateLocale(field.value as Date, { dateStyle: "long" })
//                            : "Selecione uma data"}
//                      </span>
//                   </Button>
//                </PopoverTrigger>
//                <PopoverContent className="w-auto p-0">
//                   <Calendar mode="single" {...props} selected={field.value} onSelect={field.onChange} />
//                </PopoverContent>
//             </Popover>
//          )}
//       />
//    );
// };

export {
   Form,
   FormCheckbox,
   FormControl,
   FormDescription,
   FormField,
   FormInput,
   FormInputMask,
   FormLabel,
   FormMessage,
   FormOption,
   FormPassword,
   FormRadio,
   FormSelect,
   FormTextarea,
   useFormField,
};
