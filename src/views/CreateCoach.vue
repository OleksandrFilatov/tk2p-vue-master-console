<template>
  <div class="mt-14 ma-5">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="coachData.firstName"
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="coachData.lastName"
              label="Last name"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="coachData.email"
              :rules="emailRules"
              type="email"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="password"
              v-model="coachData.password"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              label="Plan Level"
              v-model="coachData.planLevel"
              :items="planLevels"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Max Programs"
              v-model="coachData.planMaxPrograms"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Max Content Items"
              v-model="coachData.planMaxPrograms"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Max Subscribers"
              v-model="coachData.planSubscribers"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="coachData.startDate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="coachData.startDate"
                  label="Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="coachData.startDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(coachData.startDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="tel"
              v-model="coachData.mobile"
              label="Mobile"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn @click="createCoach()"> Add Coach </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <notice :isOpen="onAddCoach()" text="New Coach Added" />
  </div>
</template>

<script>
import gql from "graphql-tag";
import notice from "../components/Notice.vue";
export default {
  components: {
    notice,
  },
  methods: {
    onAddCoach() {
      return this.isAdded;
    },
    async createCoach() {
      const addCoach = await this.$apollo.mutate({
        mutation: gql`
          mutation createCoach($data: CoachInput!) {
            createCoach(data: $data) {
              id
            }
          }
        `,
        variables: {
          data: {
            ...this.coachData,
            status: "active",
          },
        },
      });

      if (addCoach) {
        this.isAdded = true;
        this.$router.push("/");
      }
    },
  },

  data: () => ({
    isAdded: false,
    menu: false,
    planLevels: ["Bronze", "Silver", "Gold"],
    planBronze: [3, 52, 500],
    planSilver: [10, 150, 10000],
    planGold: [100, 500, 50000],
    coachData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
      startDate: "",
      planLevel: "Bronze",
      planMaxPrograms: 3,
      planMaxContentItems: 52,
      planSubscribers: 500,
    },
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
};
</script>
