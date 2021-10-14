import { Results } from "types/models/user";

interface FieldProps {
  data: string | number | undefined;
  label: string;
}
function Field({ data = "", label = "" }: FieldProps) {
  return (
    <div className="col-12 col-lg-6 col-xl-4">
      <div className="d-flex justify-content-center">
        <h5>{label}:&nbsp;</h5> {data}
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
        <Field data={data?.dob.date} label="Birth Date" />
        <Field data={data?.phone} label="Phone" />
        <Field data={data?.nat} label="Nationality" />
        <Field data={data?.location.city} label="Adress" />
      </div>
    </>
  );
}
