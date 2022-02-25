<template>
    <div class="traffic-route-card">
        <div class="traffic-route-left text-brand">
            <h5>{{ route.title }}</h5>
            <p>
                Source: {{ route.utmSource }}<br />
                Medium: {{ route.utmMedium }}<br />
                Content: {{ route.utmContent }}
            </p>
            <a :href="shortLink" target="_blank">{{ shortLink }}</a>
        </div>
        <div class="traffic-route-card__right">
            <div class="traffic-route-card__right-top">
                <p class="traffic-route_percent text-brand">100%</p>
                <img class="traffic-route__qr" :src="route.qr" />
            </div>
            <b-button variant="primary">Published</b-button>
        </div>
    </div>
</template>

<style lang="scss">
.traffic-route-card {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid #2f3380;
    border-radius: 5px;

    & + & {
        margin-top: 20px;
    }

    h5 {
        font-size: 1.15rem;
        margin: 0 0 20px;
    }
    p,
    a {
        font-size: 0.875em;
    }
    a {
        text-decoration: underline;
    }

    &__left {
        width: 100%;
        padding-right: 15px;
    }

    &__right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 150px;

        &-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }

        .traffic-route_percent {
            font-weight: bold;
            font-size: 1rem;
        }

        img {
            width: 100px;
            margin: -7px -7px 0 0;
        }
        button {
            width: 100%;
        }
    }
}
</style>

<script>
export default {
    props: {
        route: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        shortLink() {
            const { shortenedDomain, shortenedCode } = this.route;
            return `https://${shortenedDomain}/${shortenedCode}`;
        }
    }
};
</script>
