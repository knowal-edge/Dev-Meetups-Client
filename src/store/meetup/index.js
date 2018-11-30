import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/dev-meetups-8db90.appspot.com/o/devheroes-1_00.png?alt=media&token=460f71a7-9eed-4283-92dd-47782569c582',
        id: 'afajfjadfaadfa323',
        title: 'Welcome to Dev MeetUp',
        date: new Date(),
        location: null,
        description: null
      },
      {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/dev-meetups-8db90.appspot.com/o/registration.jpg?alt=media&token=1d7bd7d9-b452-4be7-a2af-260d738587fa',
        id: 'sdfgdssdvdsvs',
        title: 'Sign Up to GetStarted',
        date: new Date(),
        location: null,
        description: null
      }
    ]
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
  },  
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}