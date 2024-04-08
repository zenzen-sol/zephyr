"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IconLoading } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import {
  toValidAddressChecksum,
  validateEVMAddress,
  validateEVMChecksum,
} from "@/lib/address";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { saveOrUpdateAccount } from "./actions/saveOrUpdateAccount";

const FormSchema = z.object({
  address: z
    .string({ required_error: "Address is required" })
    .max(42, { message: "Address is too long." })
    .superRefine(
      AwesomeDebouncePromise(async (val, ctx) => {
        const _isValidAddress = await validateEVMAddress(val);
        if (!_isValidAddress) {
          ctx.addIssue({
            message: "Unknown address format.",
            code: z.ZodIssueCode.custom,
          });
        }
        const _isValidChecksum: boolean = await validateEVMChecksum(val);
        if (!_isValidChecksum) {
          ctx.addIssue({
            message: "Invalid checksum.",
            code: z.ZodIssueCode.custom,
          });
        }
      }, 500),
    ),
  name: z.string({ required_error: "Name is required" }).min(1).max(25),
});

const AddAccountForm: FC = () => {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      if (!userId) {
        throw new Error("User not found.");
      }

      const valuesWithUserId: {
        address: string;
        name: string;
        userId: string;
      } = {
        ...values,
        userId: userId,
      };

      saveOrUpdateAccount(valuesWithUserId);
      toast.success("Address has been created");
      form.reset();
      router.refresh();
    } catch (error: unknown) {
      console.error({ error });
      toast.error("Problem saving address. Please try again.");
    }
  };

  const fixChecksum = (address: string) => {
    try {
      const checksum = toValidAddressChecksum(address);
      if (checksum) {
        form.setValue("address", checksum, { shouldValidate: true });
        form.trigger("address");
      }
    } catch (e: unknown) {
      console.error({ error: e });
    }
  };

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md space-y-4 text-sm md:w-1/2 md:max-w-none",
        !isLoaded && "pointer-events-none opacity-30",
      )}
    >
      <Card>
        <CardHeader>
          <CardTitle>Add a new address</CardTitle>
          <CardDescription>
            This simple form illustrates how user input can be saved to the Neon
            database via Drizzle ORM and react-hook-form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="address"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Add an address</FormLabel>
                    <FormControl>
                      <div className="flex w-full flex-row space-x-4">
                        <Input
                          placeholder="0x1234..."
                          autoComplete="off"
                          autoCorrect="off"
                          autoFocus
                          aria-disabled={!isLoaded}
                          disabled={!isLoaded}
                          {...field}
                        />
                        {form.formState.errors.address?.message ===
                          "Invalid checksum" && (
                          <Button
                            type="button"
                            onClick={() =>
                              fixChecksum(form.getValues("address"))
                            }
                          >
                            Fix checksum
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    {!!fieldState.error ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        {fieldState.isDirty && !fieldState.invalid ? (
                          <span className="text-success-500">
                            Valid EVM address
                          </span>
                        ) : (
                          <span>Enter an EVM address</span>
                        )}
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Name this address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="EVM Hot Wallet"
                        autoComplete="off"
                        autoCorrect="off"
                        aria-disabled={!isLoaded}
                        disabled={!isLoaded}
                        {...field}
                      />
                    </FormControl>
                    {!!fieldState.error ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        {fieldState.isDirty && !fieldState.invalid ? (
                          <span className="text-success-500">Valid name</span>
                        ) : (
                          <span>Please name this address</span>
                        )}
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <Button
                className="w-full"
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                <span className="flex w-full items-center justify-between space-x-2">
                  <span>Save</span>
                  <span>
                    {form.formState.isSubmitting ? (
                      <IconLoading
                        className="h-5 w-5 animate-spin-slow stroke-current"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <PlusIcon />
                    )}
                  </span>
                </span>
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="text-muted-foreground flex flex-row space-x-4 text-xs">
            <div>
              <Badge variant="secondary">Hint</Badge>
            </div>
            <div>
              Try running{" "}
              <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold">
                yarn drizzle:studio
              </code>
              and check the <span className="font-semibold">Accounts</span>{" "}
              table.
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddAccountForm;
