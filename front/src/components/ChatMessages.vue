<template>
    <div class="chat-message">
      <span class="chat-message-sender">{{ message.fromUser }}</span>
      <div class="chat-message-content">{{ message.text }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style>
  .chat-message {
    background-color: lightgray;
    padding: 8px;
    margin-bottom: 8px;
  }
  </style>