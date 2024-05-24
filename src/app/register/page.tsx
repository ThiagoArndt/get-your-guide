import FormContent from "@containers/register-page/form-content";
import ImageContent from "@containers/register-page/image-content";

function RegisterPage() {
  return (
    <div className="flex flex-row px-24">
      <ImageContent />
      <FormContent />
    </div>
  );
}

export default RegisterPage;
