<template>
    <div class="app">
        <div
            class="auth-background"
            :style="
                'background-image: url(' +
                    require('@/assets/images/UnchainedCarrot_bg.png') +
                    ')'
            "
        ></div>
        <div class="auth-content">
            <div class="logo">
                <img
                    src="@/assets/images/Unchained-logo.png"
                    alt="Unchained logo"
                />
            </div>
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: 'auth-layout'
};
</script>

<style lang="scss">
.auth-background {
    background: no-repeat center bottom;
    width: 50%;
}
.auth-content {
    width: 400px;
    padding: 15px;
    margin: auto;

    .logo {
        height: 90px;
        text-align: center;
        margin-bottom: 10px;

        img {
            padding: 10px 0;
            height: inherit;
            max-width: 100%;
        }
    }

    .text-welcome {
        text-align: center;
        color: #4d4f5c6e;
    }
}

@media (max-width: 576px) {
    .auth-background {
        display: none;
    }
}
</style>
