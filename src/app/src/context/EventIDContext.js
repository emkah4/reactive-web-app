import { createContext, useState } from "react";

const EventIDContext = createContext();

export const EventIDProvider = ({ children }) => {
  const [eventID, setEventID] = useState([]);

  return (
    <EventIDContext.Provider value={{ eventID, setEventID }}>
      {children}
    </EventIDContext.Provider>
  );
};

export default EventIDContext;
