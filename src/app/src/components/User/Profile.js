import { useState, useEffect, useContext } from "react";

// Bootstrap
import { Card, Button } from "react-bootstrap";

// Styles
import styles from "./Profile.module.css";

// Axios
import useAxiosPrivate from "../../shared/hooks/useAxiosPrivate";

// Context
import AuthContext from "../../context/UserContext";
// Constans
const GET_USER_URL = "/users/get_user";

const Profile = (props) => {
  const [user, setUser] = useState({});
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get(GET_USER_URL);
        setUser(response.data.user[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  if (auth.accessToken === null) {
    return (
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title>Sorry, you are not yet logged in.</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title>Reactive user</Card.Title>
        <Card.Subtitle className={`mb-2 text-muted ${styles.sub}`}>
          This web app is made with love by Reactive Team inc.
        </Card.Subtitle>
        <Card.Text className={styles.label}>User name:</Card.Text>
        <Card.Subtitle className={`mb-2 ${styles.span}`}>
          {`${user.f_name} ${user.l_name}`}
        </Card.Subtitle>
        <Card.Text className={styles.label}>User email:</Card.Text>
        <Card.Subtitle className={`mb-2 ${styles.span}`}>
          {user.email}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default Profile;
