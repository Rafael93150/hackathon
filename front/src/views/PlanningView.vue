<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { reactive } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import axiosInstance from "@/utils/axiosInstance";

const state = reactive({
  calendarOptions: {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
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
  selectedEvent: null,
  isUpdating: false,
  newEvent: {
    title: "",
    start: "",
    end: "",
  },
});

const init = async () => {
  await fetchEvents();
};

const connectedUser = JSON.parse(localStorage.getItem("user"));
console.log("connectedUser =============", connectedUser);

const fetchEvents = async () => {
  try {
    state.calendarOptions.events = await axiosInstance
      .get("calendar/events")
      .then((response) => {
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
}

const handleDateSelect = (selectInfo) => {
  state.openModal = true;
  state.isUpdating = false;
  state.newEvent.start = new Date(selectInfo.startStr).toISOString().slice(0, 16),
  state.newEvent.end =  new Date(selectInfo.endStr).toISOString().slice(0, 16)
};

const createEvent = () => {
  if(connectedUser.role === 'rh' || connectedUser.role === 'admin'){
  axiosInstance
    .post("calendar/events", {
      summary: state.newEvent.title,
      start: {
        dateTime: new Date(state.newEvent.start).toISOString(),
        timeZone: "Europe/Paris",
      },
      end: {
        dateTime: new Date(state.newEvent.end).toISOString(),
        timeZone: "Europe/Paris",
      },
    })
    .then((response) => {
      state.calendarOptions.events = [
        ...state.calendarOptions.events,
        {
          id: response.data.event.id,
          title: response.data.event.summary,
          start: response.data.event.start.dateTime,
          end: response.data.event.end.dateTime,
        },
      ];
      state.openModal = false;
      state.newEvent = {
        title: "",
        start: "",
        end: "",
      };
    })
    .catch((error) => {
      // Gérer les erreurs de création d'événement ici (si besoin)
      console.error("Error creating event:", error);
      // Fermer la modal en cas d'erreur
      state.openModal = false;
    });
  }
};

const handleEventClick = (clickInfo) => {
  state.openModal = true;
  state.isUpdating = true;
  state.selectedEvent = clickInfo.event;
  state.newEvent = {
    title: clickInfo.event.title,
    start: new Date(clickInfo.event.start).toISOString().slice(0, 16),
    end: new Date(clickInfo.event.end).toISOString().slice(0, 16),
  };
};

const deleteEvent = () => {
  if(connectedUser.role === 'rh' || connectedUser.role === 'admin'){
  if (
    confirm(
      `Are you sure you want to delete the event '${state.selectedEvent.title}'`
    )
  ) {
    axiosInstance
      .delete(`calendar/events/${state.selectedEvent?.id}`)
      .then(() => {
        const updatedEvents = state.calendarOptions.events.filter(
          (event) => event.id !== state.selectedEvent?.id
        );
        state.calendarOptions.events = updatedEvents;
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
    state.openModal = false;
    state.selectedEvent = null;
    state.newEvent = {
      title: "",
      start: "",
      end: "",
    };
  }
  }
};

const updateEvent = () => {
  if(connectedUser.role === 'rh' || connectedUser.role === 'admin'){
  axiosInstance
    .put("calendar/events/" + state.selectedEvent.id, {
      summary: state.newEvent.title,
      start: {
        dateTime: new Date(state.newEvent.start).toISOString(),
        timeZone: "Europe/Paris",
      },
      end: {
        dateTime: new Date(state.newEvent.end).toISOString(),
        timeZone: "Europe/Paris",
      },
    })
    .then((response) => {
      state.calendarOptions.events = [
        ...state.calendarOptions.events,
        {
          id: response.data.event.id,
          title: response.data.event.summary,
          start: response.data.event.start.dateTime,
          end: response.data.event.end.dateTime,
        },
      ];
      state.openModal = false;
      state.newEvent = {
        title: "",
        start: "",
        end: "",
      };
    });
  }
};

const closeModal = () => {
  state.openModal = false;
  state.newEvent = {
    title: "",
    start: "",
    end: "",
  };
};

init();
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="demo-app-main">
        <FullCalendar
          class="demo-app-calendar"
          :options="{
            ...state.calendarOptions,
            events: state.calendarOptions.events || [],
            eventClick: handleEventClick,
            select: handleDateSelect,
          }"
        />
      </div>

      <div
        v-if="connectedUser.role === 'rh' || connectedUser.role === 'admin' && state.openModal"
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <div class="fixed inset-0 bg-black opacity-60"></div>
        <div class="bg-white p-4 w-full max-w-xl rounded shadow-lg z-[60]">
          <h2 class="text-lg font-semibold mb-4">
            {{
              state.isUpdating
                ? "Modifier l'événement"
                : "Créer un nouvel événement"
            }}
          </h2>
          <div>
            <label class="block mb-2">Titre :</label>
            <input
              v-model="state.newEvent.title"
              type="text"
              required
              class="w-full px-2 py-1 border rounded mb-4"
            />
          </div>
          <div>
            <label class="block mb-2">Date de début :</label>
            <input
              v-model="state.newEvent.start"
              type="datetime-local"
              class="w-full px-2 py-1 border rounded mb-4"
            />
          </div>
          <div>
            <label class="block mb-2">Date de fin :</label>
            <input
              v-model="state.newEvent.end"
              type="datetime-local"
              class="w-full px-2 py-1 border rounded mb-4"
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button @click="closeModal">Annuler</button>
            <button
              v-if="!state.isUpdating"
              class="bg-[#5B98D2] text-white px-4 py-2 rounded"
              @click="createEvent"
            >
              Créer
            </button>
            <button
              v-if="state.isUpdating"
              class="bg-[#E53F49] text-white px-4 py-2 rounded"
              @click="updateEvent"
            >
              Modifier
            </button>
            <button
              v-if="state.isUpdating"
              class="text-white px-4 py-2 rounded bg-red-600"
              @click="deleteEvent"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
