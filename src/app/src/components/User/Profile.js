import { useState, useEffect, useContext } from "react";

// Bootstrap
import { Card, Button } from "react-bootstrap";

// Styles
import styles from "./Profile.module.css";

// Axios
import axios from "../../api/axios";

// Constans
const GET_USER_URL = "/users/get_user";

const Profile = (props) => {
  const accessToken = localStorage.getItem("access_token");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(GET_USER_URL, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(response.data.user[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  if (!accessToken) {
    return (
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title>
            Sorry, you are not yet logged in. Please, consider it :))
          </Card.Title>
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
        <Card.Link className={styles.coffeeLink} href="#">
          <Button>
            <img
              className={styles.coffeeImage}
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="Buy me a coffee"
            />
            <span className="coffeeButtonText">Buy us a coffee</span>
          </Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Profile;