<template>
    <div class="traffic-image-card">
        <div class="traffic-image-card__imagewrapper">
            <img
                src="https://citizengo.org/sites/default/files/styles/large/public/images/test.png?itok=0AUo9A6j"
                alt=""
            />
        </div>
        <div class="traffic-image-card__bottom">
            <div class="traffic-image-card__bottom-title">
                <h5 class="text-brand">Menu</h5>
                <p>Menu template</p>
            </div>
            <p class="traffic-image-card__bottom-desc">
                This is a menu structure template
            </p>
            <div class="traffic-image-card__bottom-line">
                <b-badge>Draft</b-badge>
                <span>last update: Mon Oct 12 2020</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.traffic-image-card {
    padding: 35px 20px 20px;
    border-radius: 15px;
    background-color: #a5a5a5;
    font-size: 0.875rem;

    &__imagewrapper {
        background-color: #fff;
        border: 1px solid #707070;
        aspect-ratio: 19/13;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    &__bottom {
        margin-top: 12px;
        background-color: #fff;
        border: 1px solid #707070;
        &-desc {
            font-size: 0.875em;
            padding: 0 15px;
            margin-bottom: 1em;
        }
        &-title {
            padding: 15px;
            h5 {
                font-size: 1.125em;
                font-weight: 400;
                text-transform: uppercase;
                margin: 0;
            }
            p {
                margin: 7px 0 0;
                font-size: 0.875em;
                line-height: 1;
                color: #a9b4bb;
            }
        }
        &-line {
            font-size: 0.875em;
            line-height: 1;
            background-color: #f7f7f7;
            margin: 5px;
            padding: 10px;
            position: relative;
            &:after {
                content: '';
                position: absolute;
                top: -2px;
                bottom: -2px;
                left: 0;
                background-color: #bababa;
                width: 2px;
            }
            .badge {
                margin-right: 5px;
                font-weight: 400;
                text-transform: lowercase;
            }
            .badge,
            span {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
}
</style>
