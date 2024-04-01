"use client";

import { FC } from "react";

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
// import { handleApiError } from "@components/toasts/ErrorToast";
// import { handleSuccess } from "@components/toasts/SuccessToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
// import { createAccount } from "app/server/accounts/createAccount";
import { validateEVMAddress } from "@/lib/address";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string(),
  address: z.string().refine(validateEVMAddress(), {
    message: "Unable to detect chain.",
  }),
});

const AddAccountForm: FC = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: "",
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      console.debug({ values });

      /** NOTE
       * * This is where the API call to create an account goes.
       * * 1. Create an account.
       * * 2. Add an entry to `accountsToChains` for each chain.
       */

      router.refresh();
    } catch (error: unknown) {
      console.error({ error });
      // * handleApiError(error);
    }
  };

  return (
    <div className="mx-auto max-w-md py-24">
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
                    {...field}
                  />
                </FormControl>
                {!!form.getFieldState("address").error ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    Enter an EVM address that you want to track.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <Button
            className="w-full"
            type="submit"
            disabled={
              !form.formState.isValid ||
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
