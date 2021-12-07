<template>
    <div class="my-select-wrapper">
        <div class="my-select">
            <div class="my-select__trigger">
                <span v-if="icons && icons.length > 0">
                    <!-- <img
                        v-if="selectedIcon.iconsetId"
                        :src="selectedIcon.preview"
                    /> -->
                    <!-- <img v-if="selectedIcon.preview" :src="setIcon.preview" /> -->
                    <img id="setIcon" :src="setIcon.preview" />
                </span>
                <span v-else></span>
                <div class="arrow"></div>
            </div>
            <div class="my-options">
                <div
                    v-for="icon in icons"
                    @click="selectIcon"
                    :key="icon.iconsetId"
                    :class="
                        `my-option ${
                            icon.iconsetId === selectedIcon.iconsetId
                                ? 'selected'
                                : ''
                        }`
                    "
                >
                    <img
                        :id="icon.iconsetId"
                        :src="icon.preview"
                        :alt="icon.reviewType"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Iconset-component',
    props: ['icons', 'setIcon'],
    data() {
        return {
            selectedIcon: this.setIcon
        };
    },
    watch: {
        icons() {
            this.selectedIcon = this.icons[0];
            this.iconSelected();
        }
    },
    methods: {
        selectIcon(e) {
            this.selectedIcon = {
                iconsetId: e.target.id,
                preview: e.target.src
            };
            this.iconSelected();
        },
        iconSelected() {
            this.$emit('iconSelected', this.selectedIcon);
        }
    },
    mounted() {
        for (const dropdown of document.querySelectorAll(
            '.my-select-wrapper'
        )) {
            dropdown.addEventListener('click', function() {
                this.querySelector('.my-select').classList.toggle('open');
            });
        }

        for (const option of document.querySelectorAll('div.my-option')) {
            option.addEventListener('click', function() {
                this.closest('.my-select').querySelector(
                    '.my-select__trigger span'
                ).innerHTML = this.innerHTML;
                // }
            });
        }

        window.addEventListener('click', function(e) {
            for (const select of document.querySelectorAll('.my-select')) {
                if (!select.contains(e.target)) {
                    select.classList.remove('open');
                }
            }
        });
    }
};
</script>

<style scoped>
.my-select-wrapper {
    position: relative;
    user-select: none;
    width: 100%;
    margin-bottom: 1em;
}
.my-select {
    position: relative;
    display: flex;
    flex-direction: column;
}

.my-select__trigger {
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    background: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.my-select__trigger > span {
    min-height: 35px;
    flex-grow: 1;
}

.my-options {
    position: absolute;
    display: block;
    top: 100%;
    left: 0;
    right: 0;
    border: 1px solid #ced4da;
    border-top: 0;
    background: #fff;
    transition: all 0.5s;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 2;
    box-shadow: #ccc 0px 30px 50px;
}
.my-select.open .my-options {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
}
.my-option {
    position: relative;
    display: block;
    align-content: center;
    margin: 10px 0;
    font-size: 22px;
    font-weight: 300;
    color: #3b3b3b;
    line-height: 40px;
    cursor: pointer;
    transition: all 0.5s;
}
.my-option:hover {
    cursor: pointer;
    background-color: #b2b2b2;
}
.my-option.selected {
    color: #ffffff;
    background-color: #2f3380;
}

.arrow {
    position: relative;
    height: 15px;
    width: 15px;
}

.arrow::before,
.arrow::after {
    content: '';
    position: absolute;
    bottom: 0px;
    width: 0.15rem;
    height: 100%;
    transition: all 0.5s;
    margin-left: 2em;
}
.arrow::before {
    left: -35px;
    transform: rotate(45deg);
    background-color: #ced4da;
}
.arrow::after {
    left: -45px;
    transform: rotate(-45deg);
    background-color: #ced4da;
}
.open .arrow::before {
    transform: rotate(-45deg);
}
.open .arrow::after {
    transform: rotate(45deg);
}
</style>
