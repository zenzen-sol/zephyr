"use client";

import { Button } from "@/components/ui/button";
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
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { FC, useState } from "react";
// import { handleApiError } from "@components/toasts/ErrorToast";
// import { handleSuccess } from "@components/toasts/SuccessToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
// import { createAccount } from "app/server/accounts/createAccount";
import {
  toValidAddressChecksum,
  validateAddressChecksum,
  validateEVMAddress,
  validateEVMChecksum,
} from "@/lib/address";
import { cn } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  address: z.string().superRefine(
    AwesomeDebouncePromise(async (val, ctx) => {
      const _isValidAddress = await validateEVMAddress(val);
      console.debug({ _isValidAddress });
      if (!_isValidAddress) {
        ctx.addIssue({
          message: "Unable to detect chain.",
          code: z.ZodIssueCode.custom,
        });
      }
      const _isValidChecksum: boolean = await validateEVMChecksum(val);
      console.debug({ _isValidChecksum });
      if (!_isValidChecksum) {
        ctx.addIssue({
          message: "Invalid checksum.",
          code: z.ZodIssueCode.custom,
        });
      }
    }, 500),
  ),
});

const AddAccountForm: FC = () => {
  const router = useRouter();
  const { ready } = usePrivy();

  const [validChecksum, setValidChecksum] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      console.debug({ values });

      /**
       * * NOTE: This is where the API call to create an account goes.
       * * 1. Create an account.
       * * 2. Add an entry to `accountsToChains` for each chain.
       */

      router.refresh();
    } catch (error: unknown) {
      console.error({ error });
      // * handleApiError(error);
    }
  };

  const fixChecksum = (address: string) => {
    try {
      const checksum = toValidAddressChecksum(address);
      if (checksum) {
        form.setValue("address", checksum, { shouldValidate: true });
        const _validChecksum = validateAddressChecksum(address);
        setValidChecksum(_validChecksum);
      }
    } catch (e: unknown) {
      console.error({ error: e });
    }
  };

  return (
    <div
      className={cn(
        "mx-auto max-w-md py-24",
        !ready && "pointer-events-none opacity-30",
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add an address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0x1234..."
                    autoComplete="off"
                    autoCorrect="off"
                    autoFocus
                    aria-disabled={!ready}
                    disabled={!ready}
                    {...field}
                  />
                </FormControl>
                {!!form.getFieldState("address").error ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    {!form.formState.errors ? (
                      <span className="text-success-500">
                        Valid EVM address
                      </span>
                    ) : (
                      <span>Enter an EVM address.</span>
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
              !!form.formState.errors ||
              form.formState.isSubmitting ||
              form.formState.isValidating
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
                  <PlusIcon className="h-5 w-5 stroke-current" />
                )}
              </span>
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddAccountForm;
