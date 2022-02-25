<template>
    <div class="app-slidebar">
        <div class="header">
            Add Template
            <span class="btn-icon">
                <fa-icon icon="plus-circle" />
            </span>
        </div>
        <div class="content">
            <ul class="nav">
                <li class="nav-item">
                    <router-link :to="{ name: 'TemplateGeneralSettings' }">
                        General
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'TemplateImageSettings' }">
                        Images
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'TemplateColorsSettings' }">
                        Colors
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'TemplateBarcodeSettings' }">
                        Barcode
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'TemplateHeaderSettings' }">
                        Header
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'TemplatePrimarySettings' }">
                        Primary
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'TemplateSecondarySettings' }">
                        Secondary
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'TemplateAuxiliarySettings' }">
                        Auxiliary
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'TemplateAppSettings' }">
                        App
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'TemplateNFCSettings' }">
                        NFC
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="footer">
            <b-link>Save Template</b-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'slidebar-applewallet-component'
};
</script>

<style lang="scss" scoped>
.app-slidebar {
    .header {
        font-size: 15px;
        letter-spacing: 0px;
        color: #2f3380;
        background: #c4c5cc 0% 0% no-repeat padding-box;
    }

    .content {
        padding-left: 30px;
        .nav {
            .nav-item {
                padding: 12px 0px;
                font: normal normal normal 15px/18px;
                letter-spacing: 0px;
                color: #2f3380;

                &:hover {
                    color: #f79946;
                    background-color: transparent;
                }
            }
        }
    }

    .footer {
        padding: 20px 20px;
        text-decoration: underline;
        font: normal normal normal 18px/22px;
        letter-spacing: 0px;
        color: #2f3380;
    }
}
</style>
