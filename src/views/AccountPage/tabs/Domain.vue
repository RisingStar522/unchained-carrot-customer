<template>
    <div class="domain mx-4">
        <b-row>
            <b-col md="3" style="background-color: #DFDFE3">
                <div
                    class="d-flex align-items-center p-3"
                    v-for="menu in leftMenu"
                    :key="menu.id"
                >
                    <img :src="menu.icon" alt="" width="24px" height="24px" />
                    <p
                        class="mb-0 ml-3 leftMenuText"
                        :class="{ active: menu.isActived }"
                        @click="handleChangeMenu(menu)"
                    >
                        {{ menu.title }}
                    </p>
                </div>
            </b-col>
            <b-col md="9">
                <div v-if="selectedMenu === DOMAIN_MENU.TRAFFIC_ROUTE">
                    <b-row
                        v-if="data[DOMAIN_MENU.TRAFFIC_ROUTE].length === 0"
                        class="p-5"
                    >
                        <b-col md="8">
                            <p class="domain__header">
                                Configure a custom domain for Traffic Routes
                            </p>
                            <p class="domain__normal">
                                You have no Custom Domain for Traffic Routes
                            </p>
                            <p class="domain__normal">
                                Your routes will use ucc.link
                            </p>
                            <b-button
                                variant="primary"
                                class="mt-4"
                                @click="
                                    handleAddDomain(DOMAIN_MENU.TRAFFIC_ROUTE)
                                "
                                >Configure</b-button
                            >
                        </b-col>
                        <b-col
                            md="4"
                            class="d-flex align-items-center justify-content-end"
                        >
                            <img
                                :src="
                                    require('@/assets/icons/account/domain_icon.svg')
                                        .default
                                "
                                width="175px"
                                height="175px"
                            />
                        </b-col>
                    </b-row>

                    <div v-else>
                        <div
                            class="d-flex align-items-center justify-content-end m-4"
                            style=" cursor: pointer;"
                            @click="handleAddDomain(DOMAIN_MENU.TRAFFIC_ROUTE)"
                        >
                            <fa-icon icon="plus-circle" class="text-primary" style="font-size: 25px;" />
                            <p
                                class="mb-0 ml-2"
                                style="text-decoration: underline;"
                            >
                                Add Domain
                            </p>
                        </div>

                        <b-table
                            :fields="fields[DOMAIN_MENU.TRAFFIC_ROUTE]"
                            :items="data[DOMAIN_MENU.TRAFFIC_ROUTE]"
                            class="p-0"
                        >
                            <template v-slot:cell(action)="data">
                                <div class="text-center">
                                    <fa-icon
                                        icon="trash-alt"
                                        class="ml-3"
                                        @click="handleDelete(data.item)"
                                        style="cursor: pointer;"
                                    />
                                </div>
                            </template>
                        </b-table>
                    </div>
                </div>

                <b-row
                    v-if="selectedMenu === DOMAIN_MENU.LANDING_PAGE"
                    class="p-5"
                >
                    <b-col md="8">
                        <p class="domain__header">
                            Configure a custom domain for Landing Pages
                        </p>
                        <p class="domain__normal">
                            You have no Custom Domain for Landing Pages
                        </p>
                        <p class="domain__normal">
                            Your routes will use
                            pages.unchainedcarrot.com/{shortname}
                        </p>
                        <b-button
                            variant="primary"
                            class="mt-4"
                            @click="handleAddDomain(DOMAIN_MENU.LANDING_PAGE)"
                            >Configure</b-button
                        >
                    </b-col>
                    <b-col
                        md="4"
                        class="d-flex align-items-center justify-content-end"
                    >
                        <img
                            :src="
                                require('@/assets/icons/account/domain_icon.svg')
                                    .default
                            "
                            width="175px"
                            height="175px"
                        />
                    </b-col>
                </b-row>

                <div class="p-5" v-if="selectedMenu === DOMAIN_MENU.EMAIL">
                    <b-row>
                        <b-col md="8">
                            <p class="domain__header">
                                Configure a custom domain for Email
                            </p>
                            <p class="domain__normal">
                                You have no Custom Domain for seeding Emails.
                            </p>
                            <p class="domain__normal">
                                Your emails will be sent from
                                no-reply@unchainedcarrot.com
                            </p>
                            <b-button
                                variant="primary"
                                class="mt-4"
                                @click="handleAddDomain(DOMAIN_MENU.EMAIL)"
                                >Configure</b-button
                            >
                        </b-col>
                        <b-col
                            md="4"
                            class="d-flex align-items-center justify-content-end"
                        >
                            <img
                                :src="
                                    require('@/assets/icons/account/domain_icon.svg')
                                        .default
                                "
                                width="175px"
                                height="175px"
                            />
                        </b-col>
                    </b-row>
                </div>

                <b-row
                    v-if="selectedMenu === DOMAIN_MENU.REFERRED_BY_ME"
                    class="p-5"
                >
                    <b-col md="8">
                        <p class="domain__header">
                            Configure a custom domain for ReferredByMe
                        </p>
                        <p class="domain__normal">
                            You have no Custom Domain for Referral links.
                        </p>
                        <p class="domain__normal">
                            The referral links of you remembers will be
                            {shortname}.rfby.me/ABC123
                        </p>
                        <b-button
                            variant="primary"
                            class="mt-4"
                            @click="handleAddDomain(DOMAIN_MENU.REFERRED_BY_ME)"
                            >Configure</b-button
                        >
                    </b-col>
                    <b-col
                        md="4"
                        class="d-flex align-items-center justify-content-end"
                    >
                        <img
                            :src="
                                require('@/assets/icons/account/domain_icon.svg')
                                    .default
                            "
                            width="175px"
                            height="175px"
                        />
                    </b-col>
                </b-row>

                <b-row
                    v-if="selectedMenu === DOMAIN_MENU.REVIEW_BY_ME"
                    class="p-5"
                >
                    <b-col md="8">
                        <p class="domain__header">
                            Configure a custom domain for ReviewByMe
                        </p>
                        <p class="domain__normal">
                            You have no Custom Domain for ReviewByMe.
                        </p>
                        <p class="domain__normal">
                            The domain for the micro survey option links will be
                            unchainedcarrot.click
                        </p>
                        <b-button
                            variant="primary"
                            class="mt-4"
                            @click="handleAddDomain(DOMAIN_MENU.REVIEW_BY_ME)"
                            >Configure</b-button
                        >
                    </b-col>
                    <b-col
                        md="4"
                        class="d-flex align-items-center justify-content-end"
                    >
                        <img
                            :src="
                                require('@/assets/icons/account/domain_icon.svg')
                                    .default
                            "
                            width="175px"
                            height="175px"
                        />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <!-- Add Domain Modal -->
        <!-- Modal -->
        <b-modal
            v-model="isAddDomainModal"
            id="template-modal"
            hide-footer
            :title="`Add Custom Domain for ${DOMAIN_MENU_TEXT[selectedDomain]}`"
            hide-backdrop
            body-class="pt-0"
            header-class="custom-modal-header"
        >
            <div v-if="customDomainStep === ADD_CUSTOM_DOMAIN_STEP.STEP_ONE">
                <p>
                    You can use any domain that you can control for the
                    {{ DOMAIN_MENU_TEXT[selectedDomain] }} links. However, we
                    recommend that you use short hostnames and the .link
                    top-level domain (TLD).
                </p>
                <p>
                    The domain name needs to be exclusive for use by
                    {{ DOMAIN_MENU_TEXT[selectedDomain] }}! It cannot be the
                    same as your website or the domain names used for other
                    features such as landing pages the referral links.
                </p>
                <label for="name" class="text-brand">Domain name</label>
                <b-form-input placeholder="e.g.short.link" />
            </div>

            <div
                v-if="
                    customDomainStep === ADD_CUSTOM_DOMAIN_STEP.STEP_TWO ||
                        customDomainStep === ADD_CUSTOM_DOMAIN_STEP.STEP_THREE
                "
            >
                <label for="name" class="text-brand">Domain name</label>
                <b-form-input placeholder="e.g.short.link" />
                <p class="mt-4">
                    The traffic routes will have to be secured. Therefore, a SSL
                    certificate will be issued for you. You will have to create
                    the following settings in the DNS for the domain
                </p>
                <b-table :fields="addDomainField" :items="dataAddDomain" />

                <div
                    v-if="
                        customDomainStep === ADD_CUSTOM_DOMAIN_STEP.STEP_THREE
                    "
                >
                    <p class="fw-bold">Thanks</p>
                    <p>
                        We will now verify that you own the domain, issue the
                        SSL certificate and active the domain for Traffic
                        Routes. This can take serveral hours. You can follow the
                        progress on the Certificates and Domains pages. Once
                        activated the domain will automatically become available
                        when creating new Traffic Routes.
                    </p>
                </div>
            </div>

            <b-form-group>
                <div
                    class="d-flex align-items-center justify-content-between mt-5"
                >
                    <b-btn
                        block
                        variant="outline-primary"
                        style="flex: 0.48"
                        @click="handleCancel"
                        v-if="
                            customDomainStep !==
                                ADD_CUSTOM_DOMAIN_STEP.STEP_THREE
                        "
                    >
                        {{
                            customDomainStep === ADD_CUSTOM_DOMAIN_STEP.STEP_ONE
                                ? 'Cancel'
                                : 'Back'
                        }}
                    </b-btn>
                    <b-btn
                        @click="handleContinue"
                        variant="brand"
                        :style="{
                            flex:
                                customDomainStep ===
                                ADD_CUSTOM_DOMAIN_STEP.STEP_THREE
                                    ? 1
                                    : 0.48
                        }"
                        >{{ submitButton[customDomainStep - 1] }}</b-btn
                    >
                </div>
            </b-form-group>
        </b-modal>

        <delete-confirm-modal
            id="delete-domain-confirm-modal"
            title="Delete Domain?"
            subtitle="Write DELETE to permanently delete this domain"
            @onSubmit="handleOnSubmitDelete"
        />
    </div>
