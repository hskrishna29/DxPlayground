
// Vue
var MainVueModel = {
    el: "#campaigns-vue",
    data: {
        campaigns: [],
        bulkPerformance: 0,
        ready: false
    },
    methods: {
        select: function (item, isSelected) {
            item.selected = isSelected;
        },
        selected: function (selected) {
            return this.campaigns.filter(function (campaign) {
                return campaign.selected === selected;
            });
        },
        bulkSelect: function (selected) {
            var t0 = performance.now();
            $.each(this.campaigns, function (index, item) {
                item.selected = selected;
            });
            var t1 = performance.now();
            this.bulkPerformance = parseInt(t1 - t0);
        }
    },
    watch: {
        campaigns: {
            handler: function () {
                // handler function to take an action on change of anything in campaigns array
            },
            deep: true
        }
    },
    computed: {
        selectedCampaigns: function () {
            return this.selected(true).length;
        }
    }
}

var VueModule = function($, mainModule) {
    $(document).ready(function () {

        var vueCallback = function (data) {
            var t0 = performance.now();
            var model = new Vue(MainVueModel);
            var campaignsList = [];
            $.each(data.Campaigns, function (index, item) {
                item.selected = false;
                campaignsList.push(item);
            });
            model._data.campaigns = campaignsList;
            model._data.ready = true;
            var t1 = performance.now();
            model.bulkPerformance = parseInt(t1 - t0);
            $("#campaigns-container-vue").slimScroll({
                height: "400px"
            });
        }

        mainModule.getData(vueCallback);
    });
}($, MainModule);
