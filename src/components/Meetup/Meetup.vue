<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="amber accent-4"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1 style="color:#212121;">{{ meetup.title }}</h1>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="250px"
          ></v-card-media>
          <v-card-text>
            <h3 class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</h3>
            <div>
              <app-edit-meetup-date-dialog
                :meetup="meetup" v-if="userIsCreator">
              </app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog
                :meetup="meetup" v-if="userIsCreator">
              </app-edit-meetup-time-dialog>
            </div>
            <div class="mt-2" style="color:#757575;text-align:justify">{{ meetup.description }}</div>
          </v-card-text>
         
          <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn flat color="amber accent-4" :to="'/meetups/'" class="mr-2 mb-2"> Back</v-btn>
            <app-meetup-register-dialog class="mb-2"
              :meetupId="meetup.id"
              v-if="userIsAuthenticated && !userIsCreator"></app-meetup-register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>