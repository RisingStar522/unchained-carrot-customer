<template>
    <div class="pageVisitsContainer mt-5">
        <div class="d-flex align-items-center mb-4">
            <h4 class="text-brand mr-3">Page Visits</h4>
            <a href="#">
                <img src="../../../assets/icons/noun_Info.svg" />
            </a>
        </div>
        <b-table
            hover
            id="page-visits"
            :fields="visitFields"
            :items="visits"
            style="background-color: #ffffff"
            :per-page="perPageForLandingPageTemplate"
            :current-page="currentPageForLandingPageTemplate"
            caption-top
            responsive
            head-variant="light"
        >
            <template v-slot:cell(name)="data">
                <div class="first-cell-overflow">
                    {{ data.value }}
                </div>
            </template>

            <template v-slot:cell(utmSource)="data">
                <div>
                    {{ data.value }}
                </div>
            </template>
            <template v-slot:cell(utmMedium)="data">
                <div>
                    {{ data.value }}
                </div>
            </template>
            <template v-slot:cell(utmCampaign)="data">
                <div>
                    {{ data.value }}
                </div>
            </template>
            <template v-slot:cell(ipAddress)="data">
                <div>
                    {{ data.value }}
                </div>
            </template>
            <template v-slot:cell(city)="data">
                <div>
                    {{ data.value }}
                </div>
            </template>
            <template v-slot:cell(browser)="data">
                <div>
                    {{ data.value }}
                </div>
            </template>
            <template v-slot:cell(os)="data">
                <div>
                    {{ data.value }}
                </div>
            </template>
            <template v-slot:cell(device)="data">
                <div>
                    {{ data.value }}
                </div>
            </template>
        </b-table>
        <div
            class="
                            d-flex
                            align-items-center
                            justify-content-end
                            pr-3
                            pl-3
                            border-top
                        "
        >
            <div class="mr-3">
                <span class="mr-3">Rows per page: </span>
                <b-form-select
                    v-model="perPageForLandingPageTemplate"
                    :options="rowsPerPageOptions"
                    style="width: 80px; height: 35px"
                >
                </b-form-select>
            </div>

            <b-pagination
                v-model="currentPageForLandingPageTemplate"
                aria-controls="email-templates"
                align="right"
                :total-rows="visits ? visits.length : 0"
                :per-page="perPageForLandingPageTemplate"
            ></b-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'page-visits-component',
    data: () => ({
        rowsPerPageOptions: [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' }
        ],
        currentPageForLandingPageTemplate: 1,
        perPageForLandingPageTemplate: 5,
        visitFields: [
            { key: 'date', sortable: false, label: 'DATE' },
            { key: 'utmSource', sortable: false, label: 'URM SOURCE' },
            { key: 'utmMedium', sortable: false, label: 'UTM MEDIUM' },
            { key: 'utmCampaign', sortable: false, label: 'UTM CAMPAIGN' },
            { key: 'ipAddress', sortable: false, label: 'IP ADDRESS' },
            { key: 'city', sortable: false, label: 'CITY' },
            { key: 'browser', sortable: false, label: 'BROWSER' },
            { key: 'os', sortable: false, label: 'OS' },
            { key: 'device', sortable: false, label: 'DEVICE' }
        ],
        visits: [
            {
                date: '1-OCT-2021',
                utmSource: 'Facebook',
                utmMedium: 'Post',
                utmCampaign: 'Black friday',
                ipAddress: '62.152.107.66',
                city: 'Milan',
                browser: 'Chromium',
                os: 'Windows',
                device: '-'
            },
            {
                date: '1-OCT-2021',
                utmSource: 'Facebook',
                utmMedium: 'Post',
                utmCampaign: 'Black friday',
                ipAddress: '62.152.107.66',
                city: 'Milan',
                browser: 'Chromium',
                os: 'Windows',
                device: '-'
            },
            {
                date: '1-OCT-2021',
                utmSource: 'Facebook',
                utmMedium: 'Post',
                utmCampaign: 'Black friday',
                ipAddress: '62.152.107.66',
                city: 'Milan',
                browser: 'Chromium',
                os: 'Windows',
                device: '-'
            },
            {
                date: '1-OCT-2021',
                utmSource: 'Facebook',
                utmMedium: 'Post',
                utmCampaign: 'Black friday',
                ipAddress: '62.152.107.66',
                city: 'Milan',
                browser: 'Chromium',
                os: 'Windows',
                device: '-'
            },
            {
                date: '1-OCT-2021',
                utmSource: 'Facebook',
                utmMedium: 'Post',
                utmCampaign: 'Black friday',
                ipAddress: '62.152.107.66',
                city: 'Milan',
                browser: 'Chromium',
                os: 'Windows',
                device: '-'
            }
        ]
    })
};
</script>

<style></style>
