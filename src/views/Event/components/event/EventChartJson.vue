<template>
  <div id="app-chart-json">
    
    <div id="container-chart-json">
      <svg xmlns="http://www.w3.org/2000/svg" :view-box.camel="viewbox">
        <g>
          <g>
            <rect :x="leftStart" :y="topHeight-70" :height="140" :width="480" style="fill: #FFFFFF"/>
            <text :x="leftStart + 100"  :y="topHeight-30">
                <tspan font-size="18px" font-weight="bold">
                    {{ name }}
                </tspan>
            </text>
            
            <text :x="leftStart + 85"  :y="topHeight+5">
                <tspan font-size="18px">
                    {{ project }}
                </tspan>
            </text>
            <text :x="leftStart + 380"  :y="topHeight-30">
                <tspan font-size="20px" font-weight="bold">
                    Order Placed
                </tspan>
            </text>
            <g v-if="statusPublished">
              <circle fill="#5bbaa1" r="8" :cx="leftStart + 320" :cy="topHeight">
              </circle>
            </g>
            <g v-else>
              <circle fill="#f79946" r="8" :cx="leftStart + 320" :cy="topHeight">
              </circle>
            </g>
            
            <g >
            <image id="show-json" ref="child" @click="showJson" :x="leftStart + 340" :y="topHeight+22" width="30"  xlink:href="https://img.icons8.com/fluency-systems-filled/48/000000/json.png"/>
            </g>
            <image id="show-growth" :x="leftStart + 400" :y="topHeight+22" width="30" @click="showCharts" xlink:href="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-growth-infographic-elements-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-1.png"/>
            <text :x="leftStart + 400"  :y="topHeight+6">
                <tspan font-size="18px">
                    {{ lastSeen }}
                </tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import ClipMask from "./components/ClipMask.vue"
import CubicBezier from "./components/CubicBezier.vue"

export default {
  name: "event-chart-json",
  components: {
    ClipMask,
    CubicBezier
  },
  data() {
    return {
      title: "Guardians of the Galaxy",
      size: 1000,
      visible: false
    }
  },
  props: [
    "name",
    "project",
    "lastSeen",
    "statusPublished"
  ],
  computed: {
    leftStart() {
      return 0;
    },
    leftWidth() {
      return this.size * 0.6
    },
    rightWidth() {
      return this.size * 0.6 + 100
    },
    middleWidth() {
      return this.size * 0.6 + 100
    },
    topHeight() {
      return this.size * 0.2
    },
    width() {
      return this.size
    },
    halfSize() {
      return this.size * 0.5
    },
    distance() {
      return Math.round(this.width / this.items.length)
    },
    radius() {
      return this.topHeight * 0.5
    },
    viewbox() {
      return "0 120 " + 1500 + " " + 160
    }
  },
  methods: {
    showJson() {
      this.$parent.changeStateJson();
    },
    showCharts() {
      this.$parent.changeStateCharts();
    }
  }
};
</script>

<style>
.item {
  stroke: #ccc;
  stroke-width: 5;
}
.line {
  stroke: #2F3380;
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
}
.image-green {
 color: #ccc;
 fill: black;
}
.icon-green {
 fill: #39cb89;
}
path {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
}
text {
  font-size: 28px;
  text-anchor: middle;
}
#container-chart-json {
  display: flex;
  border-radius: 10px;
}
#config {
  padding: 10px;
  margin: 5px;
  height: fit-content;
  border-radius: 5px;
}
svg {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 40px;
}
.clip-svg {
  clip-path: url(#myClip);
}
#config button {
  float: right;
}
.item {
  border-bottom: 1px dashed rgba(0, 0, 0, 0.5);
  padding: 5px;
}
.action {
  padding: 10px;
}
input,
button {
  margin-bottom: 3px;
}
.circle {
  stroke-width: 5;
  stroke: #5bbaa1;
  fill: none;
}
</style>
