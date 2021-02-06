<template>
  <a id="github-link" target="_blank" href="https://github.com/BlueInt32/cistercian-converter">
    <img src="@/assets/github.png" alt="github" />
  </a>
  <p>Pick a number</p>
  <input type="number" v-model="number" id="input-number" min="0" max="9999" @input="compute" />
  <!-- viewbox attribute maps the available svg element space to local coordinates. Here the center is at top center-->
  <svg viewBox="-6 -1 12 14">
    <g>
      <polyline points="0,0 0,12" />
      <polyline v-for="(line, index) in lines" :transform="line.transform" :key="index" :points="line.points" />
    </g>
  </svg>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {}
})
export default class App extends Vue {
  lines: { points: string; transform: string }[] = [];

  number = 1983;

  digits = [0, 0, 0, 0];

  transformMap: { [index: number]: string } = {
    0: 'translate(0, 12) scale(-1,-1) ',
    1: 'translate(0, 12) scale(1,-1) ',
    2: 'scale(-1,1)',
    3: ''
  };

  map: { [index: number]: string } = {
    0: '',
    1: '0,0 4,0',
    2: '0,4 4,4',
    3: '0,0 4,4',
    4: '0,4 4,0',
    5: '0,0 4,0 0,4',
    6: '4,0 4,4',
    7: '0,0 4,0 4,4',
    8: '4,0 4,4 0,4',
    9: '0,0 4,0 4,4 0,4'
  };

  compute() {
    this.getDigits();
    this.lines = this.digits
      .map((d, i) => ({ points: this.map[d], transform: this.transformMap[i] }))
      .filter((p) => p.points);
  }

  getDigits() {
    this.digits = this.number
      .toString()
      .padStart(4, '0')
      .split('')
      .map((d) => parseInt(d, 10));
  }

  mounted() {
    const uri = window.location.search.substring(1);
    const params = new URLSearchParams(uri);
    const input = params.get('n');
    if (input && parseInt(input, 10)) {
      this.number = parseInt(input, 10);
    }
    this.compute();
  }
}
</script>

<style lang="scss">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
}
h1 {
  font-size: 1.8em;
  font-variant: small-caps;
  margin: 0.8em;
}

p {
  font-variant: small-caps;
  font-weight: 600;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

#input-number {
  font-size: 4em;
  margin: 0 auto;
  text-align: center;

  border: 8px solid black;
  border-radius: 20px;
  &:focus {
    outline: none;
  }
}

svg {
  margin: 3em auto;
  height: 50vh;
  width: 50vw;
}

#github-link {
  display: inline-block;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}
polyline {
  stroke-width: 0.7;
  fill: none;
  stroke: black;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
