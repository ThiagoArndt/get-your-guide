import FormContent from "@containers/login-page/form-content";
import ImageContent from "@containers/login-page/image-content";

function LoginPage() {
  return (
    <div className="flex flex-row px-24">
      <FormContent />
      <ImageContent />
    </div>
  );
}

export default LoginPage;
