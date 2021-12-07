<template>
    <div class="content">
        <b-row>
            <b-col sm="6">
                <b-row class="mb-4">
                    <b-col sm="12">
                        <h4 class="text-brand">Colors</h4>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col class="d-flex align-items-center" sm="4">
                        <label for="background-color">Background color</label>
                    </b-col>
                    <b-col sm="8">
                        <ColourPicker v-model="bgColour" :color="bgColour" picker="chrome"/>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col class="d-flex align-items-center" sm="4">
                        <label for="label-color">Label color</label>
                    </b-col>
                    <b-col sm="8">
                        <ColourPicker v-model="labelColor" :color="labelColor" picker="chrome"/>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col class="d-flex align-items-center" sm="4">
                        <label for="foreground-color">Foreground color</label>
                    </b-col>
                    <b-col sm="8">
                        <ColourPicker v-model="fgColor" :color="fgColor" picker="chrome"/>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col class="d-flex align-items-center" sm="4">
                        <label for="strip-color">Strip color</label>
                    </b-col>
                    <b-col sm="8">
                        <ColourPicker v-model="stripColor" :color="stripColor" picker="chrome"/>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="6">
                <b-container class="layout-preview">
                    <CouponLayout />
                </b-container>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import ColourPicker from "vue-colour-picker";
import CouponLayout from '../CouponLayout.vue';
export default {
    name: 'colors-settings-page',
    components: {
        ColourPicker,
        CouponLayout
    },
    data() {
        return {
            bgColour: '#000000',
            labelColor: '#FFFFFF',
            fgColor: '#000000',
            stripColor: '#000000'
        };
    },
    created() {
        this.saveColors();
    },
    methods: {
        saveColors() {
            this.$store.dispatch('savePassTemplateSettings', 
                Object.assign(
                    {
                        visualAppearanceKeys: {
                            colors: {
                                backgroundColor: this.bgColour,
                                labelColor: this.labelColor,
                                foregroundColor: this.fgColor,
                                stripColor: this.stripColor
                            }
                        }
                    },
                    this.tempPassTemplate
                )
            );
        }
    },
    computed: {
        tempPassTemplate() {
            return this.$store.getters['getSinglePassTemplate'];
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    padding-top: 30px;
    padding-bottom: 30px;
    h4 {
        font-size: 28px;
        line-height: 40px;
    }
    label {
        font: normal normal normal 15px/25px;
        letter-spacing: 0px;
        color: #2f3380;
    }
    .layout-preview {
        height: calc(100vh - 150px);
        padding-top: 15px;
        padding-bottom: 15px;
        background-color: #ffffff;
    }
    .input-group {
        .input-field {
            border-right: none;
        }
        .input-group-append {
            .input-group-text {
                background-color: #ffffff;
                border-left: none;
            }
        }
    }
}
::v-deep  {
    .color-picker {
        .input-group-addon {
            display: none;
        }
    }
}
</style>
