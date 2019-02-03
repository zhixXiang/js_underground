// 空氣指標API
// http://opendata.epa.gov.tw/ws/Data/AQI/?$format=json

var app = new Vue({
    el: '#content',
    data: {
        aqiDatas: [],
        sltCity: '臺北市',
        currentSelectCity: '臺北市',
        currentAqiDatas: []
    },
    methods: {
        /**
         * @description 根據縣市名稱取得該縣市所有的aqi資料
         * @param {String} cityName 縣市名稱
         */
        getCityAqiDataByName: function (cityName) {
            var cityAqiData = this.aqiDatas.filter(function (city) {
                return city.County === cityName;
            });
            return cityAqiData;
        },
        /**
         * @description 根據AQI數值取得對應顏色的class
         * @param {String} aqi
         */
        getColorClassByAqi: function (aqi) {
            aqi = Math.round(aqi);
            var colorClass = '';
            if (aqi > 0 && aqi < 50) {
                colorClass = 'to50';
            } else if (aqi > 51 && aqi < 100) {
                colorClass = 'to100';
            } else if (aqi > 101 && aqi < 150) {
                colorClass = 'to150';
            } else if(aqi > 151 && aqi < 200){
                colorClass = 'to200';
            } else if(aqi > 201 && aqi < 300){
                colorClass = 'to300';
            } else if(aqi > 301 && aqi < 400){
                colorClass = 'to400';
            }

            return colorClass;
        }
    },
    watch: {
        sltCity: function(val){
            this.currentSelectCity = val;
            this.currentAqiDatas = this.getCityAqiDataByName(val);
        }
    },
    mounted() {

    },

    created() {
        var vm = this;
        // call api get data
        axios.get('https://api-proxy.noob.tw/http://opendata.epa.gov.tw/ws/Data/AQI/?$format=json').then(function (res) {
            console.log(res.data);
            vm.aqiDatas = res.data;
            vm.currentAqiDatas = vm.getCityAqiDataByName(vm.currentSelectCity);
            console.log(vm.currentAqiDatas);
        });
    }
})