<template>
  <v-container >
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card>
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="meetup.imageUrl"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="mb-0" style="color:#212121;">{{ meetup.title }}</h3>
                    <div style="color:#757575;">{{ meetup.date | date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="amber accent-4" :to="'/meetups/' + meetup.id">
                    <v-icon left light>arrow_forward</v-icon>
                    Read More
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups () {
        return this.$store.getters.loadedMeetups
      }
    }
  }
</script>