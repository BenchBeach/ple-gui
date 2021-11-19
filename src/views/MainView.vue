<template>
    <v-container>
        <v-card elevation="1">
            <v-card-title>
                <v-row>
                    <v-col cols="6">
                        数据展示
                    </v-col>
                    <v-col cols="3">
                        <v-file-input
                            style="white-space: nowrap;"
                            show-size
                            label="test File"
                            @change="uploadFile()"
                            truncate-length="9"
                            v-model="file"
                        ></v-file-input>
                    </v-col>
                    <v-col cols="3">
                        <v-file-input
                            style="white-space: nowrap;"
                            show-size
                            label="time File"
                            @change="uploadFigure()"
                            truncate-length="9"
                            v-model="timeFile"
                        ></v-file-input>
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
                    <v-icon>{{ item.icon }}</v-icon>
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-expansion-panels style="width:98%; margin:auto;" class="ma-3">
                        <v-expansion-panel v-for="(item,index) in positiveIns.slice((page-1)*20,page*20)" :key="index">
                            <v-expansion-panel-header>
                                <template>
                                    <v-row no-gutters>
                                        <v-col cols="1">
                                            <strong>ID:</strong>{{ item.ID }}
                                        </v-col>
                                        <v-col cols="2">
                                            <strong>label:</strong>{{ item.predict }}
                                        </v-col>
                                        <v-col cols="2">
                                            <strong>Anomaly probability:</strong>{{ item.tag[0].toFixed(3) }}
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row justify="center">
                                    <v-col cols="11">
                                        <v-row>
                                            <v-col cols="9" offset="1">
                                                <div class="text-h6">Templates</div>
                                            </v-col>
                                            <v-col cols="2">
                                                <div class="text-h6">attention value</div>
                                            </v-col>
                                        </v-row>
                                        <v-row v-for="(attention,index) in item.attention" :key="index"
                                               style="padding:0;">
                                            <v-col cols="1"
                                                   style="padding:0 18px 0 0;display:flex;justify-content:right;align-items:center;border-bottom:1px dashed;">
                                                <strong>{{ index }}:</strong></v-col>
                                            <v-col cols="9" style="padding:0;border-bottom:1px dashed;">
                                                {{ item.templates[index] }}
                                            </v-col>
                                            <v-col cols="2" style="padding:0;">
                                                <div class="color-block" :style="getColor(item.attention,attention)">
                                                    {{ attention.toFixed(5) }}
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="11">
                                        <v-row justify="center">
                                            <v-col cols="12" style="text-align:center">
                                                <v-btn
                                                    depressed
                                                    color="error"
                                                >
                                                    标记为正常
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-row justify="center">
                        <v-col cols="8">
                            <v-container class="max-width">
                                <v-pagination
                                    v-model="page"
                                    class="my-4"
                                    :length="Math.ceil(positiveIns.length/20)"
                                ></v-pagination>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item :eager="true">
                    <v-row justify="center" class="ma-4">
                        <v-col cols="12" style="text-align:center"><div class="text-h6">错误分布</div></v-col>
                    </v-row>
                    <v-divider class="mx-4"></v-divider>
                    <v-row justify="center" class="ma-4">
                        <div id="time-figure" style="width:1200px;height: 500px;"></div>
                    </v-row>
                </v-tab-item>
            </v-tabs-items>
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
import * as echarts from 'echarts';

export default {
    name: 'MainView',
    data: () => ({
        page: 1,
        timeFile:null,
        timeData:'',
        XDate:'',
        overlay: false,
        tab: '',
        file: null,
        allIns: [],
        items: [
            {
                name: 'log  analysis',
                icon: 'mdi-math-log'
            },
            {
                name: 'log  figure',
                icon: 'mdi-poll'
            }
        ],
    }),
    computed: {
        positiveIns() {
            return this.allIns.filter((item) => item.predict === 'Anomaly')
        }
    },
    mounted() {
    },
    methods: {
        uploadFigure(){
            let reader = new FileReader();
            let _this=this
            if (this.timeFile) {
                let tempDate = []
                let tempArr = []
                reader.readAsText(this.timeFile)
                reader.onload = () => {
                    const data = reader.result.split('\n')
                    for(let line of data){
                        const date=line.split(' ')[0]
                        const count=line.split(' ')[1]
                        let dateO= new Date(Date.parse(date.replace(/-/g,  "/")));
                        tempDate.push(date)
                        tempArr.push([dateO.getTime(),parseInt(count)])
                    }
                    _this.timeData=tempArr
                    _this.XDate=tempDate
                    _this.generateFigure()
                }
            }
        },
        generateFigure(){
            let chartDom = document.getElementById('time-figure');
            let myChart = echarts.init(chartDom);
            let option;
            option = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'time',
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 20
                    },
                    {
                        start: 0,
                        end: 20
                    }
                ],
                series: [
                    {
                        data: this.timeData,
                        type: 'line',
                        smooth: true
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        colorMapping(value) {
            return `background-color:rgb(${210 + (45 * (1 - value))},${74 + (164 * (1 - value))},${83 + (88 * (1 - value))});`
        },
        getColor(arr, item) {
            const max = Math.max(...arr)
            return this.colorMapping(item / max)
        },
        uploadFile() {
            let reader = new FileReader();
            if (this.file) {
                let tempArr = []
                reader.readAsText(this.file)
                reader.onload = () => {
                    const data = reader.result.split('\n')
                    let lineCount = 0
                    let templates = []
                    let ID = -1
                    let predict = ''
                    let tag = []
                    let attention = []
                    // let ins= {}
                    for (let i = 0; i < data.length; i++) {
                        let line = data[i]
                        if (lineCount === 0) {
                            templates = line.split(' ')
                            lineCount++
                        } else if (lineCount === 1) {
                            let lineTokens = line.split(',')
                            ID = parseInt(lineTokens[0])
                            predict = lineTokens[1]
                            tag = [parseFloat(lineTokens[3]), parseFloat(lineTokens[4])]
                            lineCount++
                        } else if (lineCount === 2) {
                            attention = line.split(' ').map((item) => parseFloat(item))
                            lineCount++
                        } else {
                            tempArr.push({
                                templates,
                                ID,
                                predict,
                                tag,
                                attention
                            })
                            templates = []
                            tag = []
                            attention = []
                            lineCount = 0
                        }
                    }
                }
                this.allIns = tempArr
            }
        }
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

.color-block {
    border: solid 1px white;
    text-align: center;
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    height: 100%;
    width: 100%
}
</style>
