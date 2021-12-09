♦<template>
    <main class="content">
        <div class="container mx-4 mt-3">
            <b-form @submit.prevent="onSubmit">
                <div
                    class="
                        d-flex
                        justify-content-between
                        align-items-center
                        pl-2 pt-3 pb-3 pr-3
                    "
                >
                    <h3>Add Persona</h3>
                    <div class="justify-content-end">
                        <b-button
                            type="button"
                            class="mr-4"
                            variant="outline-brand"
                            @click="goBack"
                            >Cancel and go back</b-button
                        >
                        <b-button
                            type="submit"
                            variant="brand"
                            :disabled="!itemsForDestination.length"
                            >{{
                                !trafficRouteId ? 'Add' : 'Update'
                            }}
                            Persona</b-button
                        >
                        
                    </div>
                </div>

                <b-row class="mb-3 ml-1 block-1">
                    <b-card class="w-100 px-4 pt-4 pb-2">
                        <div class="validation_mark">
                            <img
                                class="mr-2"
                                src="../../assets/icons/validation_recommend.svg"
                            />
                            <span>RECOMMEDED</span>
                        </div>
                        <b-row>
                            <b-col sm="12">
                                <div class="d-flex align-items-center">
                                    <h2 class="text-primary">
                                        General Details
                                    </h2>
                                    <a
                                        href="https://unchainedcarrot.com/support/#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            class="ml-3 mb-2"
                                            src="../../assets/icons/noun_Info.svg"
                                        />
                                    </a>
                                </div>

                                <p>
                                    These details will help you to personalize better your marketing activities.
                                </p>

                                <b-row class="mt-4">
                                    <b-col sm="4">
                                        <b-form-group
                                            id="input-group-route"
                                            label="First Name"
                                        >
                                            <div
                                                class="
                                                    d-flex
                                                    align-items-center
                                                "
                                            >
                                                <b-form-input
                                                    id="input-code"
                                                    type="text"
                                                    v-model="formData.firstName"
                                                    placeholder=""
                                                    required
                                                ></b-form-input>
                                            </div>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="4">
                                        <b-form-group
                                            id="input-group-route"
                                            label="Last Name"
                                        >
                                            <div
                                                class="
                                                    d-flex
                                                    align-items-center
                                                "
                                            >
                                                <b-form-input
                                                    id="input-code"
                                                    type="text"
                                                    v-model="formData.lastName"
                                                    placeholder=""
                                                    required
                                                ></b-form-input>
                                            </div>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="3">
                                        <div>
                                            <label for="example-input">Date of Birth</label>
                                            <b-input-group class="mb-3">
                                            <b-form-input
                                                id="example-input"
                                                v-model="value"
                                                type="text"
                                                placeholder="MM-DD-YYYY"
                                                autocomplete="off"
                                            ></b-form-input>
                                            <b-input-group-append>
                                                <b-form-datepicker
                                                v-model="value"
                                                button-only
                                                right
                                                locale="en-US"
                                                aria-controls="example-input"
                                                @context="onContext"
                                                ></b-form-datepicker>
                                            </b-input-group-append>
                                            </b-input-group>
                                        </div>
                                    </b-col>
                                    <b-col sm="1"></b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="4">
                                        <!-- <b-col sm="6" class="no-right-padding">
                                            <b-form-input
                                                id="sender-email"
                                                type="text"
                                                placeholder="E.g. youremail@example.com"
                                            />
                                        </b-col> -->
                                        <b-form-group
                                            id="input-group-route"
                                            label="First Name"
                                        >
                                            <div
                                                class="
                                                    d-flex
                                                    align-items-center
                                                "
                                            >
                                                <b-form-input
                                                    id="input-code"
                                                    type="text"
                                                    v-model="formData.email"
                                                    variant="outline-primary"
                                                    placeholder="E.g. youremail@example.com"
                                                    required
                                                ></b-form-input>
                                            </div>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="7">
                                        <b-row>
                                            <b-col sm="12">
                                                <label for="store-country">Store Country</label>
                                                <b-dropdown
                                                    :text="selectedCountry"
                                                    block
                                                    variant="outline-primary"
                                                    menu-class="w-100"
                                                >
                                                    <b-dropdown-item
                                                        v-for="option in storeCountries"
                                                        :key="option.value"
                                                        :value="option.value"
                                                        placeholder="Search Country"
                                                        @click="selectedCountry = option.value"
                                                        >{{ option.text }}</b-dropdown-item
                                                    >
                                                </b-dropdown>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <b-col sm="1">
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-row>

                <b-row class="mb-3 ml-1 block-1">
                    <b-card class="w-100 px-4 pt-4 pb-2">
                        <div class="validation_mark">
                            <img
                                class="mr-2"
                                src="../../assets/icons/validation_recommend.svg"
                            />
                            <span>RECOMMENDED</span>
                        </div>
                        <b-row>
                            <b-col sm="12">
                                <div class="d-flex align-items-center">
                                    <h2 class="text-primary">
                                        Memberships
                                    </h2>
                                    <a
                                        href="https://unchainedcarrot.com/support/#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            class="ml-3 mb-2"
                                            src="../../assets/icons/noun_Info.svg"
                                        />
                                    </a>
                                </div>

                                <p>You can configure multiple traits for your persona.</p>

                                <b-row class="mt-4">
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.referral1"
                                            class="md-primary"
                                        >
                                            Referral Program 1
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.referral2"
                                            class="md-primary"
                                        >
                                            Referral Program 2
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.referral3"
                                            class="md-primary"
                                        >
                                            Referral Program 3
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.referral4"
                                            class="md-primary"
                                        >
                                            Referral Program 4
                                        </md-checkbox>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.loyalty1"
                                            class="md-primary"
                                        >
                                            Loralty Program 1
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.loyalty2"
                                            class="md-primary"
                                        >
                                            Loralty Program 2
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.loyalty3"
                                            class="md-primary"
                                        >
                                            Loralty Program 3
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.loyalty4"
                                            class="md-primary"
                                        >
                                            Loralty Program 4
                                        </md-checkbox>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-row>

                <b-row class="mb-3 ml-1 block-1">
                    <b-card class="w-100 px-4 pt-4 pb-2">
                        <div class="validation_mark">
                            <img
                                class="mr-2"
                                src="../../assets/icons/validation_recommend.svg"
                            />
                            <span>RECOMMENDED</span>
                        </div>
                        <b-row>
                            <b-col sm="12">
                                <div class="d-flex align-items-center">
                                    <h2 class="text-primary">
                                        Traits
                                    </h2>
                                    <a
                                        href="https://unchainedcarrot.com/support/#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            class="ml-3 mb-2"
                                            src="../../assets/icons/noun_Info.svg"
                                        />
                                    </a>
                                </div>

                                <p>You can configure multiple traits for your persona.</p>

                                <b-row class="mt-4 pt-4 ml-1 mb-2">
                                    <b-row class="justify-content-left">
                                        <b-col sm="12">
                                            <Search
                                                placeholder="Search template..."
                                                :searchHandler="searchHandler"
                                            />
                                        </b-col>
                                    </b-row>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-row>

            </b-form>

            <b-modal
                id="warning-modal"
                header-border-variant="light"
                footer-border-variant="light"
                centered
                hide-header
            >
                <div class="d-block text-center">
                    We recommend that you configure the UTM tags. However you
                    may continue to save
                </div>

                <template v-slot:modal-footer="{ hide }">
                    <div class="d-flex justify-content-center w-100">
                        <b-btn
                            @click="hide()"
                            variant="outline-brand"
                            size="lg"
                            class="mr-2"
                            >Cancel</b-btn
                        >
                        <b-btn
                            size="lg"
                            variant="brand"
                            @click="continueAfterWarning()"
                            >Continue</b-btn
                        >
                    </div>
                </template>
            </b-modal>

            <b-modal
                id="warning-modal-for-validation"
                header-border-variant="light"
                footer-border-variant="light"
                centered
                hide-header
            >
                <div class="d-block text-center">
                    Route name cannot be empty
                </div>

                <template v-slot:modal-footer="{ hide }">
                    <div class="d-flex justify-content-center w-100">
                        <b-btn
                            @click="hide()"
                            variant="outline-brand"
                            size="lg"
                            class="mr-2"
                            >Close</b-btn
                        >
                    </div>
                </template>
            </b-modal>

            <b-modal
                id="warning-modal-for-link"
                header-border-variant="light"
                footer-border-variant="light"
                centered
                hide-header
            >
                <div class="d-block text-center">
                    Only change the code if you have not yet distributed the
                    shortened link or the QR code! Links containing the old code
                    will no longer work!
                </div>

                <template v-slot:modal-footer="{ hide }">
                    <div class="d-flex justify-content-center w-100">
                        <b-btn
                            @click="hide()"
                            variant="outline-brand"
                            size="lg"
                            class="mr-2"
                            >Cancel</b-btn
                        >
                        <b-btn
                            size="lg"
                            variant="brand"
                            @click="updateTrafficRoute()"
                            >Continue</b-btn
                        >
                    </div>
                </template>
            </b-modal>

            <b-modal
                id="publish-confirm-modal"
                header-border-variant="light"
                footer-border-variant="light"
                centered
                hide-header
                hide-footer
            >
                <div
                    class="d-block text-center p-5"
                    style="width: 360px; margin: auto"
                >
                    Your route is not published yet. Do you want to publish it
                    now?
                </div>

                <template>
                    <div class="d-flex justify-content-center w-100 pb-3">
                        <b-btn
                            @click="cancelPublish"
                            variant="outline-brand"
                            size="lg"
                            class="mr-2"
                            style="width: 170px"
                            >Later</b-btn
                        >
                        <b-btn
                            size="lg"
                            variant="brand"
                            @click="publishRoute"
                            style="width: 170px"
                            >Publish Now</b-btn
                        >
                    </div>
                </template>
            </b-modal>
        </div>
    </main>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { Validator } from 'vee-validate';
