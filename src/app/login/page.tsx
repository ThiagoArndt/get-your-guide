import FormContent from "@containers/auth-container/login-form-content";
import ImageContent from "@containers/auth-container/image-content";

function LoginPage() {
  return (
    <div className="flex flex-row px-24">
      <FormContent />
      <ImageContent />
    </div>
  );
}

export default LoginPage;
