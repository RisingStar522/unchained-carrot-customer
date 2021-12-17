<template>
    <div class="trafficRouteContainer mt-5">
        <div class="d-flex align-items-center mb-4">
            <h4 class="text-brand mr-3">Traffic Routes</h4>
            <a href="#">
                <img src="../../../assets/icons/noun_Info.svg" />
            </a>
        </div>
        <b-table
            hover
            id="traffic-routes"
            :fields="fieldsTrafficRoutes"
            :items="trafficRoutes"
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
            <template v-slot:cell(shortenedLink)="data">
                <div>
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
            <template v-slot:cell(status)="data">
                <div>
                    <span
                        class="dot"
                        :class="{
                            active: data.value === 'published'
                        }"
                    ></span>
                    {{ data.value | capitalize }}
                </div>
            </template>
            <template v-slot:cell(fallback)="data">
                <div>
                    <span
                        class="dot"
                        :class="{
                            active: data.value === 'active'
                        }"
                    ></span>
                    {{ data.value | capitalize }}
                </div>
            </template>
            <template v-slot:cell(action)="data">
                <div
                    class="
                                    d-flex
                                    align-items-center
                                    justify-content-end
                                "
                >
                    <a class="action-icon mr-2">
                        <span class="default">
                            <svg
                                id="Livello_1"
                                data-name="Livello 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 150 150"
                            >
                                <g
                                    id="noun_growth_3025764-2"
                                    data-name="noun growth 3025764-2"
                                >
                                    <g
                                        id="Raggruppa_1052-2"
                                        data-name="Raggruppa 1052-2"
                                    >
                                        <rect
                                            id="Rettangolo_1524-2"
                                            data-name="Rettangolo 1524-2"
                                            x="11.92"
                                            y="93.52"
                                            width="25.62"
                                            height="46.47"
                                            style="fill:#4d505d"
                                        />
                                        <rect
                                            id="Rettangolo_1525-2"
                                            data-name="Rettangolo 1525-2"
                                            x="53.57"
                                            y="68.63"
                                            width="25.62"
                                            height="71.36"
                                            style="fill:#4d505d"
                                        />
                                        <path
                                            id="Tracciato_867-2"
                                            data-name="Tracciato 867-2"
                                            d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                            style="fill:#4d505d"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </span>
                        <span class="hover">
                            <svg
                                id="Livello_1"
                                data-name="Livello 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 150 150"
                            >
                                <g
                                    id="noun_growth_3025764-2"
                                    data-name="noun growth 3025764-2"
                                >
                                    <g
                                        id="Raggruppa_1052-2"
                                        data-name="Raggruppa 1052-2"
                                    >
                                        <rect
                                            id="Rettangolo_1524-2"
                                            data-name="Rettangolo 1524-2"
                                            x="11.92"
                                            y="93.52"
                                            width="25.62"
                                            height="46.47"
                                            style="fill:#f49848"
                                        />
                                        <rect
                                            id="Rettangolo_1525-2"
                                            data-name="Rettangolo 1525-2"
                                            x="53.57"
                                            y="68.63"
                                            width="25.62"
                                            height="71.36"
                                            style="fill:#f49848"
                                        />
                                        <path
                                            id="Tracciato_867-2"
                                            data-name="Tracciato 867-2"
                                            d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                            style="fill:#f49848"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </span>
                        <span class="active">
                            <svg
                                id="Livello_1"
                                data-name="Livello 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 150 150"
                            >
                                <g
                                    id="noun_growth_3025764-2"
                                    data-name="noun growth 3025764-2"
                                >
                                    <g
                                        id="Raggruppa_1052-2"
                                        data-name="Raggruppa 1052-2"
                                    >
                                        <rect
                                            id="Rettangolo_1524-2"
                                            data-name="Rettangolo 1524-2"
                                            x="11.92"
                                            y="93.52"
                                            width="25.62"
                                            height="46.47"
                                            style="fill:#fff"
                                        />
                                        <rect
                                            id="Rettangolo_1525-2"
                                            data-name="Rettangolo 1525-2"
                                            x="53.57"
                                            y="68.63"
                                            width="25.62"
                                            height="71.36"
                                            style="fill:#fff"
                                        />
                                        <path
                                            id="Tracciato_867-2"
                                            data-name="Tracciato 867-2"
                                            d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                            style="fill:#fff"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </span>
                    </a>
                    <a
                        class="action-icon mr-2"
                        @click="editTemplate(data.item._id)"
                    >
                        <span class="default">
                            <svg
                                id="Livello_1"
                                data-name="Livello 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 150 150"
                            >
                                <g
                                    id="Raggruppa_1053"
                                    data-name="Raggruppa 1053"
                                >
                                    <path
                                        id="Tracciato_767-2"
                                        data-name="Tracciato 767-2"
                                        d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z"
                                        style="
                                                        fill: #4d505d;
                                                        fill-rule: evenodd;
                                                    "
                                    />
                                </g>
                            </svg>
                        </span>
                        <span class="hover">
                            <svg
                                id="Livello_1"
                                data-name="Livello 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 150 150"
                            >
                                <g
                                    id="Raggruppa_1053"
                                    data-name="Raggruppa 1053"
                                >
                                    <path
                                        id="Tracciato_767-2"
                                        data-name="Tracciato 767-2"
                                        d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z"
                                        style="
                                                        fill: #f49848;
                                                        fill-rule: evenodd;
                                                    "
                                    />
                                </g>
                            </svg>
                        </span>
                        <span class="active">
                            <svg
                                id="Livello_1"
                                data-name="Livello 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 150 150"
                            >
                                <g
                                    id="Raggruppa_1053"
                                    data-name="Raggruppa 1053"
                                >
                                    <path
                                        id="Tracciato_767-2"
                                        data-name="Tracciato 767-2"
                                        d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z"
                                        style="
                                                        fill: #fff;
                                                        fill-rule: evenodd;
                                                    "
                                    />
                                </g>
                            </svg>
                        </span>
                    </a>
                    <b-btn
                        :variant="
                            data.item.status === 'published'
                                ? 'outline-brand'
                                : 'brand'
                        "
                        @click="handlePublishEmailTemplate(data.item._id)"
                        style="width: 120px; font-size: 14px"
                    >
                        {{
                            data.item.status === 'published'
                                ? 'Unpublish'
                                : 'Publish'
                        }}
                    </b-btn>
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
                :total-rows="trafficRoutes ? trafficRoutes.length : 0"
                :per-page="perPageForLandingPageTemplate"
            ></b-pagination>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'traffic-route-component',
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
        fieldsTrafficRoutes: [
            { key: 'name', sortable: false, label: 'NAME' },
            { key: 'shortenedLink', sortable: false, label: 'SHORTENED LINK' },
            { key: 'utmSource', sortable: false, label: 'URM SOURCE' },
            { key: 'utmMedium', sortable: false, label: 'UTM MEDIUM' },
            { key: 'utmCampaign', sortable: false, label: 'UTM CAMPAIGN' },
            { key: 'status', sortable: false, label: 'STATUS' },
            { key: 'fallback', sortable: false, label: 'FALLBACK' },
            { key: 'action', label: '' }
        ],
        trafficRoutes: [
            {
                name: 'Black Friday Facebook',
                shortenedLink: 'https://quenchy.link/vj ..',
                utmSource: 'Facebook',
                utmMedium: 'Post',
                utmCampaign: 'Black Friday',
                status: 'published',
                fallback: 'active'
            },
            {
                name: 'Black Friday Facebook',
                shortenedLink: 'https://quenchy.link/vj ..',
                utmSource: 'Facebook',
                utmMedium: 'Post',
                utmCampaign: 'Black Friday',
                status: 'unpublished',
                fallback: 'active'
            },
            {
                name: 'Black Friday Facebook',
                shortenedLink: 'https://quenchy.link/vj ..',
                utmSource: 'Facebook',
                utmMedium: 'Post',
                utmCampaign: 'Black Friday',
                status: 'published',
                fallback: 'active'
            }
        ]
    }),
    methods: {
        handlePublishEmailTemplate(id) {},
        editTemplate(id) {}
    },
    filters: {
        formatDate: function(value) {
            return moment(value).format('DD/MM/YYYY');
        },
        capitalize: function(value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
};
</script>

<style scoped lang="scss">
table {
    tbody {
        tr {
            .action-icon {
                width: 23px;
                .default {
                    display: block;
                }
                .hover,
                .active {
                    display: none;
                }
            }
            .action-icon:hover {
                .default,
                .active {
                    display: none;
                }
                .hover {
                    display: block;
                }
            }
            &.table-active {
                .action-icon {
                    .active {
                        display: block;
                    }
                    .default,
                    .hover {
                        display: none;
                    }
                }
            }
        }
    }
}
.dot {
    height: 10px;
    width: 10px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
}
.dot.active {
    background-color: green;
}
</style>
