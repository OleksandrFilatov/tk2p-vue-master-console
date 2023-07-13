<template>
  <div class="mt-14 ma-5">
    <h3>Coaches Summary</h3>
    <p>
      <v-btn
        class="clear-btn"
        color="primary"
        elevation="2"
        small
        @click="goToAddCoach()"
      >
        Add Coach
      </v-btn>
    </p>
    <div class="relative">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Active</th>
              <th class="text-left">Coach Name</th>
              <th class="text-left">Plan Level</th>
              <th class="text-left">Programs</th>
              <th class="text-left">Content Items</th>
              <th class="text-left">Clients</th>
              <th class="text-left">Started On</th>
              <!-- <th class="text-left">Expires On</th> -->
              <th class="text-left">Page</th>
              <th class="text-left">Reset Password</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in coaches" :key="item.name">
              <td>
                <v-checkbox
                  @change="setCoachStatus($event, item)"
                  v-model="item.status"
                  true-value="active"
                  false-value="inactive"
                ></v-checkbox>
              </td>
              <td>
                <name-change-dialog :coachData="item" />
              </td>
              <td>{{ item.planLevel }}</td>
              <td>{{ item.numPrograms || 0 }} / {{ item.planMaxPrograms }}</td>
              <td>{{ item.numContentItems || 0 }} / {{ item.planMaxContentItems }}</td>
              <td>
                {{ item.numSubscribers || 0 }} / {{ item.planSubscribers }}
              </td>
              <td>{{ formatDate(item.startDate) }}</td>
              <td>
                <a
                  :href="`${coachAppBaseUrl}/login?email=${item.email}&password=${item.password}`"
                  >Coach Page</a
                >
              </td>
              <td>
                <password-dialog :coachData="item" />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template> 
<script>
import moment from "moment";
import gql from "graphql-tag";
import PasswordDialog from "./PasswordDialog.vue";
import NameChangeDialog from "./NameChangeDialog.vue";

export default {
  components: {
    PasswordDialog,
    NameChangeDialog,
  },
  apollo: {
    coaches: {
      query: gql`
        query {
          coaches {
            id
            firstName
            lastName
            email
            mobile
            password
            numPrograms
            planMaxPrograms
            planLevel
            numSubscribers
            planSubscribers
            planMaxContentItems
            numContentItems
            startDate
            status
            programs {
              id
            }
          }
        }
      `,
    },
  },
  methods: {
    goToAddCoach() {
      this.$router.push("create-coach");
    },
    async setCoachStatus(e, item) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation updateCoach($id: Float!, $data: CoachInput!) {
            updateCoach(id: $id, data: $data) {
              id
              status
            }
          }
        `,
        variables: {
          id: parseInt(item.id),
          data: {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            mobile: item.mobile,
            startDate: item.startDate,
            status: e,
          },
        },
      });

      this.$apollo.queries.coaches.refetch();
    },
    async editCoachName(item) {
      console.log(item);
    },
    formatDate(date) {
      return moment(date).calendar();
    },
  },
  data() {
    return {
      coachAppBaseUrl: process.env.VUE_APP_COACH_PORTAL_URL,
    };
  },
};
</script>

<style lang="css">
.clear-btn {
  position: relative;
  left: 90vw;
}
</style>