<template>
  <v-container>
    <v-sheet class="pa-5">
      <v-row>
        <v-col md="12">
          <v-row>
            <v-col>
              <h4>Manage Background Graphic</h4>
            </v-col>
            <v-col>
              <v-btn @click="choosePhoto()" class="float-right">
                Upload New Background
              </v-btn>
              <input
                class="userBgUpload"
                truncate-length="15"
                type="file"
                accept="image/*"
                @change="onFilePicked"
                style="display: none"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-for="(bg, index) in defaultBgs"
          :key="index"
          class="d-flex child-flex vimg-container"
          cols="2"
          @click="setGraphicUrl(bg.url)"
        >
          <v-img :src="bg.url" aspect-ratio="1" class="grey lighten-2">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-btn @click="removeBg({id: bg.id})" icon small class="delete-btn">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import faker from "faker";

export default {
  data() {
    return {
      imageUrl: null,
    };
  },
  methods: {
    ...mapActions({
      loadStockBgs: "getStockBackgrounds",
      save: "uploadStockBackground",
      removeBg: "deleteStockBackground",
      
    }),
    choosePhoto() {
      document.querySelector(".userBgUpload").click();
    },
    onFilePicked(e) {

      const files = e.srcElement.files[0];
      if (files) {
        const fr = new FileReader();
        fr.readAsDataURL(files);
        fr.addEventListener("load", () => {
          this.save({
            name: faker.lorem.slug(),
            imageData: fr.result,
          });
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      defaultBgs: "getDefaultBgs",
    }),
  },
  mounted() {
    this.loadStockBgs();
  },
};
</script>

<style scoped>
.vimg-container {
  position: relative;
}
.delete-btn {
  position: absolute;
  display: none;
}
.vimg-container:hover .delete-btn {
  display: block;
  background: white;
}
</style>