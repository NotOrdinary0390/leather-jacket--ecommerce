<template>
  <div>
    <h1 class="my-4 ml-4 text-sm">Stores</h1>
    <hr />
    <div class="container-app">
      <div class="flex flex-wrap justify-center">
        <CardStore
          v-for="(store, index) in stores"
          :key="index"
          :store="store"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// Stores
const stores = ref([
  {
    image: "/images/stores/vinicio-legnano.webp",
    name: "VINICIO",
    alt: "vinicio store legnano abbigliamento",
    address: "Square Gianfranco Ferrè, 2",
    city: "Legnano, MI",
    cap: "20025",
  },
  {
    image: "/images/stores/wise.jpg",
    alt: "wise negozio desenzano",
    name: "WISE",
    address: "Giuseppe Malvezzi Square, 27",
    city: "Desenzano Del Garda, BS",
    cap: "25015",
  },
  {
    image: "/images/stores/daad.webp",
    alt: "negozio daad dantone",
    name: "DAAD DANTONE",
    address: "Santo Spirito Street, 24A",
    city: "Milan, MI",
    cap: "20121",
  },
  {
    image: "/images/stores/base-blu.webp",
    alt: "negozio base blu",
    name: "BASE BLU",
    address: "Giosuè Carducci Square, 1",
    city: "Varese, VA",
    cap: "21100",
  },
  {
    image: "/images/stores/ferrario.webp",
    alt: "negozio ferrario",
    name: "FERRARIO ABBIGLIAMENTO",
    address: "S. Cristoforo Street, 13/15",
    city: "Saronno, VA",
    cap: "21047",
  },
  {
    image: "/images/stores/g&b.jpeg",
    alt: "abbigliamento G&B FLERO",
    name: "G&B FLERO",
    address: "Giuseppe Mazzini Street, 18",
    city: "Flero, BS",
    cap: "25020",
  },
  {
    image: "/images/stores/la-botteguccia.webp",
    alt: "negozio la botteguccia",
    name: "LA BOTTEGUCCIA",
    address: "Vittorio Emanuele II Square, 18",
    city: "Lainate, MI",
    cap: "20045",
  },
  {
    image: "/images/stores/ruggero.webp",
    alt: "negozio ruggero lonato dg",
    name: "RUGGERO",
    address: "Marziale Cerutti Street, 11",
    city: "Lonato Del Garda, BS",
    cap: "25017",
  },
  {
    image: "/images/stores/tufano.webp",
    alt: "negozio tufano abbigliamento",
    name: "TUFANO",
    address: "Geremia Cavallaro Street, 87",
    city: "Scafati, SA",
    cap: "84018",
  },
  {
    image: "/images/stores/vigano.webp",
    alt: "negozio vigano",
    name: "VIGANO",
    address: "Giacomo Matteotti, 34",
    city: "Seregno, MB",
    cap: "20831",
  },
  {
    image: "/images/stores/vero-falso.webp",
    alt: "negozio vero falso erba",
    name: "VERO FALSO ERBA",
    address: "Alessandro Volta Street, 13",
    city: "Erba, CO",
    cap: "22036",
  },
  {
    image: "/images/stores/vero-falso.webp",
    alt: "negozio vero falso lecco",
    name: "VERO FALSO LECCO",
    address: "Camillo Benso Conte di Cavour, 60D",
    city: "Lecco, LC",
    cap: "23900",
  },
  {
    image: "/images/stores/gaudenzi.webp",
    alt: "abbigliamento grimoldi gaudenzi",
    name: "GAUDENZI",
    address: "Ippolito Nievo Street, 11",
    city: "Riccione, RN",
    cap: "47838",
  },
  {
    image: "/images/stores/le-follie.png",
    alt: "abbigliamento grimoldi le follie shop",
    name: "LE FOLLIE",
    address: "C. Battisti, 29",
    city: "Chiudono, BG",
    cap: "24060",
  },
  {
    image: "/images/stores/sorey-p.png",
    alt: "abbigliamento grimoldi sorey-p shop",
    name: "LE FOLLIE",
    address: "Corso XV Aprile, 2",
    city: "Gallarate, VA",
    cap: "21013",
  },
]);

useHead({
  title: "Discover Our Stores - Alessandra Grimoldi: Luxury Leather Jackets",
  meta: [
    {
      name: "description",
      content:
        "Explore Alessandra Grimoldi's stores offering luxury leather jackets. Find our exclusive stores in Legnano, Desenzano Del Garda, Milan, Varese, Saronno, Flero, Lainate, Lonato Del Garda, Scafati, Seregno, Erba, Lecco, and Riccione.",
    },
    {
      name: "keywords",
      content:
        "Alessandra Grimoldi Stores, Luxury Leather Jackets, Legnano, Desenzano Del Garda, Milan, Varese, Saronno, Flero, Lainate, Lonato Del Garda, Scafati, Seregno, Erba, Lecco, Riccione",
    },
  ],
});
</script>

<style scoped></style>
