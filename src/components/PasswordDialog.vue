<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark x-small v-bind="attrs" v-on="on">
          Reset
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Reset Coach Password
        </v-card-title>

        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  type="password"
                  v-model="newPassword"
                  label="New Password"
                  required
                ></v-text-field>
              </v-col> </v-row></v-container
        ></v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="setCoachPw()"> Reset </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  props: ["coachData"],
  methods: {
    async setCoachPw() {
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
            firstName: this.coachData.firstName,
            lastName: this.coachData.lastName,
            email: this.coachData.email,
            status: this.coachData.status,
            mobile: this.coachData.mobile,
            startDate: this.coachData.startDate,
            password: this.newPassword,
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
      dialog: false,
      newPassword: "",
      changePw: {},
    };
  },
};
</script>