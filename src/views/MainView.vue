<template>
    <v-container>
        <v-card elevation="1">
            <v-card-title>
                <v-row>
                    <v-col cols="1">
                        调试器
                    </v-col>
                </v-row>
            </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-tabs
                v-model="tab"
                class="px-4"
                icons-and-text
                color="#00A0E8"
                grow
            >
                <v-tab
                    v-for="item in items"
                    :key="item.name"
                >
                    {{ item.name }}
                    <v-icon>{{item.icon}}</v-icon>
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>123</v-tab-item>
                <v-tab-item>23323</v-tab-item>
            </v-tabs-items>
            <v-card-text>
            </v-card-text>
        </v-card>
        <v-overlay :value="overlay">
            <v-row>
                <v-col cols="12" style="text-align: center;">
                    <v-progress-circular
                        indeterminate
                        size="64"
                    ></v-progress-circular>
                </v-col>
            </v-row>
        </v-overlay>
    </v-container>
</template>

<script>
export default {
    name: 'MainView',
    data: () => ({
        overlay: false,
        tab:'',
        items: [
            {
                name:'log  analysis',
                icon:'mdi-math-log'
            },
            {
                name:'log  figure',
                icon:'mdi-poll'
            }
        ],
    }),
    methods: {

    },
    created() {

    }
}
</script>

<style scoped lang="scss">
.center {
    text-align: center;
}

.left {
    text-align: left;
}

.major-row {
    margin: 16px 0 24px 0;
    color: black;
}

.show-code {
    background-color: #282C34;
    border-radius: 4px;
}

.code-row {
    padding: 4px 4px 4px 8px;
    line-height: 100%;
    color: #ECEFF1;
    font-size: 14px;
}

.line-num-col {
    padding: 4px 8px 4px 4px;
    line-height: 100%;
    font-weight: bold;
    color: #648AA9;
    font-size: 14px;
    text-align: right !important;
}
</style>
