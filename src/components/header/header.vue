<template>
    <v-app-bar app flat height="80px">
        <v-app-bar-nav-icon v-if="hasNavi" @click="open"></v-app-bar-nav-icon>
        <div class="space-div"></div>
        <v-avatar class="twt-logo" tile>
            <v-icon  x-large style="color:#1976D2">mdi-alpha-p-box</v-icon>
        </v-avatar>
        <v-toolbar-title class="twt-title">PLE GUI</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-menu offset-y auto>
            <template v-slot:activator="{ on }">
                <v-btn depressed v-on="on">
                    admin
                </v-btn>
            </template>
            <v-card flat class="drop-card">
                <v-list-item>
                    <v-list-item-avatar color="grey darken-3">
                        <v-img alt="avatar" :src="avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item class="realname">admin</v-list-item>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-row align="center" justify="end">
                        <v-btn text @click="logout">
                            退出
                        </v-btn>
                    </v-row>
                </v-list-item>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
import Message from "@/components/message";
import {removeToken} from "@/utils/auth";
import defaultAvatar from "@/assets/avatar.png";

export default {
    name: "Header",
    props: {
        hasNavi: Boolean,
    },
    data: () => ({
        drawer: true,
        username: "",
        realname: "",
        userNumber: "",
        stuType: "",
        avatar: defaultAvatar,
    }),
    methods: {
        open() {
            this.$emit("naviOpen");
        },
        logout() {
            removeToken();
            this.$router.push({path: "/login"});
            sessionStorage.removeItem("basicInfo");
            Message.success("已登出当前账号");
        },
    },
    created() {
    },
    watch: {
        '$router.path': {
            handler() {
                this.$forceUpdate()
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.space-div {
    width: getVw(24);
}

.twt-title {
    font-weight:bold;
}

.drop-card {
    padding: 16px;
    font-size: 16px;

    .realname {
        font-weight: bold;
    }

    .brief {
        font-size: 14px;
    }

    .func {
        display: flex;
        justify-content: flex-end;
    }
}

@media screen and (max-width: 700px) {
    .twt-title {
        font-size: 16px;
        margin-left: 0;
    }
    .twt-logo {
        height: 32px !important;
        width: 32px !important;
    }
}
</style>
