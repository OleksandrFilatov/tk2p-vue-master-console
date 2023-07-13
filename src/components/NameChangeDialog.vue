<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          {{ firstName }} {{ lastName }} <br />
          {{ email }}
        </div>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Edit Coach </v-card-title>

        <v-form>
          <v-container>
            <v-row>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="email"
                  label="Email Address"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="password"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="planLevel"
                  label="Plan Level"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="planMaxPrograms"
                  label="Max Programs"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="planMaxContentItems"
                  label="Max Content Items"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="planSubscribers"
                  label="Max Subscribers"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="startDate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="startDate"
                      label="Start Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(startDate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="mobile"
                  label="Mobile"
                  required
                ></v-text-field>
              </v-col>
            </v-row> </v-container
        ></v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  props: ["coachData"],
  mounted() {
    this.firstName = this.coachData.firstName;
    this.lastName = this.coachData.lastName;
    this.email = this.coachData.email;
    this.password = this.coachData.password;
    this.planLevel = this.coachData.planLevel;
    this.planMaxPrograms = parseInt(this.coachData.planMaxPrograms);
    this.planMaxContentItems = parseInt(this.coachData.planMaxContentItems);
    this.planSubscribers = parseInt(this.coachData.planSubscribers);
    this.startDate = new Date(this.coachData.startDate);
    this.startDate = this.startDate.toLocaleDateString();
    this.mobile = this.coachData.mobile;
  },
  methods: {
    async save() {
      //Ensure Numeric
      this.planMaxPrograms = parseInt(this.planMaxPrograms);
      this.planMaxContentItems = parseInt(this.planMaxContentItems)
      this.planSubscribers = parseInt(this.planSubscribers )
      const done = await this.$apollo.mutate({
        mutation: gql`
          mutation updateCoach($id: Float!, $data: CoachInput!) {
            updateCoach(id: $id, data: $data) {
              id
            }
          }
        `,
        variables: {
          id: parseInt(this.coachData.id),
          data: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            planLevel: this.planLevel,
            planMaxPrograms: this.planMaxPrograms,
            planMaxContentItems: this.planMaxContentItems,
            planSubscribers: this.planSubscribers,
            startDate: this.startDate,
            mobile: this.mobile,
            status: this.coachData.status,
          },
        },
      });

      if (done) {
        this.dialog = false;
      }
    },
  },
  data() {
    return {
      menu: false,
      dialog: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      planLevel: "",
      planMaxPrograms: "",
      planMaxContentItems: "",
      planSubscribers: "",
      startDate: "",
      mobile: "",
      changePw: {},
    };
  },
};
</script>