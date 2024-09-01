import {
  FormikDatePicker,
  FormikSelect,
  FormikTextField,
} from "@/components/forms";

import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { Form, Formik } from "formik";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({});

interface EventFiltersModalProps {
  fetch: (values: {
    toTime?: string;
    fromTime?: string;
    userName?: string;
    userNumber?: number;
    eventType?: "type1" | "type2" | "type3";
    branchName?: string;
    branchNumber?: number;
  }) => void;
  initValues: {
    toTime?: string;
    fromTime?: string;
    userName?: string;
    userNumber?: number;
    eventType?: "type1" | "type2" | "type3";
    branchName?: string;
    branchNumber?: number;
  };
}

export function EventFiltersModal(props: EventFiltersModalProps) {
  return (
    <Formik
      initialValues={props.initValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        console.log(values.toTime);
        props.fetch(values);
      }}
      resetForm
    >
      {({ isSubmitting, isValid }) => (
        <Form className="w-full flex flex-col gap-6 mt-2 ">
          <FormikTextField name="userName" label="نام کاربری" />
          <FormikTextField name="userNumber" label="شماره کاربری" />
          <FormikTextField name="branchName" label="نام شعبه" />
          <FormikTextField name="branchNumber" label="شماره شعبه" />
          <FormikSelect
            label={"نوع رویداد"}
            name="eventType"
            options={[
              { label: "نوع یک", value: "type1" },
              { label: "نوع دو", value: "type2" },
              { label: "نوع سه", value: "type3" },
            ]}
          />
          <FormikDatePicker label={"تاریخ شروع "} name="fromTime" />
          <FormikDatePicker label={"تاریخ پایان "} name="toTime" />

          <LoadingButton
            variant="outlined"
            color="primary"
            disabled={isSubmitting || !isValid}
            type="submit"
            loading={isSubmitting}
          >
            اعمال کردن فیلتر ها
          </LoadingButton>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              props.fetch({});
            }}
          >
            بازنشانی فیلترها
          </Button>
        </Form>
      )}
    </Formik>
  );
}
