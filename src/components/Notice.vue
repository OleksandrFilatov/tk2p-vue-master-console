<template>
  <div class="text-center ma-2">

    <v-snackbar
      v-model="isOpen"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="isOpen = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    props: ['text', 'isOpen'],
    data: () => ({
      isOpen: false,
    }),
  }
</script>