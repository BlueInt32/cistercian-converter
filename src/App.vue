<template>
  <div class="input-zone">
    <p>Change the value here (0 to 9999) :</p>
    <input type="number" v-model="number" id="input-number" maxlength="4" @input="compute" />
  </div>
  <div class="svg-zone">
    <svg width="600" height="600">
      <g>
        <line x1="300" y1="0" x2="300" y2="600" stroke="black" stroke-width="8" />
        <line
          v-for="(line, index) in lines"
          :key="index"
          :x1="line[0][0]"
          :y1="line[0][1]"
          :x2="line[1][0]"
          :y2="line[1][1]"
          stroke="black"
          stroke-width="8"
        />
        <!-- <polygon :points="points"></polygon>
    <circle cx="100" cy="100" r="80"></circle>
    <axis-label v-for="(stat, index) in stats" :stat="stat" :index="index" :total="stats.length"> </axis-label> -->
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
  zero = 4;

  number = 1983;

  digits = [0, 0, 0, 0];

  unit = [1, 0];

  tens = [-1, 0];

  hundreds = [1, 2];

  thousands = [-1, 2];

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

  // tensLines: number[][][] = [];

  // hundredsLines: number[][][] = [];

  // thousandsLines: number[][][] = [];

  compute() {
    this.getDigits();
    console.log(this.digits[2], this.digits[3]);
    this.xOffset = 200;
    const unitLines = JSON.parse(JSON.stringify(this.map2[this.digits[3]]));
    const tensLines = JSON.parse(JSON.stringify(this.map2[this.digits[2]]));
    tensLines.forEach((line: number[][]) => {
      line[0] = this.mirrorXPoint(line[0]);
      line[1] = this.mirrorXPoint(line[1]);
    });
    const hundredsLines = JSON.parse(JSON.stringify(this.map2[this.digits[1]]));
    hundredsLines.forEach((line: number[][]) => {
      line[0] = this.offsetYPoint(line[0]);
      line[1] = this.offsetYPoint(line[1]);
    });

    const thousandsLines = JSON.parse(JSON.stringify(this.map2[this.digits[0]]));
    thousandsLines.forEach((line: number[][]) => {
      line[0] = this.mirrorXPoint(this.offsetYPoint(line[0]));
      line[1] = this.mirrorXPoint(this.offsetYPoint(line[1]));
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
    return [-(point[0] - this.xMiddle) + this.xMiddle, point[1]];
  }

  offsetYPoint(point: number[]) {
    return [point[0], point[1] + 396];
  }
}
</script>

<style lang="scss">
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
}
.svg-zone {
  margin: 2em;
  // border: 4px solid black;
}
</style>