</template>

<script>
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue';
import {
    DOMAIN_MENU,
    ADD_CUSTOM_DOMAIN_STEP,
    DOMAIN_MENU_TEXT
} from '../constant';
export default {
    components: { DeleteConfirmModal },
    name: 'domain-tab',
    data: () => ({
        DOMAIN_MENU,
        DOMAIN_MENU_TEXT,
        ADD_CUSTOM_DOMAIN_STEP,
        customDomainStep: ADD_CUSTOM_DOMAIN_STEP.STEP_ONE,
        isAddDomainModal: false,
        selectedDomain: DOMAIN_MENU.TRAFFIC_ROUTE,
        selectedItem: null,
        submitButton: ['Continue', 'I have done this', 'Close'],
        leftMenu: [
            {
                id: DOMAIN_MENU.TRAFFIC_ROUTE,
                title: 'Traffic Routes',
                icon: require('../../../assets/icons/TrafficRoutes.svg'),
                isActived: true
            },
            {
                id: DOMAIN_MENU.LANDING_PAGE,
                title: 'Landing Pages',
                icon: require('../../../assets/icons/Page Builder.svg'),
                isActived: false
            },
            {
                id: DOMAIN_MENU.EMAIL,
                title: 'Email',
                icon: require('../../../assets/icons/Email.svg'),
                isActived: false
            },
            {
                id: DOMAIN_MENU.REFERRED_BY_ME,
                title: 'ReferredByMe',
                icon: require('../../../assets/icons/Integrations.svg'),
                isActived: false
            },
            {
                id: DOMAIN_MENU.REVIEW_BY_ME,
                title: 'ReviewByMe',
                icon: require('../../../assets/icons/Reviews.svg'),
                isActived: false
            }
        ],
        selectedMenu: DOMAIN_MENU.TRAFFIC_ROUTE,
        fields: {
            [DOMAIN_MENU.TRAFFIC_ROUTE]: [
                { key: 'domain', label: 'DOMAIN' },
                { key: 'certificate', label: 'CERTIFICATE' },
                { key: 'status', label: 'STATUS' },
                { key: 'action', label: '' }
            ]
        },
        data: {
            [DOMAIN_MENU.TRAFFIC_ROUTE]: [
                {
                    id: 0,
                    domain: 'host.link',
                    certificate: 'ISSUED',
                    status: 'active'
                },
                {
                    id: 1,
                    domain: 'host.link',
                    certificate: 'ISSUED',
                    status: 'active'
                }
            ]
        },
        currentPage: 1,
        perPage: 5,
        rowsPerPageOptions: [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' }
        ],
        addDomainField: [
            { key: 'host', label: 'HOST' },
            { key: 'type', label: 'TYPE' },
            { key: 'value', label: 'VALUE' }
        ],
        dataAddDomain: [
            {
                id: 0,
                host: '@',
                type: 'CNAME',
                value: '21155.aws.com'
            },
            {
                id: 1,
                host: '@',
                type: 'CNAME',
                value: '21155.aws.com'
            }
        ]
    }),
    methods: {
        handleChangeMenu(item) {
            this.selectedMenu = item.id;
            this.leftMenu = this.leftMenu.map(left => {
                if (left.id === item.id) {
                    left.isActived = true;
                } else {
                    left.isActived = false;
                }

                return left;
            });
        },
        handleAddDomain(domain) {
            this.isAddDomainModal = true;
            this.selectedDomain = domain;
        },
        handleCancel() {
            if (this.customDomainStep === ADD_CUSTOM_DOMAIN_STEP.STEP_ONE) {
                this.isAddDomainModal = false;
                this.customDomainStep = ADD_CUSTOM_DOMAIN_STEP.STEP_ONE;
            } else {
                this.isAddDomainModal = true;
            }
        },
        handleContinue() {
            if (this.customDomainStep === ADD_CUSTOM_DOMAIN_STEP.STEP_THREE) {
                this.isAddDomainModal = false;
                this.customDomainStep = ADD_CUSTOM_DOMAIN_STEP.STEP_ONE;
            } else {
                this.customDomainStep++;
            }
        },
        handleDelete(item) {
            this.$bvModal.show('delete-domain-confirm-modal');
            this.selectedItem = item;
        },
        handleOnSubmitDelete() {}
    }
};
</script>

<style lang="scss" scoped>
.leftMenuText {
    color: #2f337f;
    cursor: pointer;

    &.active {
        color: #f79a46;
    }
}

.domain {
    background-color: #ffffff;

    &__header {
        font-size: 16px;
        font-weight: 700;
        color: #2f337f;
    }

    &__normal {
        font-size: 14px;
        color: #2f337f;
    }
}

::v-deep {
    .custom-modal-header {
        padding-bottom: 10px;
        .modal-title {
            color: #2f337f;
            font-weight: 800;
            font-size: 22px;
        }
    }
}
</style>
