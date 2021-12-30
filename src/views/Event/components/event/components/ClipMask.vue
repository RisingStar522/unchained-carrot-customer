<template>
    <g>
        <defs>
            <mask id="svg-mask">
                <circle
                    :r="radius"
                    :cx="halfSize"
                    :cy="topHeight"
                    fill="white"
                />
            </mask>
        </defs>
        <defs>
            <mask id="svg-mask1">
                <circle
                    :r="radius"
                    :cx="halfSize"
                    :cy="topHeight"
                    fill="white"
                />
            </mask>
        </defs>
        <!-- <image
            mask="url(#svg-mask)"
            :x="halfSize - radius"
            :y="topHeight - radius"
            :height="topHeight"
            :width="topHeight"
            xlink:href="https://s3-ap-southeast-2.amazonaws.com/kruties-diagrams/misc/guardians-of-the-galaxy.jpg"
        >
        </image>
        <image
            mask="url(#svg-mask1)"
            :x="halfSize - radius"
            :y="topHeight - radius"
            :height="topHeight"
            :width="topHeight"
            xlink:href="https://s3-ap-southeast-2.amazonaws.com/kruties-diagrams/misc/guardians-of-the-galaxy.jpg"
        >
        </image> -->

        <!-- <circle class="circle" :r="radius" :cx="halfSize" :cy="topHeight">
        </circle> -->
        <text class="title" :x="halfSize" :y="topHeight / 4">
            {{ title }}
        </text>
    </g>
</template>
<script>
export default {
    props: ["title", "halfSize", "topHeight", "radius"]
}
</script>
