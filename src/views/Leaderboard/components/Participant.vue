<template>
    <div>
        <b-list-group-item
            href="#"
            :active="active"
            class="flex-column align-items-start"
        >
            <div class="participant d-flex align-items-center m-2">
                <img
                    :src="require('../../../assets/images/avatar.png')"
                    class="participant-avatar  mx-2"
                />
                <div class="participant-details d-flex flex-column">
                    <div class="participant-details-name">{{ name }}</div>
                    <div class="participant-details-role">{{ role }}</div>
                </div>
                <div class="participant-ranking ml-auto">
                    <fa-icon icon="star" />{{ ranking }}
                </div>
            </div>
        </b-list-group-item>
    </div>
</template>

<script>
export default {
    name: 'participant-component',
    props: {
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        ranking: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style scoped>
.participant {
    width: 100%;
}
.participant-avatar {
    width: 35px;
    height: 35px;
}
.participant-details-name {
    font-size: 12px;
    font-weight: bold;
}
.participant-details-role {
    font-size: 10px;
}
.participant-ranking {
    display: inline-block;
    font-size: 10px;
    color: white;
    background-color: #9a9a9a;
    border-radius: 10px;
    padding: 0px 4px;
}
</style>