import { submitTrackingEvent } from '../../services/TrackingService';
import Search from '../../components/search';

export default {
    name: 'add-traffic-route',
    components: {
        QrcodeVue,
        Search
    },
    data() {
        return {
            formData: {
                enabled: true,
                filter: ''
            },
            selectedCountry: 'Netherlands',
            storeCountries: [
                {
                    value: 'Netherlands',
                    text: 'Netherlands'
                }
            ],
            searchTerm: '',
            value: '',
            formatted: '',
            selected: '',
            formData: {
                title: '',
                shortenedCode: '',
                utmCampaign: '',
                utmSource: '',
                utmMedium: '',
                utmTerm: '',
                utmContent: '',
                redirectLimit: '',
                redirectLimitReachedUrl: '',
                redirectExpiresOn: '',
                redirectExpiredUrl: ''
            },
            itemsForDestination: [
                {
                    url: '',
                    percentage: this.$store.getters.getTotalDestinationPercent
                }
            ],
            qrCodeImageSize: 150,
            qrCodeImageUrl: '',
            shortenedDomain: 'quenchy.link',
            domainLinks: [
                {
                    value: 'quenchy.link'
                },
                {
                    value: 'ucc.link'
                }
            ],
            link: '',
            isRedirectLimit: false,
            isRedirectExpiresOn: false,
            showLabel: true,
            isShowUTMTags: false,
            isShowFallbackDestinations: false,
            newTrafficRouteId: ''
        };
    },
    async created() {
        if (!Object.keys(this.currentTrafficRoute).length) {
            await this.$store
                .dispatch('getTrafficRouteById', this.$route.params.id)
                .then(
                    () =>
                        (this.link = `https://${this.shortenedDomain}/${this.formData.shortenedCode}`)
                );
        }

        if (this.$route.params.id) {
            this.loadTrafficRouteData();
            this.link = `https://${this.shortenedDomain}/${this.formData.shortenedCode}`;
        }
    },
    methods: {
        onContext(ctx) {
            // The date formatted in the locale, or the `label-no-date-selected` string
            this.formatted = ctx.selectedFormatted
            // The following will be an empty string until a valid date is entered
            this.selected = ctx.selectedYMD
        },
        onCopy() {
            // Send Tracking Event With UCC SDK
            submitTrackingEvent(
                'TRAFFIC-ROUTE-QR-CODE-COPIED',
                { trafficRouteId: this.newTrafficRouteId },
                this.$store.getters['customerData']
            );
            this.$notify({
                title: 'Copied!',
                type: 'success'
            });
        },
        onError() {
            alert('Failed to copy text');
        },
        continueAfterWarning() {
            this.onSubmit();
            return this.$bvModal.show('warning-modal');
        },
        switchLabelElement() {
            this.showLabel = true;
        },
        cancelPublish() {
            this.$bvModal.hide('publish-confirm-modal');
            this.$router.push({ name: 'TrafficRoutes' }).catch(() => {});
        },
        async publishRoute() {
            await this.$store
                .dispatch('publishTrafficRoute', this.newTrafficRouteId)
                .then(() => {
                    // Send Tracking Event With UCC SDK
                    submitTrackingEvent(
                        'TRAFFIC-ROUTE-PUBLISHED',
                        { trafficRouteId: this.newTrafficRouteId },
                        this.$store.getters['customerData']
                    );
                    this.$router
                        .push({ name: 'TrafficRoutes' })
                        .catch(() => {});
                });
            this.$bvModal.hide('publish-confirm-modal');
        },
        async createTrafficRoute() {
            if (!this.formData.title) {
                this.$bvModal.show('warning-modal-for-validation');
            } else {
                await this.$store
                    .dispatch(
                        'createTrafficRoute',
                        Object.assign(
                            {
                                qr: this.qrCodeImageUrl,
                                destinations: this.itemsForDestination,
                                shortenedDomain: this.shortenedDomain
                            },
                            this.formData
                        )
                    )
                    .then(data => {
                        if (data.result && data.result._id) {
                            this.newTrafficRouteId = data.result._id;
                            this.$bvModal.show('publish-confirm-modal');
                            // Send Tracking Event With UCC SDK
                            submitTrackingEvent(
                                'TRAFFIC-ROUTE-CREATED',
                                data.result,
                                this.$store.getters['customerData']
                            );
                        }
                    });
            }
        },
        checkIfLinkChanges() {
            if (this.shortenedLink !== this.link) {
                this.$bvModal.show('warning-modal-for-link');
            } else {
                this.updateTrafficRoute();
            }
        },
        async updateTrafficRoute() {
            const isPublished = this.currentTrafficRoute.status === 'published';
            if (isPublished) {
                await this.$store.dispatch(
                    'unpublishTrafficRoute',
                    this.currentTrafficRoute._id
                );
            }

            const data = await this.$store.dispatch('updateTrafficRoute', {
                id: this.trafficRouteId,
                data: Object.assign(
                    {
                        qr: this.qrCodeImageUrl,
                        destinations: this.itemsForDestination,
                        shortenedDomain: this.shortenedDomain
                    },
                    this.formData
                )
            });
            // Send Tracking Event With UCC SDK
            await submitTrackingEvent(
                'TRAFFIC-ROUTE-UPDATED',
                data.result,
                this.$store.getters['customerData']
            );

            if (isPublished) {
                await this.$store
                    .dispatch(
                        'publishTrafficRoute',
                        this.currentTrafficRoute._id
                    )
                    .then(() =>
                        this.$router
                            .push({
                                name: 'TrafficRoutes'
                            })
                            .catch(() => {})
                    );
            }

            this.$router
                .push({
                    name: 'TrafficRoutes'
                })
                .catch(() => {});
        },
        async onSubmit() {
            this.$validator.validateAll().then(async result => {
                if (!result) {
                    return;
                } else {
                    const percent = 100;
                    // Calculate all the pecentage value in the itemsForDestination array
                    const destinationPercentageTotal = this.itemsForDestination.reduce(
                        (prev, cur) => prev + parseInt(cur.percentage),
                        0
                    );
                    // Then compare the value to the percent variable
                    if (percent !== destinationPercentageTotal) {
                        this.$notify({
                            title:
                                'Destination routes percentages must add up to 100',
                            type: 'error'
                        });
                        return false;
                    }

                    if (!this.trafficRouteId) {
                        await this.createTrafficRoute();
                        this.$validator.reset();
                    } else {
                        await this.checkIfLinkChanges();
                        this.$validator.reset();
                    }
                }
            });
        },
        goBack() {
            this.$router.push({ name: 'Personas' });
        },
        generateQRCode() {
            let result = '';
            const characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < 6; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            this.formData.shortenedCode = result;
            const qrCode = document.getElementsByTagName('canvas')[0];
            this.qrCodeImageUrl = qrCode.toDataURL('image/png');
        },
        loadQRCode() {
            const qrCode = document.getElementsByTagName('canvas')[0];
            this.qrCodeImageUrl = qrCode.toDataURL('image/png');
        },
        async copyQRCode() {
            const qrCode = document.getElementsByTagName('canvas')[0];

            if (window.navigator.clipboard.write) {
                qrCode.toBlob(async blob => {
                    await window.navigator.clipboard
                        .write([
                            new ClipboardItem({
                                [blob.type]: blob
                            })
                        ])
                        .then(() => {
                            this.$notify({
                                title: 'Copied!',
                                type: 'success'
                            });
                        });
                });
            } else {
                let img = document.createElement('img');
                img.src = qrCode.toDataURL();

                let div = document.createElement('div');
                div.contentEditable = true;
                div.appendChild(img);
                document.body.appendChild(div);

                // do copy
                this.SelectText(div);
                document.execCommand('Copy');
                document.body.removeChild(div);
            }
        },
        SelectText(element) {
            // var doc = document;
            // if (doc.body.createTextRange) {
            //     let range = document.body.createTextRange();
            //     range.moveToElementText(element);
            //     range.select();
            // } else if (window.getSelection) {
            let selection = window.getSelection();
            let range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
            // }
        },
        manuallyGenerateQRCode() {
            if (!this.formData.shortenedCode.length) {
                this.qrCodeImageUrl = '';
            }
            const qrCode = document.getElementsByTagName('canvas')[0];
            this.qrCodeImageUrl = qrCode.toDataURL('image/png');
        },
        downloadQR() {
            if (this.formData.title) {
                const qrCode = document.getElementsByTagName('canvas')[0];
                const dataURL = qrCode.toDataURL('image/png');
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = dataURL;
                downloadLink.download =
                    this.formData.title.replace(/ /g, '-') + '.png';
                // Send Tracking Event With UCC SDK
                submitTrackingEvent(
                    'TRAFFIC-ROUTE-QR-CODE-DOWNLOADED',
                    // TODO: not very sure if trafficRouteId is accessible like this
                    { trafficRouteId: this.newTrafficRouteId },
                    this.$store.getters['customerData']
                );
            }
        },
        async loadTrafficRouteData() {
            const trafficRoute = JSON.parse(
                JSON.stringify(this.currentTrafficRoute)
            );

            this.formData.title =
                trafficRoute && trafficRoute.title ? trafficRoute.title : '';
            this.shortenedDomain =
                trafficRoute && trafficRoute.shortenedDomain
                    ? trafficRoute.shortenedDomain
                    : 'quenchy.link';
            this.formData.shortenedCode =
                trafficRoute && trafficRoute.shortenedCode
                    ? trafficRoute.shortenedCode
                    : '';
            this.formData.utmCampaign =
                trafficRoute && trafficRoute.utmCampaign
                    ? trafficRoute.utmCampaign
                    : '';
            this.formData.utmSource =
                trafficRoute && trafficRoute.utmSource
                    ? trafficRoute.utmSource
                    : '';
            this.formData.utmMedium =
                trafficRoute && trafficRoute.utmMedium
                    ? trafficRoute.utmMedium
                    : '';
            this.formData.utmTerm =
                trafficRoute && trafficRoute.utmTerm
                    ? trafficRoute.utmTerm
                    : '';
            this.formData.utmContent =
                trafficRoute && trafficRoute.utmContent
                    ? trafficRoute.utmContent
                    : '';

            this.formData.redirectLimit =
                trafficRoute && trafficRoute.redirectLimit
                    ? trafficRoute.redirectLimit
                    : '';

            this.formData.redirectLimitReachedUrl =
                trafficRoute && trafficRoute.redirectLimitReachedUrl
                    ? trafficRoute.redirectLimitReachedUrl
                    : '';
            this.formData.redirectExpiresOn =
                trafficRoute && trafficRoute.redirectExpiresOn
                    ? trafficRoute.redirectExpiresOn
                    : '';
            this.formData.redirectExpiredUrl =
                trafficRoute && trafficRoute.redirectExpiredUrl
                    ? trafficRoute.redirectExpiredUrl
                    : '';

            this.formData.qr =
                trafficRoute && trafficRoute.qr ? trafficRoute.qr : '';

            this.itemsForDestination =
                trafficRoute && trafficRoute.destinations.length
                    ? trafficRoute.destinations
                    : [];

            if (
                this.formData.redirectLimit &&
                this.formData.redirectLimitReachedUrl
            ) {
                this.isRedirectLimit = true;
            }

            if (
                this.formData.redirectExpiresOn &&
                this.formData.redirectExpiredUrl
            ) {
                this.isRedirectExpiresOn = true;
            }
        },
        addDestination() {
            const prevDestination = this.itemsForDestination[
                this.itemsForDestination.length - 1
            ];

            this.$store.commit(
                'SET_REMAINING_DESTINATION_PERCENT',
                prevDestination.percentage
            );
            this.itemsForDestination.push({
                url: '',
                percentage: this.$store.getters.getTotalDestinationPercent
            });
        },
        removeRow(index) {
            this.$store.commit(
                'SET_ADD_REMAINING_DESTINATION_PERCENT',
                parseInt(this.itemsForDestination[index].percentage) +
                    parseInt(this.itemsForDestination[index - 1].percentage)
            );
            this.itemsForDestination.splice(index, 1);
            this.itemsForDestination[
                this.itemsForDestination.length - 1
            ].percentage = this.$store.getters.getTotalDestinationPercent;
        },
        isAlphaNumeric(e) {
            let char = String.fromCharCode(e.keyCode); // Get the character
            if (/^[A-Za-z0-9]+$/.test(char)) return true;
            // Match with regex
            else e.preventDefault(); // If not match, don't add to input text
        }
    },
    computed: {
        trafficRouteId() {
            return this.$route.params.id;
        },
        currentTrafficRoute() {
            return this.$store.getters['getTrafficRouteById'];
        },
        shortenedLink() {
            return `https://${this.shortenedDomain}/${this.formData.shortenedCode}`;
        }
    },
    mounted() {
        const dict = {
            en: {
                messages: {
                    url: () => `This is not a valid URL`
                }
            }
        };
        Validator.localize(dict);

        this.loadQRCode();

        if (!this.$route.params.id) {
            this.generateQRCode();
        }
    }
};
</script>

