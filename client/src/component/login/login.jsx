import GoogleLogin from "react-google-login";
import styles from "./login.module.css";

const Login = () => {
  const clientId =
    "883481629680-maq49j99rprpqk2p1ujsd6mli0tp7lpg.apps.googleusercontent.com";
  const onSuccess = async (response) => {
    console.log("###########Response#########");
    console.log(response);

    const {
      googleId,
      profileObj: { email, name },
    } = response;

    /*
        await onSocial({
            socialId : googleId,
            socialType : 'google',
            email,
            nickname : name
        });
        */
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        responseType={"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default Login;
