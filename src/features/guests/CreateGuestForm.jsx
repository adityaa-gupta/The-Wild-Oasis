/* eslint-disable */

import { useForm } from "react-hook-form";

// import { useCountries } from 'hooks/useCountries';
import { useCreateGuest } from "./useCreateGuest";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import Button from "../../ui/Button";

import { useUser } from "../authentication/useUser";

import { useEffect, useState } from "react";

// import { updateCurrentUser } from "../../services/apiAuth";
// import { updateUser } from "../../services/apiGuests";

// With NEW modal
// function CreateGuest({ onSuccessNewGuest, setIsOpenForm }) {
function CreateGuestForm({
  onSuccessNewGuest,
  oncloseModal,
  guestSession = false,
}) {
  // const { isLoading: isLoadingCountries, countries } = useCountries();
  const { isCreating, createGuest } = useCreateGuest();
  const { user } = useUser();
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;
  const [action, setAction] = useState(false);

  const onSubmit = function (data) {
    const { nationalId } = data;
    // adhar = nationalId;
    const userId = user.id;
    console.log(data, userId);
    createGuest(
      { ...data, userId },
      {
        // In the mutate function, we can ALSO use the onSuccess handler, just like in useMutation. Both will get called. This one also gets access to the returned value of the mutation (new guest in this case)
        // This is how we can get access to the newly created object. Here we set it into state, because we want to display it in the UI
        onSuccess: (data) => {
          reset();

          oncloseModal?.();
        },
      }
    );
  };

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="name"
          // defaultValue={
          //   user?.user_metadata?.fullName || getValues("name") || " "
          // }
          disabled={isCreating}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          // defaultValue={user?.email || getValues("email") || " "}
          disabled={isCreating}
          {...register("email", {
            required: "Email address is required",
            pattern: {
              // google: email regex JavaScript
              value: /\S+@\S+\.\S+/,
              message: "Please specify a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow label="Mobile No" error={errors?.mobileNo?.message}>
        <Input
          type="text"
          id="mobileNo"
          defaultValue={getValues("mobileNo") || " "}
          disabled={isCreating}
          {...register("mobileNo", {
            required: "Mobile Number required",
            pattern: {
              // google: email regex JavaScript
              value: /^[0-9]{10}$/,
              message: "Please specify a valid ID",
            },
          })}
        />
      </FormRow>
      <FormRow label="Adhar Id" error={errors?.nationalId?.message}>
        <Input
          type="number"
          id="nationalId"
          disabled={isCreating}
          defaultValue={getValues("nationalId")}
          {...register("nationalId", {
            required: "Adhar Id is required",
            pattern: {
              // google: email regex JavaScript
              value: /^\d{12}$/,
              message: "Please specify a valid ID",
            },
          })}
        />
      </FormRow>

      <FormRow>
        {action || (
          <>
            <Button
              variation="secondary"
              type="reset"
              disabled={isCreating}
              onClick={() => oncloseModal?.()}
            >
              Cancel
            </Button>
            <Button disabled={isCreating}>Add guest details</Button>
          </>
        )}
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
