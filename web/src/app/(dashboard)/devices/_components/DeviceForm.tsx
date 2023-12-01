import { DeviceDeviceCategoryEnum } from "@/apis/openapi";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  description: z.string().optional(),
  description_location: z.string().min(1, {
    message: "Location must be at least 1 character.",
  }),
  device_category: z.nativeEnum(DeviceDeviceCategoryEnum),
  current_value: z.number().nullable(),
  path: z.string(),
  wattage: z.coerce.number(),
});

export const DeviceForm: React.FC<{
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: z.infer<typeof formSchema>;
  submitText: string;
  disabled?: boolean;
}> = ({ onSubmit, defaultValues, submitText, disabled }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      description: "",
      description_location: "",
      device_category: DeviceDeviceCategoryEnum.Light,
      name: "",
      current_value: null,
      wattage: 0,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex gap-4 flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Light 1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={disabled}
        />
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Control Path</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the path to the device" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="P1">Pin P1</SelectItem>
                    <SelectItem value="P2">Pin P2</SelectItem>
                    <SelectItem value="P3">Pin P3</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={disabled}
        />
        <FormField
          control={form.control}
          name="wattage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wattage</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={disabled}
        />
        <FormField
          control={form.control}
          name="device_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the category of the device" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(DeviceDeviceCategoryEnum).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={disabled}
        />
        <FormField
          control={form.control}
          name="current_value"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="flex items-center gap-2">
                Has Value
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-secondary-foreground opacity-50 hover:opacity-100" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        The device has a controllable value, such as
                        <br />
                        temperature of an AC or brightness of a light.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Switch
                  checked={typeof field.value === "number"}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      field.onChange(defaultValues?.current_value ?? 0);
                    } else {
                      field.onChange(null);
                    }
                  }}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={disabled}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={disabled}
        />
        <FormField
          control={form.control}
          name="description_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Meeting Room 1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={disabled}
        />
        <Button type="submit" className="w-full mt-4" disabled={disabled}>
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
