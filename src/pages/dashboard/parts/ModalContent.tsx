import { Results } from "types/models/user";

interface FieldProps {
  data: string | number | undefined;
  label: string;
}
function Field({ data, label = "" }: FieldProps) {
  return (
    <div className="col-12 col-lg-6 col-xl-4">
      <div className="d-flex justify-content-center">
        <h5>{label}:&nbsp;</h5>
        <p>{data || "Not found"}</p>
      </div>
    </div>
  );
}
interface ModalProps {
  data: Results | undefined;
}
export function ModalContent({ data }: ModalProps) {
  return (
    <>
      <div className="row">
        <Field data={data?.id.value} label="ID" />
        <Field data={data?.email} label="Email" />
        <Field data={data?.gender} label="Gender" />
        <Field
          data={
            data?.dob.date
              ? new Date(data?.dob.date).toLocaleDateString("en-US")
              : ""
          }
          label="Birth"
        />
        <Field data={data?.phone} label="Phone" />
        <Field data={data?.nat} label="Nationality" />
        <Field data={data?.location.city} label="Adress" />
      </div>
    </>
  );
}