<style lang="scss" scoped>
.cursor {
    cursor: pointer;
}

.card {
    margin-bottom: 10px;
}

.card-body {
    padding: 0;
}

.first-cell-overflow {
    padding-left: 27px;
}

.edit-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 23px;
}

.qrcode-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #2f3380;
    width: 200px;
    height: 180px;
}

.copy_clipboard_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 31px;
    height: 31px;
    border-radius: 50%;
    background-color: #2f3380;
    margin-right: 10px;
}

.download-link,
.copy-clipboard,
.add-destination-url,
.edit-utm-tags,
.edit-fallback-destinations {
    color: #2f3380;
    text-decoration: underline;
    font-size: 18px;
    line-height: 23px;
}

.validation_mark {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;

    span {
        color: #a3a0fb;
        font-size: 12px;
        line-height: 20px;
    }
}

.fadeHeight-enter-active,
.fadeHeight-leave-active {
    transition: all 0.3s;
    max-height: 350px;
    overflow: hidden;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
    opacity: 0;
    max-height: 0px;
}

::v-deep .container {
    .btn-outline-primary.dropdown-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
        box-shadow: none;
    }

    .btn-outline-primary:not(:disabled):not(.disabled):active {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .show > .btn-outline-primary.dropdown-toggle {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .dropdown-menu {
        padding: 0;
    }

    .dropdown-item {
        color: #4d4f5c !important;
        padding: 0.5rem 1.5rem;
        border-bottom: 1px solid #e9e9f0;
    }

    .dropdown-item:active {
        color: #ffffff !important;
        background-color: #2f3380;
    }

    .col-form-label {
        color: #2f3380;
    }

    .custom-checkbox {
        margin-top: 35px;
    }
    .block-1 {
        width: 75%;
    }
    .checkbox-group {
        font-size: 12px;
        margin-top: -10px;
    }
}

.b-dropdown {
    .btn-outline-primary.dropdown-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
        box-shadow: none;
    }

    .btn-outline-primary:not(:disabled):not(.disabled):active {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .show > .btn-outline-primary.dropdown-toggle {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .dropdown-menu {
        padding: 0;
    }

    .dropdown-item {
        color: #4d4f5c !important;
        padding: 0.5rem 1.5rem;
        border-bottom: 1px solid #e9e9f0;
    }

    .dropdown-item:active {
        color: #ffffff !important;
        background-color: #2f3380;
    }
}
</style>
