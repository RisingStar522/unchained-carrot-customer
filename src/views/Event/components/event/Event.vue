<template>
  <div id="app">
    <div class="container-event">
      <svg xmlns="http://www.w3.org/2000/svg" :view-box.camel="viewbox">
        <g>
          <g>
            <rect :x="halfSize-770" :y="topHeight-70" :height="140" :width="480" style="fill: #FFFFFF"/>
            <text :x="halfSize-670"  :y="topHeight-30">
                <tspan font-size="18px" font-weight="bold">
                    {{ name }}
                </tspan>
            </text>
            
            <text :x="halfSize-685"  :y="topHeight+5">
                <tspan font-size="18px">
                    {{ project }}
                </tspan>
            </text>
            <text :x="halfSize-390"  :y="topHeight-30">
                <tspan font-size="20px" font-weight="bold">
                    Order Placed
                </tspan>
            </text>
            <g v-if="statusPublished">
              <circle fill="#5bbaa1" r="8" :cx="halfSize-450" :cy="topHeight">
              </circle>
            </g>
            <g v-else>
              <circle fill="#f79946" r="8" :cx="halfSize-450" :cy="topHeight">
              </circle>
            </g>
            
            <g >
            <image id="show-json" ref="child" @click="showJson" :x="halfSize-430" :y="topHeight+22" width="30"  xlink:href="https://img.icons8.com/fluency-systems-filled/48/000000/json.png"/>
            </g>
            <image id="show-growth" :x="halfSize-370" :y="topHeight+22" width="30" @click="showCharts" xlink:href="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-growth-infographic-elements-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-1.png"/>
            <text :x="halfSize-370"  :y="topHeight+6">
                <tspan font-size="18px">
                    {{ lastSeen }}
                </tspan>
            </text>
            <path class="line" d="M400,200 C500,200 220,200 210,200"></path>
          </g>
        </g>
        <g v-if="statusPublished">
          <g v-for="(item, i) in greenItems" :key="item + i">
            <!-- Cubic Bezier Component  -->
            <g v-if="item.state">
              <cubic-bezier
                :index="i"
                :half-size="halfSize"
                :top-height="topHeight"
                :bottom-height="bottomHeight"
                :left-width="leftWidth"
                :rigth-width="rightWidth"
                :radius="radius"
                :distance="distance"
                :item="item"
                :middle-width="middleWidth"
              ></cubic-bezier>
            </g>
          </g>
        </g>
        <g v-else>
          <g v-for="(item, i) in yellowItems" :key="item + i">
            <g v-if="!item.state">
              <cubic-bezier
                :index="i"
                :half-size="halfSize"
                :top-height="topHeight"
                :bottom-height="bottomHeight"
                :left-width="leftWidth"
                :rigth-width="rightWidth"
                :radius="radius"
                :distance="distance"
                :item="item"
                :middle-width="middleWidth"
              ></cubic-bezier>
            </g>
          </g>
        </g>
        <!-- Clipping Mask Component  -->
        <clip-mask
          :half-size="halfSize"
          :top-height="topHeight"
          :radius="radius"
        ></clip-mask>
      </svg>
    </div>
  </div>
</template>

<script>
import ClipMask from "./components/ClipMask.vue"
import CubicBezier from "./components/CubicBezier.vue"

export default {
  name: "app",
  components: {
    ClipMask,
    CubicBezier
  },
  data() {
    return {
      title: "Guardians of the Galaxy",
      size: 1000,
      items: [
        {
          title: "Confimation email",
          iconStyle: "emailGreen",
          state: true 
        },
        {
          title: "Order Placed Point",
          iconStyle: "enrichmentGreen",
          state: true  
        },
        {
          title: "Sum_Revenue",
          iconStyle: "analyticsGreen",
          state: true  
        },
        {
          title: "Reward",
          iconStyle: "rewardYellow",
          state: false  
        }
      ],
      greenItems: [
        {
          title: "Confimation email",
          iconStyle: "emailGreen",
          state: true 
        },
        {
          title: "Order Placed Point",
          iconStyle: "enrichmentGreen",
          state: true  
        },
        {
          title: "Sum_Revenue",
          iconStyle: "analyticsGreen",
          state: true  
        },
      ],
      yellowItems: [
        {
          title: "Confimation email",
          iconStyle: "emailYellow",
          state: false  
        }
      ],
      visible: false
    }
  },
  props: {
    name:{type:String},
    project: {type:String},
    lastSeen: {type:String},
    statusPublished: {type:Boolean},
    jsonState: {type: Function}
  },
  computed: {
    yPosition() {
        return this.distance * this.index / 2 + 200
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
    bottomHeight() {
      return this.size * 0.6
    },
    width() {
      return this.size
    },
    halfSize() {
      return this.size * 0.5
    },
    distance() {
      return Math.round(this.width * 1.5 / this.items.length)
    },
    radius() {
      return this.topHeight * 0.5
    },
    viewbox() {
      return "0 0 " + this.size + " " + this.size
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
  opacity: 0.27;
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
.icon-yellow {
 fill: #f79946;
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
.container-event {
  display: flex;
  height: 100vh;
  justify-content: center;
  border-radius: 10px;
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
