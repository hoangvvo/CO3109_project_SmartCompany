import { UpdateAutomationRequestLogicalOperatorEnum } from "@/apis/openapi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  description: z.string(),
  logical_operator: z.nativeEnum(UpdateAutomationRequestLogicalOperatorEnum),
});

export const AutomationForm: FC<{
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  disabled?: boolean;
  initialValues?: z.infer<typeof formSchema>;
  submitLabel?: string;
}> = ({ onSubmit, disabled, submitLabel = "Create", initialValues }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      logical_operator: UpdateAutomationRequestLogicalOperatorEnum.And,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex gap-2 flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Light automation" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Turn on the light at 8pm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logical_operator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logical Operator</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the logical operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value={UpdateAutomationRequestLogicalOperatorEnum.And}
                    >
                      AND
                    </SelectItem>
                    <SelectItem
                      value={UpdateAutomationRequestLogicalOperatorEnum.Or}
                    >
                      OR
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4" disabled={disabled}>
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};
