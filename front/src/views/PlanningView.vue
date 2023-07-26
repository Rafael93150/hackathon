<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import {reactive} from "vue";
import SectionMain from "@/components/SectionMain.vue";
import axiosInstance from "@/utils/axiosInstance";

const state = reactive({
  calendarOptions: {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    events: [],
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
  },
  currentEvents: [],
  openModal: false,
  selectedDate: null,
  newEvent: {
    title: "",
    start: "",
    end: "",
  }
});

const init = async () => {
  await fetchEvents();
};

const fetchEvents = async () => {
  try {
    state.calendarOptions.events = await axiosInstance.get("calendar/events").then((response) => {
      return response.data.map((event) => {
        return {
          id: event.id,
          title: event.summary,
          start: event.start.dateTime,
          end: event.end.dateTime,
        };
      });
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};
const handleWeekendsToggle = () => {
  state.calendarOptions.weekends = !state.calendarOptions.weekends;
};

const handleDateSelect = (selectInfo) => {
  state.openModal = true;
  state.newEvent.start = selectInfo.startStr;
  state.newEvent.end = selectInfo.endStr;
};

const createEvent = () => {
  axios.post("http://localhost:3000/calendar/events", {
    summary: state.newEvent.title,
    start: {
      dateTime: new Date(state.newEvent.start).toISOString(),
      timeZone: "Europe/Paris"
    },
    end: {
      dateTime: new Date(state.newEvent.end).toISOString(),
      timeZone: "Europe/Paris"
    }
  }).then((response) => {
    state.calendarOptions.events = [
      ...state.calendarOptions.events,
      {
        id: response.data.event.id,
        title: response.data.event.summary,
        start: response.data.event.start.dateTime,
        end: response.data.event.end.dateTime
      }
    ];
    state.openModal = false;
    state.newEvent = {
      title: "",
      start: "",
      end: ""
    };
  }).catch((error) => {
    // Gérer les erreurs de création d'événement ici (si besoin)
    console.error("Error creating event:", error);
    // Fermer la modal en cas d'erreur
    state.openModal = false;
  });
};

const handleEventClick = (clickInfo) => {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    // Envoyez une requête DELETE à votre API pour supprimer l'événement du backend
    axios.delete(`http://localhost:3000/calendar/events/${clickInfo.event.id}`).then(() => {
      // Si la suppression est réussie, mettez à jour les événements dans le calendrier
      const updatedEvents = state.calendarOptions.events.filter((event) => event.id !== clickInfo.event.id);
      state.calendarOptions.events = updatedEvents;
    }).catch((error) => {
      // Gérer les erreurs de suppression ici (si besoin)
      console.error("Error deleting event:", error);
    });
  }
};

const formatDate = (date) => {
  return date ? new Date(date).toLocaleString() : "";
};

init();

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="demo-app-sidebar">
        <div class="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              :checked="state.calendarOptions.weekends"
              @change="handleWeekendsToggle"
            />
            toggle weekends
          </label>
        </div>
      </div>
      <div class="demo-app-main">
        <FullCalendar
          class="demo-app-calendar"
          :options="{
            ...state.calendarOptions,
            events: state.calendarOptions.events || [],
            eventClick: handleEventClick,
            select: handleDateSelect
          }"
        />
      </div>

      <div v-if="state.openModal" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="fixed inset-0 bg-black opacity-60"></div>
        <div class="bg-white p-4 rounded shadow-lg z-[60]">
          <h2 class="text-lg font-semibold mb-4">Créer un nouvel événement</h2>
          <div>
            <label class="block mb-2">Titre :</label>
            <input type="text" v-model="state.newEvent.title" class="w-full px-2 py-1 border rounded mb-4" />
          </div>
          <div>
            <label class="block mb-2">Date de début :</label>
            <input type="text" :value="formatDate(state.newEvent.start)"
                   class="w-full px-2 py-1 border rounded mb-4" disabled />
          </div>
          <div>
            <label class="block mb-2">Date de fin :</label>
            <input type="text" :value="formatDate(state.newEvent.end)"
                   class="w-full px-2 py-1 border rounded mb-4"
                   disabled />
          </div>
          <div class="flex justify-end">
            <button @click="state.openModal = false" class="mr-2">Annuler</button>
            <button @click="createEvent" class="bg-blue-500 text-white px-4 py-2 rounded">Créer</button>
          </div>
        </div>
      </div>

    </SectionMain>
  </LayoutAuthenticated>
</template>
