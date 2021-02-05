<template>
  <a class="github-link" target="_blank" href="https://github.com/BlueInt32/cistercian-converter">
    <img src="@/assets/github.png" alt="github" />
  </a>
  <div class="input-zone">
    <p>Pick a number :</p>
    <input type="number" v-model="number" id="input-number" min="0" max="9999" @input="compute" />
  </div>
  <div class="svg-zone">
    <svg width="600" height="600">
      <g>
        <polyline
          :points="`300,${stroke / 2} 300,${600 - stroke}`"
          stroke="black"
          :stroke-width="stroke"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <polyline
          v-for="(line, index) in lines"
          :key="index"
          :points="`${line[0][0]},${line[0][1]} ${line[1][0]},${line[1][1]}`"
          fill="none"
          stroke="black"
          :stroke-width="stroke"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {}
})
export default class App extends Vue {
  stroke = 15;

  zero = this.stroke / 2;

  number = 1983;

  digits = [0, 0, 0, 0];

  xMiddle = 300;

  xOffset = 200;

  yOffset = 200;

  a = [this.xMiddle, this.zero];

  b = [this.xMiddle + this.xOffset, this.zero];

  c = [this.xMiddle, this.yOffset];

  d = [this.xMiddle + this.xOffset, this.yOffset];

  map2: { [index: number]: number[][][] } = {
    0: [],
    1: [[this.a, this.b]],
    2: [[this.c, this.d]],
    3: [[this.a, this.d]],
    4: [[this.c, this.b]],
    5: [
      [this.a, this.b],
      [this.c, this.b]
    ],
    6: [[this.b, this.d]],
    7: [
      [this.a, this.b],
      [this.b, this.d]
    ],
    8: [
      [this.b, this.d],
      [this.c, this.d]
    ],
    9: [
      [this.a, this.b],
      [this.b, this.d],
      [this.c, this.d]
    ]
  };

  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element
  lines: number[][][] = [];

  compute() {
    this.getDigits();
    this.xOffset = 200;
    const unitLines = JSON.parse(JSON.stringify(this.map2[this.digits[3]]));
    const tensLines = JSON.parse(JSON.stringify(this.map2[this.digits[2]]));
    tensLines.forEach((line: number[][]) => {
      line[0] = this.mirrorXPoint(line[0]);
      line[1] = this.mirrorXPoint(line[1]);
    });
    const hundredsLines = JSON.parse(JSON.stringify(this.map2[this.digits[1]]));
    hundredsLines.forEach((line: number[][]) => {
      line[0] = this.offsetYPoint(this.mirrorYPoint(line[0]));
      line[1] = this.offsetYPoint(this.mirrorYPoint(line[1]));
    });

    const thousandsLines = JSON.parse(JSON.stringify(this.map2[this.digits[0]]));
    thousandsLines.forEach((line: number[][]) => {
      line[0] = this.mirrorXPoint(this.offsetYPoint(this.mirrorYPoint(line[0])));
      line[1] = this.mirrorXPoint(this.offsetYPoint(this.mirrorYPoint(line[1])));
    });
    this.lines = unitLines.concat(tensLines).concat(hundredsLines).concat(thousandsLines);
  }

  getDigits() {
    this.digits = this.number
      .toString()
      .padStart(4, '0')
      .split('')
      .map((d) => parseInt(d, 10));
  }

  mirrorXPoint(point: number[]) {
    return [-point[0] + 2 * this.xMiddle, point[1]];
  }

  mirrorYPoint(point: number[]) {
    return [point[0], -point[1]];
  }

  offsetYPoint(point: number[]) {
    return [point[0], point[1] + 600 - this.stroke / 2];
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
h1 {
  font-size: 5em;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#input-number {
  font-size: 6em;
  width: 270px;
  border: 0;
  // &:focus {
  //   border: 1px solid red;
  // }
}
.input-zone {
  display: flex;
  align-items: center;

  p {
    margin-right: 2em;
  }
}

.svg-zone {
  margin: 2em;
  // border: 4px solid black;
}
.github-link {
  display: inline-block;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}
</style>
