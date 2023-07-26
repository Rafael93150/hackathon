import { google } from "googleapis";
import dotenv from "dotenv";

// Provide the required configuration
dotenv.config();
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;


// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);


// Insert new event to Google Calendar
export const insertEvent = async (req, res) => {
  try {
    let response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: req.body
    });
    if (response["status"] === 200 && response["statusText"] === "OK") {
      res.json(
        {
          message: "your event has been created successfully",
          event : response.data
        },
      );
    } else {
      res.json(
        "error where adding your event",
      );
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return 0;
  }
};


// Get all the events between two dates
export const getEvents = async (req, res) => {
  try {
    const response = await calendar.events.list({
      auth: auth,
      calendarId: calendarId,
      timeMin: req.params.dateTimeStart,
      timeMax: req.params.dateTimeEnd,
      timeZone: "Europe/Paris"
    });
    const items = response.data.items;
    res.json(
      items
    );
  } catch (error) {
    console.log(`Error at getEvents --> ${error}`);
    return [];
  }
};

// Delete an event from eventID

export const deleteEvent = async (req, res) => {
  try {
    const response = await calendar.events.delete({
      auth: auth,
      calendarId: calendarId,
      eventId: req.params.eventId
    });

        if (response.data === '') {
            res.json('Your event has been deleted successfully');
        } else {
            res.json('Your event has not been deleted');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error was occured when deleting the event' });
    }
};

// Update an event from eventID

export const updateEvent = async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const updatedEventData = req.body;
  
      // Obtenir les détails de l'événement existant
      const eventDetails = await calendar.events.get({
        auth: auth,
        calendarId: calendarId,
        eventId: eventId,
      });
  
      // Fusionner les détails de l'événement existant avec les données mises à jour
      const mergedEventData = {
        ...eventDetails.data,
        ...updatedEventData,
      };
  
      const response = await calendar.events.update({
        auth: auth,
        calendarId: calendarId,
        eventId: eventId,
        resource: mergedEventData,
      });
  
      if (response.data) {
        res.json(
            {
              message: "Your event has been updated successfully",
              event : response.data
            })
      } else {
        res.json("Unable to update the event");
      }
    } catch (error) {
      console.log(`Erreur lors de la mise à jour de l'événement --> ${error}`);
      res.status(500).json({ error: "Error was occured when updating the event" });
    }
  };
  

