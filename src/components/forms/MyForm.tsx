import { Form, Formik } from "formik";
import FormikRadioGroup from "./FormikRadioGroup";
import FormikSelect from "./FormikSelect";
import FormikCheckbox from "./FormikCheckbox";
import FormikTextField from "./FormikTextField";
import FormikSwitch from "./FormikSwitch";
import FormikDatePicker from "./FormikDatePicker";

const MyForm: React.FC = () => {
  const initialValues = {
    textField: "",
    checkbox: false,
    select: "",
    radioGroup: "",
    switch: false,
    datePicker: null,
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <FormikTextField name="textField" label="Text Field" />
          <FormikCheckbox name="checkbox" label="Checkbox" />
          <FormikSelect
            name="select"
            label="Select"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <FormikRadioGroup
            name="radioGroup"
            label="Radio Group"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <FormikSwitch name="switch" label="Switch" />
          <FormikDatePicker name="datePicker" label="Date Picker" />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
